<script lang="ts">
	import { testColDef } from '$lib/data/column-definitons/test';
	import { columnOrderStore, currentColumnFiltersStore, editedDataStore } from "$lib/stores/tableStore";
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import { onMount } from "svelte";
	import { 
		createGrid, 
		type FilterModel, 
		type GridApi, 
		type GridOptions, 
		type IServerSideDatasource, 
		type IServerSideGetRowsParams 
	} from "ag-grid-enterprise";
	import { isEditAllowedStore, openedDialogStore, ribbonActionStore } from "$lib/stores/ribbonStore";
	import { RibbonActionEnum } from "$lib/enums/ribbon/ribbonAction";
	import { customToast } from "$lib/utils/toast/customToast";
	import { get } from 'svelte/store';

	export let columnDefinitions: any[];
	export let url: string;

	// TODO: listen to ribbon

	let gridContainer: HTMLElement;
	
	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 100,
			maxWidth: 400,
			filter: 'agTextColumnFilter'
		},	

		onCellValueChanged: (event) => {
			console.log(`New Cell Value: ${JSON.stringify(event.newValue)}`)
		},

		maintainColumnOrder: true, 
		columnDefs: columnDefinitions,
		rowModelType: "serverSide",
		rowSelection: "multiple",
		cacheBlockSize: 1000,
		maxBlocksInCache: 10,
	}



	let gridApi: GridApi<unknown>;
	let recentFilters: FilterModel[] = [];

	
	
	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {

			// infinite scroll model
			let updatedParamsRequest = params.request
			updatedParamsRequest.fullText = gridApi.getQuickFilter() === undefined ? "" : gridApi.getQuickFilter()


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
	})



	ribbonActionStore.subscribe((action) => {		
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

		if (action === RibbonActionEnum.MY_FILTERS) {
			console.log(action);
			
			openedDialogStore.set("my-filters")
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
