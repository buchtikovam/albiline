<script lang="ts">
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
	import {
		type CellValueChangedEvent,
		createGrid,
		type GridApi,
		type GridOptions
	} from 'ag-grid-enterprise';

	export let colDef: any[];
	export let rowData = writable([]);
	export let editedRowData = []

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;

	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 50,
			maxWidth: 400,
			hide: false,
			filter: false,
			suppressHeaderMenuButton: true
		},

		rowData: [],
		columnDefs: colDef,

		onCellValueChanged(event: CellValueChangedEvent<any>) {
			if (event.oldValue !== event.newValue) {
				editedRowData.push(event.newValue)
			}
		},

		domLayout: "autoHeight",
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
				gridApi.setGridOption("rowData", data);
			}
		})
	})
</script>



<div
	class="flex flex-column h-full"
>
	<div
		id="datagrid"
		class="ag-theme-custom "
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>
