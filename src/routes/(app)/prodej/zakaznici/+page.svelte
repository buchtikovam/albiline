<script lang="ts">
	import { createGrid, type GridApi, type GridOptions } from 'ag-grid-community'
	import { onMount } from 'svelte'
	import type { TableType } from '$lib/types/table/table';
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-material.css'

	export let data: TableType;

	console.log(data.items);

	let grid: GridApi<unknown>;

	const gridOptions: GridOptions = {
		defaultColDef: {
			sortable: true,
			filter: true, 
			flex: 1,
			resizable: true,
			editable: true
		},
		columnDefs : [
			{ field: "rowNumber", headerName: "Řádek" },
			{ field: "customerAddressCode", headerName: "Id zákazníka" },
			{ field: "customerNodeCode", headerName: "Řetězec" },
			{ field: "addressType", headerName: "Aktivní" },
			{ field: "name", headerName: "Jméno" },
			{ field: "street", headerName: "Ulice" },
			{ field: "city", headerName: "Město" },
		],
		rowData: data.items
	}

	onMount(() => {
		const gridEl = document.getElementById("mainGrid")
		if (!gridEl) {
			throw new Error("Grid element not found.")
		}
		grid = createGrid(gridEl, gridOptions)
	})
</script>

<svelte:head>
	<title>Zákazníci</title>
</svelte:head>


<!-- <div class="bg-red-100 h-full"> -->
	<div id="mainGrid" class="ag-theme-material h-full"></div>
<!-- </div> -->