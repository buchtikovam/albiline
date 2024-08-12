<script lang="ts">
	import { columnOrderStore } from "$lib/stores/tableStore";
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
	import { ribbonActionStore } from "$lib/stores/ribbonStore";
	import { RibbonActionEnum } from "$lib/enums/ribbon/ribbonAction";

	export let columnDefinitions;
	export let url: string;

	// TODO: listen to ribbon

	let gridContainer;
	
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

		columnDefs: columnDefinitions,

		onCellValueChanged: (event) => {
			console.log(`New Cell Value: ${JSON.stringify(event.newValue)}`)
		},

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
			console.log(updatedParamsRequest);


			// column order
			const cols = gridApi!.getAllGridColumns();
			const colOrder: string[] = [] // remove hidden columns ? 
			cols.map((column) => {
				colOrder.push(column.getId());
			});
			console.log(colOrder);
			columnOrderStore.set(colOrder);


			// get filter instances into variable
			const currentFilter = gridApi.getFilterModel();
			console.log(currentFilter);


			// TODO: save last filters into store / local storeage
			const lastStoredFilter = recentFilters[recentFilters.length - 1]

			if (Object.keys(currentFilter).length > 0) {
				console.log("keys");
				if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
					console.log("if");
					
					recentFilters.push(currentFilter)
					console.log(recentFilters);
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


	ribbonActionStore.subscribe((action: RibbonActionEnum) => {
		console.log(action);
		
		
		if (action === RibbonActionEnum.FILTER_UNDO) {
			let lastFilter = recentFilters.pop()
			if (lastFilter) {
				gridApi.setFilterModel(lastFilter)
			}

			
			
		}

	})


	onMount(() => {
		gridApi = createGrid(gridContainer, gridOptions);
		gridApi.setGridOption('serverSideDatasource', datasource);
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


<!-- TODO: style checkboxes -->