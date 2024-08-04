<script lang="ts">
	import "$lib/ag-grid-theme-builder.css"
	import 'ag-grid-enterprise'
	import { 
		createGrid,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams
	} from "ag-grid-community"
	import { onMount } from 'svelte'

	let gridContainer;	

	const gridOptions: GridOptions = {
		defaultColDef: {
     	   sortable: true,
		   editable: true
    	},
		
		columnDefs : [
			{ field: "id", headerName: "ID"},
			{ field: "title", headerName: "Název"},
			{ field: "description", headerName: "Popis"},
			{ field: "category", headerName: "Kategorie"},
			{ field: "price", headerName: "Cena"},
			{ field: "discountPercentage", headerName: "Výše slevy"}
		],

		rowModelType: 'serverSide',
		 onCellValueChanged: (event) => {
			console.log(`New Cell Value: ${JSON.stringify(event.data)}`)
		},
		//maxBlocksInCache: 2,
		debug: true,
	}

	let grid: GridApi<unknown>;

		/* 
		
		update: [
			{
			description: "newValue";
			}
		]
		
		
		*/


	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {
			console.log(JSON.stringify(params.request, null, 1));
			let url = 'https://dummyjson.com/products?'

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
		grid = createGrid(gridContainer, gridOptions)
		grid.setGridOption('serverSideDatasource', datasource);
	})

</script>

<svelte:head>
	<title>Albiline | Hodinovka</title>
</svelte:head>

<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class="ag-theme-custom"
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>


<style>
	:global(.ag-theme-quartz) {
		--ag-odd-row-background-color: #fafafa;
	}
</style>

