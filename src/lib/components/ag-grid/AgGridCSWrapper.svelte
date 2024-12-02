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

	export let colDef: any[];
	export let rowData: Writable<any[]>;
	export let editedRowData: Writable<any[]> = writable([]);
	export let createdRowData;
	export let requiredFields: string[]

	let gridContainer: HTMLElement;
	let gridApi: GridApi<unknown>;
	let initialRowIds: string[] = []

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
				addToEditedTableData(
					event,
					requiredFields,
					editedRowData,
				)
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

				gridApi.forEachNode((node: IRowNode) => {
					if (node.id) {
						if (!initialRowIds.includes(node.id)) {
							initialRowIds.push(node.id)
						}
					}
				})
			}
		})

		gridApi.forEachNode((node: IRowNode) => {
			if (node.id) {
				if (!initialRowIds.includes(node.id)) {
					initialRowIds.push(node.id)
				}
				// initialRowIds.push(node.id)
			}
		})

		// console.log("initialRows", initialRowIds);

		createdRowData.subscribe((data) => {
			if (data.length > 0) {
				gridApi.applyTransaction({
					add: [data[data.length - 1]],
					addIndex: 0,
				})
			}
		})
	})

	onNavigate(() => {
		initialRowIds = [];
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
