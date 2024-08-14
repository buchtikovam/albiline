<script lang="ts">
	import { columnOrderStore, currentColumnFiltersStore, editedDataStore, presetStore, selectedFilterStore, selectedPresetStore } from "$lib/stores/tableStore";
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
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
	import { customToast } from "$lib/utils/toast/customToast";
	import { get } from 'svelte/store';

	// delete, new row, save, save preset, my presets
	
	export let columnDefinitions: any[];
	export let url: string;


	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;

	
	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 100,
			maxWidth: 400,
			hide: false,
			filter: 'agTextColumnFilter'
		},	

		onCellValueChanged: (event) => {
			addToEditedData(event.data, event.column.getColId(), event.newValue)
		},

		getRowId: (params: GetRowIdParams) => {			
			return String(params.data.id);
		},

		maintainColumnOrder: true, 
		columnDefs: columnDefinitions,
		rowModelType: "serverSide",
		rowSelection: "multiple",
		cacheBlockSize: 1000,
		maxBlocksInCache: 10,
		debug: true
	}

	// TODO: maintain column widths

	let recentFilters: FilterModel[] = [];
	
	function addToEditedData(params: Record<string, any>, column: string, newValue: any) {
		let editedData = get(editedDataStore);
		let foundMatch = false;

		editedData.forEach((record) => {
			if (record.id === params.id) {
				foundMatch = true;
				record[column] = newValue;
				editedDataStore.set(editedData);
			}	
		})

		if (!foundMatch) {
			editedDataStore.update((records) => records.concat(params));
		}
	}


	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {

			// infinite scroll model
			let updatedParamsRequest = params.request
			updatedParamsRequest.fullText = gridApi.getQuickFilter() === undefined ? "" : gridApi.getQuickFilter()
			console.log(JSON.stringify(updatedParamsRequest, null, 1));
			

			// column order
			const cols = gridApi!.getAllGridColumns();
			const colOrder: string[] = [] // remove hidden columns ? 
			cols.map((column) => {
				colOrder.push(column.getId());
			});
			columnOrderStore.set(colOrder);


			// store latest filters in variable
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1]

			if (Object.keys(currentFilter).length > 0) {
				if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
					recentFilters.push(currentFilter)
				}
			}

			console.log(recentFilters);


			fetch(url
				// ,{
				// 	method: "post",
				// 	body: JSON.stringify(params.request),
				// 	headers: {"Content-Type": "application/json"}
				// }
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {		
				params.success({ rowData: response.products})
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
			console.log(filters);
			gridApi.setFilterModel(filters)
		})

		selectedPresetStore.subscribe((preset) => {
			console.log(preset);
			gridApi.setGridOption("columnDefs", preset)
		}) 
	})



	ribbonActionStore.subscribe((action) => {		
		if (action === RibbonActionEnum.NEW) { // todo: ask be for number of rows, use that as id			
			gridApi.applyServerSideTransaction({
				addIndex: 0,
				add: [{
					// id: "1000",
					title: "",
					description: "",
					category: "",
					price: "",
					discountPercentage: ""
				}]
			})	
		}

		if (action === RibbonActionEnum.EDIT) {
			isEditAllowedStore.update((data) => !data)

			let isEditable = get(isEditAllowedStore)
		
			columnDefinitions.map((column) => {
				column.editable = isEditable
			}) 
			
			gridApi.setGridOption("columnDefs", columnDefinitions);

			isEditable === true 
				? customToast("InfoToast", "Editace byla povolena.")
				: customToast("InfoToast", "Editace byla zakázána.")
		}

		if (action === RibbonActionEnum.DELETE) { // add post rq
			const selectedRows = gridApi!.getSelectedRows();

			console.log(selectedRows.map((row) => row.id));
		}

		if (action === RibbonActionEnum.SAVE) { // todo
			console.log(get(editedDataStore));
			
		}

		if (action === RibbonActionEnum.LOAD) { // todo
			
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
			presetStore.set(gridApi.getColumnDefs())
		}

		if(action === RibbonActionEnum.MY_PRESETS) {
			openedDialogStore.set("my-presets");
		}

		ribbonActionStore.set(undefined)
	})	
</script>



<!-- <input 
	type="text"
	id="fulltext-filter"
	placeholder="Hledat..."
/> -->

<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class="ag-theme-quartz"
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>

<!-- TODO: text selection -->