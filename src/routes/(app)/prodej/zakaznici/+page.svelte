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


	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,
		cacheBlockSize: 100,
		maintainColumnOrder: true,
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
			console.log(`New Cell Value: ${JSON.stringify(event.data)}`)
		},
		rowModelType: 'serverSide',
		debug: true,
	}



	let grid: GridApi<unknown>;

		

	const datasource: IServerSideDatasource = {
		getRows(params: IServerSideGetRowsParams) {
			console.log(JSON.stringify(params.request, null, 1));
			let url = 'http://10.2.2.181/customers'

			console.log(grid.getQuickFilter());
			

			fetch(url, 
				{
					method: "post",
					body: JSON.stringify(params.request),
					headers: {"Content-Type": "application/json"}
				}
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {				
				params.success({ rowData: response.items })
			})
			.catch(error => {
				console.log(error);
                params.fail();
			});
		}
	};

	function onFilterTextBoxChanged() {
		grid!.setGridOption(
			"quickFilterText",
			(document.getElementById("filter-text-box") as HTMLInputElement).value,
		);
	}


	onMount(() => {
		const gridEl = document.getElementById("mainGrid")
		if (!gridEl) {
			throw new Error("Grid element not found.");
		}
		grid = createGrid(gridEl, gridOptions);
		grid.setGridOption('serverSideDatasource', datasource);

		

		if (typeof window !== "undefined") {
		// Attach external event handlers to window so they can be called from index.html
			(<any>window).onFilterTextBoxChanged = onFilterTextBoxChanged;
		}
	})
</script>



<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>



<div id="mainGrid" class="ag-theme-quartz h-full"></div>

<input
	type="text"
	id="filter-text-box"
	placeholder="Filter..."
	on:input={onFilterTextBoxChanged}
/>