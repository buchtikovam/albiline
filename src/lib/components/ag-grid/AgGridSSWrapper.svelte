<script lang="ts">
	import { currentColumnFiltersStore, deletedColumnsStore, editedColumnsStore, presetStore, selectedFilterStore, selectedPresetStore, selectedRowIdStore } from "$lib/stores/tableStore";
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'
	import { onMount } from "svelte";
	import { 
		createGrid, 
		type FilterModel, 
		type GetRowIdParams, 
		type GridApi, 
		type GridOptions, 
		type IServerSideDatasource, 
		type IServerSideGetRowsParams,
	} from "ag-grid-enterprise";
	import { isEditAllowedStore, openedDialogStore, ribbonActionStore } from "$lib/stores/ribbonStore";
	import { RibbonActionEnum } from "$lib/enums/ribbon/ribbonAction";
	import { customToast } from "$lib/utils/customToast";
	import { get } from 'svelte/store';
	import type { ColumnOrder, TableRowRequest } from "$lib/types/components/table/table";
	
	export let columnDefinitions: any[];
	export let url: string;

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;
	
	const gridOptions: GridOptions = { // return from grid options 
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 100,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
		},	

		onCellValueChanged: (event) => {
			addToEditedData(event.data, event.column.getColId(), event.newValue)
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

		onRowSelected: (event) => {
			console.log(event.data.customerAddressCode);

			selectedRowIdStore.set(event.data.customerAddressCode)
		},

		columnDefs: columnDefinitions,
		suppressExcelExport: true,
		suppressCsvExport: true,
		maintainColumnOrder: true, 
		enableCellTextSelection: true,
		ensureDomOrder: true,
		suppressRowClickSelection: true,
		rowModelType: "serverSide",
		rowSelection: "multiple",
		rowBuffer: 1,
		cacheBlockSize: 500,
		debug:true,
	}

	let recentFilters: FilterModel[] = [];
	let currentSort = []
	let previousSort: ("asc" | "desc" | null | undefined)[] = []


	function addToEditedData(params: Record<string, any>, column: string, newValue: any) {
		let editedData = get(editedColumnsStore);
		let foundMatch = false;
		let newRecord = {};

		editedData.forEach((record) => {
			if (record.id === params["customerAddressCode"]) {
				foundMatch = true;
				record[column] = newValue;
				editedColumnsStore.set(editedData);
			}	
		})

		if (!foundMatch) {
			newRecord["id"] = params["customerAddressCode"];
			newRecord[column] = newValue;
			
			editedColumnsStore.update((records) => records.concat(newRecord));
		}
	}

	editedColumnsStore.subscribe((records) => console.log(records));



	export function customDebounce (callback: Function, wait = 500) { // TODO: on fulltext store change, with debounce, call onFilterChanged()
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => callback(...args), wait);
		};
	};
		

	const rowBatchSize = 500;
	let lastRow: number|null = null;
	let runCount = 0;

	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			runCount++;
			console.log("RUN", runCount);

			// store latest filters in variable
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
				console.log("test");
				
				lastRow = null;
			}
			
			currentSort = gridApi.getColumnState().map((state) => { return state.sort })
			if (JSON.stringify(currentSort) !== JSON.stringify(previousSort)) {
				console.log("test2");
				lastRow = null;
			}			
			previousSort = currentSort;
			

			// custom request model
			let updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = gridApi.getQuickFilter() === undefined ? "" : gridApi.getQuickFilter()
			updatedParamsRequest.lastRow = lastRow;
			updatedParamsRequest.rowBatchSize = rowBatchSize;
			console.log(JSON.stringify(updatedParamsRequest, null, 1));


			// AG-Grid SSRM
			fetch(url
				,{ 
					method: "post",
					body: JSON.stringify(params.request),
					headers: {"Content-Type": "application/json"}
				}
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {
				params.success({ rowData: response.items })
				lastRow = response.items.slice(-1)[0].rowNumber || null
			})
			.catch(error => {
				console.log(error);
				params.fail();
			});
		}
	};


	onMount(() => {
		gridApi = createGrid(gridContainer, gridOptions);
		gridApi.setGridOption('serverSideDatasource', datasource);

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
				
				gridApi.setGridOption("columnDefs", preset)

				gridApi.applyColumnState({
					state: columnOrder,
					applyOrder: true
				});
			}
		}) 

		if (get(presetStore)?.length > 0) {										
			let columnOrder: ColumnOrder = []

			get(presetStore).forEach(obj => {
				columnOrder.push({ colId: obj.colId})
			})
			
			gridApi.setGridOption("columnDefs", get(presetStore))

			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});
		}

		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'f' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.FILTER_QUICK)
			}

			if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.SAVE);
			}

			if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				ribbonActionStore.set(RibbonActionEnum.LOAD);
			}
		}

		document.addEventListener('keydown', handleKeydown);
	})

	ribbonActionStore.subscribe((action) => {		
		if (action === RibbonActionEnum.NEW) { 
			gridApi.applyServerSideTransaction({
				addIndex: 0,
				add: []
			})	
		}

		if (action === RibbonActionEnum.EDIT) {
			isEditAllowedStore.update((data) => !data)

			let isEditable = get(isEditAllowedStore)
		
			const currentColDef = gridApi.getColumnDefs()
			
			if (currentColDef) {
				currentColDef.map((column) => {
					column.editable = isEditable
				}) 

				gridApi.setGridOption("columnDefs", currentColDef);
			}

			isEditable === true 
				? customToast("InfoToast", "Editace byla povolena")
				: customToast("InfoToast", "Editace byla zakázána")
		}

		if (action === RibbonActionEnum.DELETE) { // add post rq
			const selectedRows = gridApi!.getServerSideSelectionState();
		}

		if (action === RibbonActionEnum.SAVE) { // todo
			let requestData = {
				insert: [],
				update: get(editedColumnsStore),
				delete: get(deletedColumnsStore)
			}
			
			console.log(requestData);	
		}

		if (action === RibbonActionEnum.LOAD) { // todo
			gridApi.refreshServerSide()
		}editedColumnsStore

		if (action === RibbonActionEnum.EXPORT_EXCEL) {
			console.log("excel");
			
		}

		if (action === RibbonActionEnum.EXPORT_CSV) {
			console.log("csv");
			
		}

		if (action === RibbonActionEnum.FILTER_QUICK) {
			const columnName = gridApi.getFocusedCell()?.column.getColId();
			const selection = window.getSelection()?.toString().trim();
			console.log(selection);
			
			
			if (columnName) {
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

				gridApi.setFilterModel(currentFilters)
				gridApi.onFilterChanged()
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
			gridApi.setFilterModel(null)
		}

		if (action === RibbonActionEnum.SAVE_FILTERS) {
			if (Object.keys(gridApi.getFilterModel()).length > 0) {
				openedDialogStore.set("save-filters")
				currentColumnFiltersStore.set(gridApi.getFilterModel())
			} else {
				customToast("InfoToast", "Nemáte žádné filtry k uložení.")
			}	
		}

		if (action === RibbonActionEnum.MY_FILTERS) {
			openedDialogStore.set("my-filters")
		}

		if(action === RibbonActionEnum.SAVE_PRESET) {
			openedDialogStore.set("save-preset");

			console.log(gridApi.getColumnDefs());
			presetStore.set(gridApi.getColumnDefs() || [])
		}

		if(action === RibbonActionEnum.MY_PRESETS) {
			openedDialogStore.set("my-presets");
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