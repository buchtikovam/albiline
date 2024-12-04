<script lang="ts">
	import {
		activeSelectedRowIndexStore,
		defaultColDef,
		editedTableDataStore,
		fulltextFilterValueStore,
		presetStore,
		selectedFilterStore,
		selectedPresetStore,
		selectedRowsStore,
		setColDefToDefault
	} from '$lib/stores/tableStore';
	import { isEditAllowedStore, openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { disablePageTabsStore, pageCompactStore, sessionKeyStore } from '$lib/stores/pageStore';
	import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
	import { filtersStore } from '$lib/stores/tableStore.js';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { onDestroy, onMount } from 'svelte';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { scrollGridToTop } from '$lib/utils/components/ag-grid/scrollGridToTop';
	import { get } from 'svelte/store';
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
	import type { ColDef } from 'ag-grid-community';
	import type { Preset } from '$lib/types/components/table/presets';
	import 'ag-grid-community/styles/ag-grid.css';
	import '$lib/ag-grid-theme-builder.pcss';


	export let url: string;
	export let requiredFields: string[];
	export let gridOptionsCustom: GridOptions;

	let gridContainer: HTMLElement;
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
					editedTableDataStore
				)
			}
		},

		onColumnResized: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		onFilterChanged() {
			filtersStore.set(gridApi.getFilterModel());
		},

		onColumnMoved: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		onColumnVisible: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber);
		},

		onRowSelected: () => {
			const selectedRows: any[] = gridApi.getSelectedRows();
			let rowArr: {[key: string]: any}[] = []

			disablePageTabsStore.set(selectedRows.length === 0)
			activeSelectedRowIndexStore.set(0)

			selectedRows.forEach((row) => {
				let rowObj: {[key: string]: any} = {}
				requiredFields.forEach((field) => {
					rowObj[field] = row[field]
				})

				rowArr.push(rowObj);
			})

			selectedRowsStore.set(rowArr)
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
			updatedParamsRequest.fulltext = get(fulltextFilterValueStore)
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
						"Session-Key": get(sessionKeyStore)
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
	let timer: NodeJS.Timeout;
	fulltextFilterValueStore.subscribe((data) => {
		if (data) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				lastRow = null;
				gridApi.onFilterChanged()
			}, 1000);
		}
	})


	const columnDefaultEditable = new Map()
	let isPageCompact: boolean;


	onMount(() => {
		gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		gridApi.setGridOption('serverSideDatasource', datasource);
		defaultColDef.set(gridApi.getColumnDefs() || [])


		// setting filters from ribbon
		selectedFilterStore.subscribe((filters) => {
			if (filters) {
				gridApi.setFilterModel(filters)
				gridApi.onFilterChanged()
			}
		})


		// setting preset from ribbon
		selectedPresetStore.subscribe((preset) => {
			if (preset) {
				console.log("preset", preset);
				let columnOrder: ColumnOrder = []

				preset.forEach(obj => {
					columnOrder.push({ colId: obj.colId})
				})

				gridApi.setGridOption("columnDefs", preset)

				gridApi.applyColumnState({
					state: columnOrder,
					applyOrder: true
				});
			}
		})


		// if true, then set columnDefs to default
		// invoked from ribbon
		setColDefToDefault.subscribe((data) => {
			if (data) {
				let columnOrder: ColumnOrder = [];
				let defaultColumnDef = get(defaultColDef);

				defaultColumnDef.forEach(obj => {
					columnOrder.push({ colId: obj.field});
				});

				gridApi.setGridOption("columnDefs", defaultColumnDef);

				gridApi.applyColumnState({
					state: columnOrder,
					applyOrder: true
				});

				setColDefToDefault.set(false);
			}
		})


		// set background color of editable columns on page load,
		// map initial column editable state
		const initialColDef = gridApi.getColumnDefs()
		const canEdit = get(isEditAllowedStore);

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


		// disable page tabs if no row is selected
		disablePageTabsStore.update(() => {
			if (get(selectedRowsStore).length > 0) {
				return false;
			}

			return gridApi.getSelectedRows().length === 0;
		})


		// if routing between list and details, restore column order, visibility
		if (get(presetStore)?.length > 0) {
			let columnOrder: ColumnOrder = []

			get(presetStore).forEach((obj: Preset) => {
				columnOrder.push({ colId: obj.colId})
			})

			gridApi.setGridOption("columnDefs", get(presetStore))

			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});
		}


		// if routing from details to list, restore filters
		if (Object.keys(get(filtersStore)).length > 0) {
			gridApi.setFilterModel(get(filtersStore))
		}


		// remove selection on shift
		window.addEventListener("keydown", (e) => {
			if (e.shiftKey) {
				document.getSelection()?.removeAllRanges();
			}
		})

		// set compact mode
		isPageCompact = get(pageCompactStore);
	})


	onDestroy(() => {
		fulltextFilterValueStore.set(undefined)
	})


	ribbonActionStore.subscribe((action) => {
		if (action === RibbonActionEnum.EDIT) {
			isEditAllowedStore.update((data) => !data)

			const currentColDef = gridApi.getColumnDefs()
			let isEditable = get(isEditAllowedStore)

			if (currentColDef) {
				currentColDef.map((column: ColDef) => {
					if (columnDefaultEditable.get(column.field)) {
						column.editable = isEditable;
						column.cellStyle = {
							backgroundColor: isEditable ?
								"rgba(245,198,11,0.05)" :
								"rgba(0, 0, 0, 0)"
						};
					}
				})

				gridApi.setGridOption("columnDefs", currentColDef);
			}

			isEditable === true
				? customToast("InfoToast", "Editace byla povolena")
				: customToast("InfoToast", "Editace byla zakázána")
		}

		if (action === RibbonActionEnum.SAVE) {
			console.log(get(editedTableDataStore));
		}

		if (action === RibbonActionEnum.LOAD) {
			gridApi.refreshServerSide();
		}

		if (action === RibbonActionEnum.FILTER_QUICK) {
			const columnName = gridApi.getFocusedCell()?.column.getColId();
			const selection = window.getSelection()?.toString().trim();

			if (columnName && selection) {
				const cellType = "text";
				let currentFilters = gridApi.getFilterModel();

				currentFilters[columnName] = {
					filterType: "multi",
					filterModels: [{
						filterType: cellType,
						type: "contains",
						filter: selection
					}, null]
				}

				gridApi.setFilterModel(currentFilters);
				gridApi.onFilterChanged();
			}
		}

		if (action === RibbonActionEnum.FILTER_UNDO) {
			recentFilters.pop()
			if (recentFilters.length > 0) {
				gridApi.setFilterModel(recentFilters[recentFilters.length - 1]);
			} else {
				gridApi.setFilterModel(null);
			}
		}

		if (action === RibbonActionEnum.FILTER_REMOVE) {
			gridApi.setFilterModel(null);
		}

		if (action === RibbonActionEnum.SAVE_FILTERS) {
			if (Object.keys(gridApi.getFilterModel()).length > 0) {
				// openedDialogStore.set("ribbon-save-filters")
				// filtersStore.set(gridApi.getFilterModel())
				console.log(gridApi.getFilterModel());
			} else {
				customToast("InfoToast", "Nemáte žádné filtry k uložení.")
			}
		}

		if (action === RibbonActionEnum.MY_FILTERS) {
			openedDialogStore.set("ribbon-my-filters")
		}

		if(action === RibbonActionEnum.SAVE_PRESET) {
			openedDialogStore.set("ribbon-save-preset");

			console.log(gridApi.getColumnDefs());
			// presetStore.set(gridApi.getColumnDefs() || [])
		}

		if(action === RibbonActionEnum.MY_PRESETS) {
			openedDialogStore.set("ribbon-my-presets");
		}

		ribbonActionStore.set(undefined);
	})
</script>



<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class={(isPageCompact ? "compact" : "normal") + " ag-theme-custom"}
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>



<style>
	.compact {
		--ag-grid-size: 4px;
	}

	.normal {
		--ag-grid-size: 6px; /* very compact */

	}
</style>
