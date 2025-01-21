<script lang="ts">
	import {
		activeSelectedRowIndex, defaultColDef,
		editedTableData,
		filtersToSave, lastRowAndPositions,
		presetToSave, selectedFilters, selectedPreset, setColDefToDefault,
		storedSelectedRows
	} from '$lib/runes/table.svelte';
	import { fulltextFilterValue, pageCompact, sessionKey } from '$lib/runes/page.svelte';
	import { isEditAllowed, ribbonAction } from '$lib/runes/ribbon.svelte';
	import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
	import { disablePageTabs } from '$lib/runes/navigation.svelte';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { tick } from 'svelte';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { scrollGridToTop } from '$lib/utils/components/ag-grid/scrollGridToTop';
	import { customToast } from '$lib/utils/customToast';
	import {
		type CellValueChangedEvent,
		createGrid,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions, type IRowNode,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from 'ag-grid-enterprise';
	import type { ColumnOrder, TableRowRequest } from '$lib/types/components/table/table';
	import type { ColDef } from 'ag-grid-community';
	import 'ag-grid-community/styles/ag-grid.css';
	import '$lib/ag-grid-theme-builder.pcss';
	import { lastVisibleRowIndex } from '$lib/runes/table.svelte.js';
	import type { Preset } from '$lib/types/components/table/presets';
	import { compareObjectsByFields } from '$lib/utils/general/compareObjectsByFields';


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
			});

			storedSelectedRows.value = rowArr;
		},

		paginationPageSize: 100,
		serverSideInitialRowCount: 1000,
		cacheBlockSize: 100,
	}


	const rowBatchSize = 100;
	let recentFilters: FilterModel[] = [];
	let currentSort: ("asc" | "desc" | null | undefined)[] = []
	let previousSort: ("asc" | "desc" | null | undefined)[] = []
	let lastRow: number|null = null;
	let isInitialGridLoad = $state(true);
	let isLoaded = $state(false);


	$inspect(lastRowAndPositions.value);
	$inspect(lastVisibleRowIndex.value);

	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			console.time("load");
			isLoaded = false;
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			// if filter has changed, set lastRow to null
			if (JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				console.log("filter changed");
				updatedParamsRequest.startRow = 0;
				updatedParamsRequest.endRow = rowBatchSize;
				lastRow = null;
				lastRowAndPositions.value = [];
				scrollGridToTop();
			}

			// // if sort has changed, set lastRow to null
			// currentSort = gridApi.getColumnState().map((state) => state.sort)
			// if (JSON.stringify(currentSort) !== JSON.stringify(previousSort)) {
			// 	console.log("sort changed");
			// 	updatedParamsRequest.startRow = 0;
			// 	updatedParamsRequest.endRow = rowBatchSize;
			// 	lastRow = null;
			// 	lastRowAndPositions.value = [];
			// 	scrollGridToTop();
			// }

			// previousSort = currentSort;

			// custom request model
			updatedParamsRequest.fulltext = fulltextFilterValue.value;
			updatedParamsRequest.lastRow = lastRow;
			updatedParamsRequest.rowBatchSize = rowBatchSize;
			// updatedParamsRequest.endRow = (updatedParamsRequest.startRow === 0 ? 50 : updatedParamsRequest.startRow) * 2;

			// check if requested block is already in lastRowAndPositions
			// (solves refresh issue - not providing correct lastRow)
			let match = false;
			lastRowAndPositions.value.forEach((obj) => {
				if (obj.startRow === updatedParamsRequest.startRow && obj.endRow === updatedParamsRequest.endRow) {
					match = true;
					updatedParamsRequest.lastRow = obj.lastRow;
				}
			})

			if (!match) {
				console.log("no match");
				const lastIndex = lastVisibleRowIndex.value;

				if (lastIndex > 0) {
					console.log("index higher");
					console.log("row positions", lastRowAndPositions.value);

					lastRowAndPositions.value.forEach((value) => {
						if (lastIndex > value.startRow && lastIndex < value.endRow) {
							console.log("index found between", value.startRow, value.endRow);
							updatedParamsRequest.startRow = value.startRow;
							updatedParamsRequest.endRow = value.endRow;
							updatedParamsRequest.lastRow = value.lastRow;

							lastVisibleRowIndex.value = 0;
						}
					})
				} else {
					console.log("index lower");
					lastRowAndPositions.value.push({
						startRow: updatedParamsRequest.startRow,
						endRow: updatedParamsRequest.endRow,
						lastRow: updatedParamsRequest.lastRow
					})
				}
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
					console.timeEnd("load")
					lastRow = response.items.slice(-1)[0].rowNumber || null;
					isLoaded = true;
				})
				.catch(error => {
					console.log(error);
					params.fail();
				});
		}
	};


	// listening to fulltext filter changes from layout, refresh grid with delay
	let isInitialFilterValue = true; // prevent double page load
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
			isInitialFilterValue = false;
			debounceFulltext();
		}

		if (fulltextFilterValue.value === "" && !isInitialFilterValue) {
			debounceFulltext();
		}
	})


	const columnDefaultEditable = new Map();


	// if user has unsaved filters / preset / selected rows and navigated between page tabs, display them
	$effect(() => {
		if (isInitialGridLoad && isLoaded) {
			if (presetToSave.value.length > 0) {
				let columnOrder: ColumnOrder = []

				presetToSave.value.forEach((obj: Preset) => {
					// @ts-ignore
					columnOrder.push({ colId: obj.colId })
				})

				gridApi.setGridOption("columnDefs", presetToSave.value)

				gridApi.applyColumnState({
					state: columnOrder,
					applyOrder: true
				});
			}


			if (storedSelectedRows.value.length > 0) {
				setTimeout(() => {
					gridApi.forEachNode((node: IRowNode) => {
						storedSelectedRows.value.forEach((storedRow) => {
							if (compareObjectsByFields(node.data, storedRow, requiredFields)) {
								console.log("yay", node.data.customerAddressCode);
								node.setSelected(true);
							}
						})
					})
				}, 1500)
			}

			setTimeout(() => {
				gridApi.ensureIndexVisible(lastVisibleRowIndex.value, "top");
				gridApi.setGridOption("loading", false);
				isInitialGridLoad = false;
			}, 1500)
		}
	})



	// runs when component is mounted only
	$effect(() => {
		gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		gridApi.setGridOption('serverSideDatasource', datasource);
		// gridApi.setGridOption("loading", true);
		defaultColDef.value = gridApi.getColumnDefs() || [];

		const initialColDef = gridApi.getColumnDefs();
		const canEdit = isEditAllowed.value;
		// set background color of editable columns on page load, map initial column editable state
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


		setTimeout(() => {
			if (Object.keys(filtersToSave.value).length > 0) {
				console.log("load_filters");
				gridApi.setFilterModel(filtersToSave.value);
			}
		}, 200);

		return () => {
			fulltextFilterValue.value = "";

			lastVisibleRowIndex.value = gridApi.getFirstDisplayedRowIndex() < 10
				? gridApi.getFirstDisplayedRowIndex()
				: gridApi.getFirstDisplayedRowIndex() + 10
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
		disablePageTabs.value = storedSelectedRows.value.length === 0;
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
		--ag-grid-size: 3px;
	}

	.normal {
		--ag-grid-size: 5px;
	}
</style>
