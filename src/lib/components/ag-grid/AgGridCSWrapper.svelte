<script lang="ts">
	import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale";
	import 'ag-grid-community/styles/ag-grid.css'
	import '$lib/ag-grid-theme-builder.pcss'
	import { onMount } from 'svelte';
	import { get, type Writable, writable } from 'svelte/store';
	import {
		type CellValueChangedEvent,
		createGrid,
		type GridApi,
		type GridOptions, type IRowNode
	} from 'ag-grid-enterprise';
	import { onNavigate } from '$app/navigation';
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';

	export let rowData: Writable<any[]>;
	export let editedRowData: Writable<any[]>;
	export let createdRowData: Writable<any[]>;
	export let requiredFields: string[]
	export let gridOptionsCustom: GridOptions;


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

		onCellValueChanged(event: CellValueChangedEvent<any>) {
			console.log(event.data);
			let isInitialColumn = requiredFields.every((field) => {
				return event.data[field] !== undefined;
			})

			if (event.oldValue !== event.newValue) {
				if (isInitialColumn) {
					addToEditedTableData(
						event,
						requiredFields,
						editedRowData,
					)
				} else {
					addToEditedTableData(
						event,
						requiredFields,
						createdRowData,
					)
				}
			}
		},

		domLayout: "autoHeight",
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		suppressRowClickSelection: true,
		ensureDomOrder: true,
		rowSelection: "single",
	}


	createdRowData.subscribe((data) => {
		if (data.length > 0) {
			gridApi.applyTransaction({
				add: [data[data.length - 1]],
				addIndex: 0,
			})
		}
	})


	onMount(() => {
		gridApi = createGrid(gridContainer, { ...gridOptions, ...gridOptionsCustom });

		rowData.subscribe((data) => {
			if (data) {
				gridApi.setGridOption("rowData", data);
			}
		})
	})
</script>



<div
	class="flex flex-column"
>
	<div
		id="datagrid"
		class="ag-theme-custom "
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>
