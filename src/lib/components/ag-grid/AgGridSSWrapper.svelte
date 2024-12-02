<script lang="ts">
	import {
		activeSelectedRowIndexStore,
		fulltextFilterValueStore,
		editedTableDataStore,
		selectedFilterStore,
		selectedPresetStore,
		setColDefToDefault,
		selectedRowsStore,
		defaultColDef,
		presetStore
	} from '$lib/stores/tableStore';
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import { isEditAllowedStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { disablePageTabsStore, sessionKeyStore } from '$lib/stores/pageStore';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { onDestroy, onMount } from "svelte";
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { get, writable } from 'svelte/store';
	import { customToast } from '$lib/utils/customToast';
	import { goto } from "$app/navigation";
	import {
		type CellDoubleClickedEvent,
		type CellValueChangedEvent,
		createGrid,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from 'ag-grid-enterprise';
	import type { ColumnOrder, TableRowRequest } from "$lib/types/components/table/table";
	import type { ColDef } from 'ag-grid-community';
	import type { Preset } from '$lib/types/components/table/presets';
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'

	export let url: string;
	export let requiredFields: string[];
	export let gridOptionsCustom: GridOptions;

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;
	let updateLastRow = writable(false);


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
			const selectedRows = gridApi.getSelectedRows();
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


	let recentFilters: FilterModel[] = [];
	let currentSort = []
	let previousSort: ("asc" | "desc" | null | undefined)[] = []
	const rowBatchSize = 100;
	let prevLastRow: number|null = null;
	let lastRow: number|null = null;
	let runCount = 0;


	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			runCount++;
			// console.log("RUN", runCount);

			// // store latest filters in variable
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};

			// add filter to recent filters (undo filter logic)
			if (Object.keys(currentFilter).length > 0) {
				if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
					recentFilters.push(currentFilter);
				}
			}

			// if filter or sort has changed, set lastRow to null
			if (JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				// console.log("filter changed");
				lastRow = null;
			}

			currentSort = gridApi.getColumnState().map((state) => { return state.sort })
			// console.log(currentSort);
			if (JSON.stringify(currentSort) !== JSON.stringify(previousSort)) {
				// console.log("sort changed");
				lastRow = null;
			}

			previousSort = currentSort;

			// custom request model
			let updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = get(fulltextFilterValueStore)
			updatedParamsRequest.lastRow = lastRow;
			updatedParamsRequest.rowBatchSize = rowBatchSize;
			console.log(JSON.stringify(updatedParamsRequest, null, 2));

			// AG-Grid SSRM
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
				// console.log(response.items);
				params.success({ rowData: response.items });
				// if (get(updateLastRow) === true) {
				// 	console.log("setting last row");
				// 	prevLastRow = lastRow;
					lastRow = response.items.slice(-1)[0].rowNumber || null;
				// }
			})
			.catch(error => {
				// console.log(error);
				params.fail();
			});
		}
	};


	const columnDefaultEditable = new Map()
	let timer;

	onMount(() => {
		gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		gridApi.setGridOption('serverSideDatasource', datasource);
		defaultColDef.set(gridApi.getColumnDefs() || [])

		window.addEventListener("keydown", (e) => {
			if (e.shiftKey) {
				document.getSelection()?.removeAllRanges();
			}
		})

		selectedFilterStore.subscribe((filters) => {
			if (filters) {
				gridApi.setFilterModel(filters)
				gridApi.onFilterChanged()
			}
		})

		selectedPresetStore.subscribe((preset) => {
			if (preset) {
				let columnOrder: ColumnOrder = []

				preset.forEach(obj => {
					columnOrder.push({ colId: obj.colId})
				})

				// console.log(columnOrder);

				gridApi.setGridOption("columnDefs", preset)

				gridApi.applyColumnState({
					state: columnOrder,
					applyOrder: true
				});
			}
		})

		setColDefToDefault.subscribe((data) => {
			if (data === true) {
				let columnOrder: ColumnOrder = [];
				let defaultColumnDef = get(defaultColDef);

				defaultColumnDef.forEach(obj => {
					columnOrder.push({ colId: obj.field});
				});

				// console.log(defaultColumnDef);
				// console.log(columnOrder);

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

		initialColDef?.map((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)

			column.cellStyle = {
				backgroundColor: column.editable ?
					"rgba(245,198,11,0.05)" :
					"rgba(0, 0, 0, 0)"
			};
		})

		gridApi.setGridOption("columnDefs", initialColDef);


		disablePageTabsStore.update(data => {
			if (get(selectedRowsStore).length > 0) {
				return false;
			}

			return gridApi.getSelectedRows().length === 0;
		})


		// let timer;
		fulltextFilterValueStore.subscribe((data) => {
			if (data) {
				clearTimeout(timer)
				timer = setTimeout(() => {
					lastRow = null;
					gridApi.onFilterChanged()
				}, 1000);
			}
		})

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

		ribbonActionStore.set(undefined)
	})
</script>



<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class="ag-theme-custom"
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>
