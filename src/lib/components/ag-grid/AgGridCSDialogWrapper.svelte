<script lang="ts">
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'
	import { onMount } from "svelte";
	import {
		createGrid,
		type GridApi,
		type GridOptions,
	} from "ag-grid-enterprise";
	import { writable } from 'svelte/store';

	export let colDef: any[];
	export let rowData = writable([]);

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;

	rowData.subscribe((data) => {
		if (data) {
			if (data.length > 0) {
				gridApi.setGridOption("rowData", data);
			}
		}
	})

	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 60,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			suppressHeaderMenuButton: true
		},

		rowData: [],
		columnDefs: colDef,

		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
		rowSelection: "multiple",
	}

	onMount(() => {
		gridApi = createGrid(gridContainer, gridOptions);
	})
</script>



<div class="h-full">
	<div class="flex flex-column h-full">
		<div
			id="datagrid"
			class="ag-theme-custom"
			style="flex: 1 1 auto"
			bind:this={gridContainer}
		></div>
	</div>
</div>
