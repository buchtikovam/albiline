<script lang="ts">
	import {
		activeSelectedRowIndex, defaultColDef,
		editedTableData,
		filtersToSave,
		presetToSave, selectedFilters, selectedPreset, setColDefToDefault,
		storedSelectedRows
	} from '$lib/runes/table.svelte';
	import { fulltextFilterValue, pageCompact, sessionKey } from '$lib/runes/page.svelte';
	import { lastVisibleRowIndex } from '$lib/runes/table.svelte.js';
	import { disablePageTabs } from '$lib/runes/navigation.svelte';
	import { isEditAllowed } from '$lib/runes/ribbon.svelte';
	import { compareObjectsByFields } from '$lib/utils/general/compareObjectsByFields';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { getAgGridLocale } from "$lib/utils/components/ag-grid/getAgGridLocale";
	import { tick } from 'svelte';
	import {
		type CellValueChangedEvent,
		createGrid,
		type FilterModel, type GetContextMenuItemsParams,
		type GetRowIdParams,
		type GridApi,
		type GridOptions, type IRowNode,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from 'ag-grid-enterprise';
	import type { ColumnOrder, TableRowRequest } from '$lib/types/components/table/table';
	import type { ColDef, GetMainMenuItemsParams } from 'ag-grid-community';
	import type { Preset } from '$lib/types/components/table/presets';
	import 'ag-grid-community/styles/ag-grid.css';
	import '$lib/ag-grid-theme-builder.pcss';



	interface Props {
		url: string;
		requiredFields: string[];
		gridOptionsCustom: GridOptions;
		headerTranslations: Record<string, () => string>
	}

	let {
		url,
		requiredFields,
		gridOptionsCustom,
		headerTranslations
	}: Props = $props();



	let gridContainer: HTMLElement|undefined = $state(undefined);
	let gridApi: GridApi<unknown>;


	const gridOptions: GridOptions = {
		rowSelection: {
			mode: 'multiRow',
			enableClickSelection: true,
			headerCheckbox: false,
			hideDisabledCheckboxes: true,
		},

		localeText: getAgGridLocale(),

		getMainMenuItems: (params: GetMainMenuItemsParams) => {
			return [
				'pinSubMenu',
				'separator',
				'autoSizeThis',
				'columnChooser',
				'resetColumns',
				'separator',
				'sortUnSort',
			];
		},

		getContextMenuItems: (params: GetContextMenuItemsParams) => {
			return [
				'copy',
				'copyWithHeaders',
				'cut',
				'paste',
			];
		},

		columnTypes: {
			formattedDate: {}
		},

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 60,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			filterParams: {
				filters: [
					{
						filter: 'agTextColumnFilter',
						filterParams: {
							buttons: ["apply", "reset"],
						}
					},
				]
			},
			autoHeaderHeight: true,
			suppressHeaderMenuButton: true,
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

		rowModelType: "serverSide",
		serverSideInitialRowCount: 10000,
		cacheBlockSize: 100,
		maxBlocksInCache: 20,
		blockLoadDebounceMillis: 600,
		enableCellTextSelection: true,
		maintainColumnOrder: true,
		enterNavigatesVerticallyAfterEdit: true,
		undoRedoCellEditing: true,
		undoRedoCellEditingLimit: 20,
	}


	let recentFilters: FilterModel[] = [];
	let isInitialGridLoad = $state(true);
	let isLoaded = $state(false);


	$inspect(isLoaded);


	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			isLoaded = false;
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = fulltextFilterValue.value;

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			console.log(JSON.stringify(updatedParamsRequest, null, 1))

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
				})
				.then(() => {
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
			gridApi.onFilterChanged()
		}, 1000)
	}

	$effect(() => { // todo ?????
		if (fulltextFilterValue.value) {
			isInitialFilterValue = false;
			debounceFulltext();
		}

		if (fulltextFilterValue.value === "" && !isInitialFilterValue) {
			debounceFulltext();
		}
	})


	const columnDefaultEditable = new Map();


	//  TODO if user has unsaved filters / preset / selected rows and navigated between page tabs, display them
	$effect(() => {
		if (isInitialGridLoad && isLoaded) {
			if (presetToSave.value.length > 0) {
				let columnOrder: ColumnOrder = []

				presetToSave.value.forEach((obj: Preset) => {
					obj.headerName = headerTranslations[obj.field]()
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
				}, 200);
			}

			gridApi.ensureIndexVisible(lastVisibleRowIndex.value, "top");
			gridApi.setGridOption("loading", false);
			isInitialGridLoad = false;
		}
	})



	// runs when component is mounted only
	$effect(() => {
		console.log("_________mount_________")

		if (gridContainer) {
			gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		}

		gridApi.setGridOption('serverSideDatasource', datasource);

		const colDefs = gridApi.getColumnDefs();
		colDefs?.forEach((column: ColDef) => {
			column.headerName = headerTranslations[column.field]();
		})

		defaultColDef.value = colDefs || [];

		// set background color of editable columns on page load, map initial column editable state
		colDefs?.map((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)
		})

		gridApi.setGridOption("columnDefs", colDefs);

		// TODO filtry
		// setTimeout(() => {
		// 	if (Object.keys(filtersToSave.value).length > 0) {
		// 		console.log("load_filters");
		// 		gridApi.setFilterModel(filtersToSave.value);
		// 	}
		// }, 200);
		//
		// return () => {
		// 	fulltextFilterValue.value = "";
		//
		// 	lastVisibleRowIndex.value = gridApi.getFirstDisplayedRowIndex() < 10
		// 		? gridApi.getFirstDisplayedRowIndex()
		// 		: gridApi.getFirstDisplayedRowIndex() + 10
		// }
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
				columnOrder.push({ colId: obj.colId })
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
