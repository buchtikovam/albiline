<script lang="ts">
	import {
		activeSelectedRowIndex, defaultColDef,
		editedTableData,
		filtersToSave,
		presetToSave, selectedFilters, selectedPreset, setColDefToDefault,
		storedSelectedRows
	} from '$lib/runes/table.svelte';
	import { fulltextFilterValue, pageCompact, sessionKey } from '$lib/runes/page.svelte';
	import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { onDestroy, onMount, tick } from 'svelte';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { scrollGridToTop } from '$lib/utils/components/ag-grid/scrollGridToTop';
	import { customToast } from '$lib/utils/customToast';
	import {
		type CellValueChangedEvent,
		createGrid,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from 'ag-grid-enterprise';
	import type { ColumnOrder, TableRowRequest } from '$lib/types/components/table/table';
	import 'ag-grid-community/styles/ag-grid.css';
	import '$lib/ag-grid-theme-builder.pcss';
	import { disablePageTabs } from '$lib/runes/navigation.svelte';
	import { isEditAllowed, ribbonAction } from '$lib/runes/ribbon.svelte';
	import type { ColDef } from 'ag-grid-community';


	interface Props {
		url: string;
		requiredFields: string[];
		gridOptionsCustom: GridOptions;
	}

	let {
		url,
		requiredFields,
		gridOptionsCustom
	}: Props = $props();


	// @ts-ignore
	let gridContainer: HTMLElement = $state();
	let gridApi: GridApi<unknown>;


	const gridOptions: GridOptions = { // return from grid options
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 60,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			autoHeaderHeight: true,
			suppressHeaderMenuButton: true
		},	

		onCellValueChanged: (event: CellValueChangedEvent<any>) => {
			if (event.oldValue !== event.newValue) {
				addToEditedTableData(
					event,
					["customerNodeCode", "customerAddressCode"],
					editedTableData.value
				)
			}
		},

		onColumnResized: () => {
			presetToSave.value = gridApi.getColumnDefs() || []
		},

		onFilterChanged() {
			filtersToSave.value = gridApi.getFilterModel();
		},

		onColumnMoved: () => {
			presetToSave.value = gridApi.getColumnDefs() || [];
		},

		onColumnVisible: () => {
			presetToSave.value = gridApi.getColumnDefs() || [];
		},

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber);
		},

		onRowSelected: () => {
			const selectedRows: any[] = gridApi.getSelectedRows();
			let rowArr: {[key: string]: any}[] = []

			disablePageTabs.value = selectedRows.length > 0;
			activeSelectedRowIndex.value = 0

			selectedRows.forEach((row) => {
				let rowObj: {[key: string]: any} = {}
				requiredFields.forEach((field) => {
					rowObj[field] = row[field]
				})

				rowArr.push(rowObj);
			})

			storedSelectedRows.value = rowArr;
		},
	}


	const rowBatchSize = 100;
	let recentFilters: FilterModel[] = [];
	let currentSort: ("asc" | "desc" | null | undefined)[] = []
	let previousSort: ("asc" | "desc" | null | undefined)[] = []
	let lastRow: number|null = null;
	let lastRowAndPositions: { lastRow: number|null, startRow: number|undefined, endRow: number|undefined }[] = []


	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			// if filter has changed, set lastRow to null
			if (JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				updatedParamsRequest.startRow = 0;
				updatedParamsRequest.endRow = rowBatchSize;
				lastRow = null;
				lastRowAndPositions = [];
				scrollGridToTop();
			}

			// if sort has changed, set lastRow to null
			currentSort = gridApi.getColumnState().map((state) => { return state.sort })
			if (JSON.stringify(currentSort) !== JSON.stringify(previousSort)) {
				updatedParamsRequest.startRow = 0;
				updatedParamsRequest.endRow = rowBatchSize;
				lastRow = null;
				lastRowAndPositions = [];
				scrollGridToTop();
			}

			previousSort = currentSort;

			// custom request model
			updatedParamsRequest.fulltext = fulltextFilterValue.value;
			updatedParamsRequest.lastRow = lastRow;
			updatedParamsRequest.rowBatchSize = rowBatchSize;

			// check if requested block is already in lastRowAndPositions
			// (solves refresh issue - not providing correct lastRow)
			let match = false;
			lastRowAndPositions.forEach((obj) => {
				if (obj.startRow === updatedParamsRequest.startRow && obj.endRow === updatedParamsRequest.endRow) {
					match = true;
					updatedParamsRequest.lastRow = obj.lastRow;
				}
			})

			if (!match) {
				lastRowAndPositions.push({
					startRow: updatedParamsRequest.startRow,
					endRow: updatedParamsRequest.endRow,
					lastRow: updatedParamsRequest.lastRow
				})
			}

			fetch(url
				,{ 
					method: "post",
					body: JSON.stringify(params.request),
					headers: {
						"Content-Type": "application/json",
						"Session-Key": sessionKey.value || "",
					}
				}
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {
				params.success({ rowData: response.items });
				lastRow = response.items.slice(-1)[0].rowNumber || null;
			})
			.catch(error => {
				console.log(error);
				params.fail();
			});
		}
	};


	// listening to fulltext filter changes from layout, refresh grid with delay
	let isInitial = true;
	let timer: NodeJS.Timeout;

	function debounceFulltext() {
		clearTimeout(timer)

		timer = setTimeout(async () => {
			await tick();
			lastRow = null;
			gridApi.onFilterChanged()
		}, 1000)
	}

	$effect(() => {
		if (fulltextFilterValue.value) {
			isInitial = false;
			debounceFulltext();
		}

		if (fulltextFilterValue.value === "" && !isInitial) {
			clearTimeout(timer)
			debounceFulltext();
		}
	})


	const columnDefaultEditable = new Map();


	// runs when component is mounted only
	$effect(() => {
		gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		gridApi.setGridOption('serverSideDatasource', datasource);
		defaultColDef.value = gridApi.getColumnDefs() || [];

		// set background color of editable columns on page load, map initial column editable state
		const initialColDef = gridApi.getColumnDefs();
		const canEdit = isEditAllowed.value;

		initialColDef?.map((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)

			if (canEdit) {
				column.cellStyle = {
					backgroundColor: column.editable ?
						"rgba(245,198,11,0.05)" :
						"rgba(0, 0, 0, 0)"
				};
			}
		})

		gridApi.setGridOption("columnDefs", initialColDef);

		// remove selection on shift
		window.addEventListener("keydown", (e) => {
			if (e.shiftKey) {
				document.getSelection()?.removeAllRanges();
			}
		})

		// // if routing between list and details, restore column order, visibility
		// if (get(presetStore)?.length > 0) {
		// 	let columnOrder: ColumnOrder = []
		//
		// 	get(presetStore).forEach((obj: Preset) => {
		// 		columnOrder.push({ colId: obj.colId})
		// 	})
		//
		// 	gridApi.setGridOption("columnDefs", get(presetStore))
		//
		// 	gridApi.applyColumnState({
		// 		state: columnOrder,
		// 		applyOrder: true
		// 	});
		// }
		//
		//
		// // if routing from details to list, restore filters
		// if (Object.keys(get(filtersStore)).length > 0) {
		// 	gridApi.setFilterModel(get(filtersStore))
		// }
		//
		//

		return () => {
			fulltextFilterValue.value = "";
		}
	})


	// runs when user chooses filter from ribbon
	$effect(() => {
		if (Object.keys(selectedFilters.value).length > 0) {
			console.log("chosen filter");
			gridApi.setFilterModel(selectedFilters.value)
			gridApi.onFilterChanged()
		}
	})


	// runs when user chooses preset from ribbon
	$effect(() => {
		if (selectedPreset.value.length > 0) {
			console.log("chosen preset");

			let columnOrder: ColumnOrder = []

			selectedPreset.value.forEach(obj => {
				columnOrder.push({ colId: obj.colId})
			})

			gridApi.setGridOption("columnDefs", selectedPreset.value)

			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});
		}
	})


	// runs from ribbon -> my presets. Restores default column order, widths, visibility
	$effect(() => {
		if (setColDefToDefault.value) {
			console.log("set to default");
			let columnOrder: ColumnOrder = [];
			let defaultColumnDef = defaultColDef.value;

			defaultColumnDef.forEach(obj => {
				// @ts-ignore
				columnOrder.push({ colId: obj.field });
			});

			gridApi.setGridOption("columnDefs", defaultColumnDef);

			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});

			setColDefToDefault.value = false;
		}
	});


	// disable page tabs if no row is selected
	$effect(() => {
		if (storedSelectedRows.value) {
			disablePageTabs.value = gridApi.getSelectedRows().length === 0;
		}
	})


	// runs when user clicks ribbon button
	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.EDIT) {
			isEditAllowed.value = !isEditAllowed.value;

			const currentColDef = gridApi.getColumnDefs();
			let isEditable = isEditAllowed.value;

			console.log("edit");

			// if (currentColDef) {
			// 	currentColDef.map((column: ColDef) => {
			// 		if (columnDefaultEditable.get(column.field)) {
			// 			column.editable = isEditable;
			// 			column.cellStyle = {
			// 				backgroundColor: isEditable ?
			// 					"rgba(245,198,11,0.05)" :
			// 					"rgba(0, 0, 0, 0)"
			// 			};
			// 		}
			// 	})
			//
			// 	gridApi.setGridOption("columnDefs", currentColDef);
			// }

			isEditable === true
				? customToast("InfoToast", "Editace byla povolena")
				: customToast("InfoToast", "Editace byla zakázána")
		}


		ribbonAction.value = RibbonActionEnum.UNKNOWN;
	})




		// if (action === RibbonActionEnum.SAVE) {
		// 	console.log(get(editedTableDataStore));
		// }

		// if (action === RibbonActionEnum.LOAD) {
		// 	gridApi.refreshServerSide();
		// }
		//
		// if (action === RibbonActionEnum.FILTER_QUICK) {
		// 	const columnName = gridApi.getFocusedCell()?.column.getColId();
		// 	const selection = window.getSelection()?.toString().trim();
		//
		// 	if (columnName && selection) {
		// 		const cellType = "text";
		// 		let currentFilters = gridApi.getFilterModel();
		//
		// 		currentFilters[columnName] = {
		// 			filterType: "multi",
		// 			filterModels: [{
		// 				filterType: cellType,
		// 				type: "contains",
		// 				filter: selection
		// 			}, null]
		// 		}
		//
		// 		gridApi.setFilterModel(currentFilters);
		// 		gridApi.onFilterChanged();
		// 	}
		// }
		//
		// if (action === RibbonActionEnum.FILTER_UNDO) {
		// 	recentFilters.pop()
		// 	if (recentFilters.length > 0) {
		// 		gridApi.setFilterModel(recentFilters[recentFilters.length - 1]);
		// 	} else {
		// 		gridApi.setFilterModel(null);
		// 	}
		// }
		//
		// if (action === RibbonActionEnum.FILTER_REMOVE) {
		// 	gridApi.setFilterModel(null);
		// }
		//
		// if (action === RibbonActionEnum.SAVE_FILTERS) {
		// 	if (Object.keys(gridApi.getFilterModel()).length > 0) {
		// 		// openedDialogStore.set("ribbon-save-filters")
		// 		// filtersStore.set(gridApi.getFilterModel())
		// 		console.log(gridApi.getFilterModel());
		// 	} else {
		// 		customToast("InfoToast", "Nemáte žádné filtry k uložení.")
		// 	}
		// }
		//
		// if (action === RibbonActionEnum.MY_FILTERS) {
		// 	openedDialogStore.set("ribbon-my-filters")
		// }
		//
		// if(action === RibbonActionEnum.SAVE_PRESET) {
		// 	openedDialogStore.set("ribbon-save-preset");
		//
		// 	console.log(gridApi.getColumnDefs());
		// 	// presetStore.set(gridApi.getColumnDefs() || [])
		// }
		//
		// if(action === RibbonActionEnum.MY_PRESETS) {
		// 	openedDialogStore.set("ribbon-my-presets");
		// }
		//
</script>


<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class={(pageCompact.value ? "compact" : "normal") + " ag-theme-custom"}
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>



<style>
	.compact {
		--ag-grid-size: 4px;
	}

	.normal {
		--ag-grid-size: 6px;
	}
</style>
