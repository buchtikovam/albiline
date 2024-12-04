<script lang="ts">
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import {
			createGrid,
			type GridApi,
			type GridOptions,
	} from "ag-grid-enterprise";
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'

	export let colDef: any[];
	export let rowData = writable([]);

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;


	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: false,
			minWidth: 50,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			suppressHeaderMenuButton: true
		},

		rowData: [],
		columnDefs: colDef,
		// domLayout: "autoHeight",
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		suppressRowClickSelection: true,
		ensureDomOrder: true,
		rowSelection: "single",
	}


	onMount(() => {
		gridApi = createGrid(gridContainer, gridOptions);

		rowData.subscribe((data) => {
			if (data) {
				if (data.length > 0 && gridApi) {
					gridApi.setGridOption("rowData", data);
				}
			}
		})
	})
</script>


<!--<div class="h-full">-->
	<div class="flex flex-column h-full">
		<div
			id="datagrid"
			class="ag-theme-custom "
			style="flex: 1 1 auto"
			bind:this={gridContainer}
		></div>
	</div>
<!--</div>-->

