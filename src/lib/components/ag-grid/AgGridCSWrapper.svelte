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
	import { languageTag } from '$lib/paraglide/runtime';

	interface Props {
		rowData: any[];
		editedRowData:	any[];
		createdRowData: any[];
		requiredFields: string[];
		gridOptionsCustom: GridOptions;
	}

	let {
		rowData,
		editedRowData = $bindable(),
		createdRowData = $bindable(),
		requiredFields,
		gridOptionsCustom
	}: Props = $props();


	let gridContainer: HTMLElement = $state();
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

		// function to update editedRowData store,
		// if record already exists, is added to editedRowData
		// if record was created during runtime, has not been saved and is being edited, gets added to createdRowData
		// checks created x edited by unique field, that only existing records have
		onCellValueChanged(event: CellValueChangedEvent<any>) {
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
						["createdRowId"],
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


	let createdRowAmount: number = $state(0);

	$effect(() => {
		console.log("effect");
		if (createdRowData.length > 0 && createdRowAmount < createdRowData.length) {
			console.log("effect if");
			createdRowAmount++;

			gridApi.applyTransaction({
				add: [createdRowData[createdRowData.length - 1]],
				addIndex: 0,
			})
		}
	})


	$effect(() => {
		gridApi = createGrid(gridContainer, { ...gridOptions, ...gridOptionsCustom });
	})


	$effect(() => {
		if (rowData) {
			gridApi.setGridOption("rowData", rowData);
		}
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
