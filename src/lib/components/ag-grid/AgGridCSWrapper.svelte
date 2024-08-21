<script lang="ts">
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'
	import { onMount } from "svelte";
	import { 
		createGrid, 
		type GridApi, 
		type GridOptions, 
	} from "ag-grid-enterprise";

	
	export let columnDefinitions: any[];
	export let data;


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
			filter: 'agMultiColumnFilter' 
		},	

		rowData: data,
		columnDefs: columnDefinitions,

		defaultExcelExportParams: {
			exportAsExcelTable: true, 
		},

		maintainColumnOrder: true, 
		enableCellTextSelection: true,
		ensureDomOrder: true,
		suppressRowClickSelection: true,
		rowSelection: "multiple",
	}


	onMount(() => {
		gridApi = createGrid(gridContainer, gridOptions);
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
