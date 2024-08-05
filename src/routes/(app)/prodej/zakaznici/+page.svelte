<script lang="ts">
	import 'ag-grid-enterprise'
	import  { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
	import { 
		createGrid,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from "ag-grid-community"
	import { onMount } from 'svelte'
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import { zakazniciColDef } from '$lib/data/column-definitons/zakaznici';

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

		columnDefs: zakazniciColDef,

		onCellValueChanged: (event) => {
			console.log(`New Cell Value: ${JSON.stringify(event.newValue)}`)
		},

		rowModelType: 'serverSide',
		// rowSelection: "multiple",
		cacheBlockSize: 1000,
		// maxBlocksInCache: 4,
		// debug: true,
	}


	let gridApi: GridApi<unknown>;

		
	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {
			let url = 'http://10.2.2.181/customers'

			// let updatedParamsRequest = params.request
			// updatedParamsRequest.fulltext = gridApi.getQuickFilter()

			// console.log("updatedParams", updatedParamsRequest);

			fetch(url, 
				{
					method: "post",
					body: JSON.stringify(params.request),
					headers: {"Content-Type": "application/json"}
				}
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {	
				console.log(response);
							
				params.success({ rowData: response})
			})
			.catch(error => {
				console.log("fail");
				console.log(error);
				params.fail();
			});
		}
	};




	onMount(() => {
		// const gridEl = document.getElementById("datagrid")
		// if (!gridEl) {
		// 	throw new Error("Grid element not found.");
		// }

		gridApi = createGrid(gridContainer, gridOptions);
		gridApi.setGridOption('serverSideDatasource', datasource);
	})

	function onFilterTextBoxChanged() {
		gridApi!.setGridOption(
			"quickFilterText",
			(document.getElementById("fulltext-filter") as HTMLInputElement).value,
		);
	}
</script>



<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>



<input 
	type="text"
	id="fulltext-filter"
	placeholder="Hledat..."
	on:input={onFilterTextBoxChanged}
/>

<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class="ag-theme-quartz"
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>
