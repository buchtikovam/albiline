<script lang="ts">
	import { editedDataStore } from './../../../../lib/stores/tableStore.ts';
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

	let gridContainer;	

	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
     	   sortable: true,
		   editable: true,
		   filter: 'agTextColumnFilter'
    	},
		
		columnDefs : [
			{ 
				checkboxSelection: true,
				headerCheckboxSelection: true,
				filter: false,
				suppressHeaderMenuButton: true,
				sortable: false
			},
			{ 
				field: "title",
				headerName: "Název"
			},
			{ 
				field: "description",
				headerName: "Popis"
			},
			{ field: "category", headerName: "Kategorie"},
			{ field: "price", headerName: "Cena"},
			{ field: "discountPercentage", headerName: "Výše slevy"}
		],

		onCellValueChanged: (event) => {
			editedDataStore.update((data) => data.concat(event.data))
			console.log(`New Cell Value: ${JSON.stringify(event.newValue)}`)
		},

		rowModelType: 'serverSide',
		rowSelection: "multiple",
		debug: true,
	}


	editedDataStore.subscribe(data => {
		console.log(data);
		
	})

	let gridApi: GridApi<unknown>;


	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {
			let url = 'https://dummyjson.com/products?';

			let updatedParamsRequest = params.request
			updatedParamsRequest.fulltext = gridApi.getQuickFilter || "";

			console.log(JSON.stringify(updatedParamsRequest, null, 1));
			
			fetch(url
			//  {
			// 	method: "post",
			// 	body: JSON.stringify(params.request),
			// 	headers: {"Content-Type": "application/json"}
			// }
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {				
				params.success({ rowData: response.products })
			})
			.catch(error => {
				console.log(error);
                params.fail();
			});
		}
	};


	onMount(() => {
		// const gridEl = document.getElementById("datagrid")
		// if (!gridEl) {
		// throw new Error("Grid element not found.");
		// }

		gridApi = createGrid(gridContainer, gridOptions)
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
	<title>Albiline | Hodinovka</title>
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



