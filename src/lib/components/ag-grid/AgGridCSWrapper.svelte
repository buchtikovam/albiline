<script lang="ts">
	import { themeAlbiBlueParams } from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import { pageCompact } from "$lib/runes/page.svelte";
	import { addToEditedTableData } from "$lib/utils/addToEditedTableData";
	import {
		type CellValueChangedEvent,
		createGrid,
		type GridApi,
		type GridOptions, themeQuartz
	} from 'ag-grid-enterprise';
	import {AG_GRID_LOCALE_CZ} from "@ag-grid-community/locale";

	interface Props {
		rowData: any[];
		editedRowData?:	any[];
		createdRowData?: any[];
		requiredFields?: string[];
		hiddenHeader?: boolean;
		fullHeight?: boolean;
		gridOptionsCustom: GridOptions;
	}

	let {
		rowData,
		editedRowData = $bindable(),
		createdRowData = $bindable(),
		requiredFields,
		fullHeight,
		hiddenHeader,
		gridOptionsCustom
	}: Props = $props();


	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let themeParams = $state(themeAlbiBlueParams);


	if (hiddenHeader) {
		themeParams.headerHeight = 0;
	}

	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: editedRowData !== undefined,
			minWidth: 50,
			maxWidth: 400,
			hide: false,
			filter: false,
			suppressHeaderMenuButton: true,
		},

		rowData: [],

		// function to update editedRowData store,
		// if record already exists, is added to editedRowData
		// if record was created during runtime, has not been saved and is being edited, gets added to createdRowData
		// checks created x edited by unique field, that only existing records have
		onCellValueChanged(event: CellValueChangedEvent<any>) {
			if (requiredFields) {
				let isInitialColumn = requiredFields.every((field) => {
					return event.data[field] !== null;
				})

				if (event.oldValue !== event.newValue) {
					if (editedRowData && createdRowData) {
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
				}
			}
		},

		domLayout: fullHeight ? "normal" : "autoHeight",
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
	}


	let createdRowAmount: number = $state(0);

	$effect(() => {
		if (createdRowData) {
			if (createdRowData.length > 0 && createdRowAmount < createdRowData.length) {
				createdRowAmount++;

				gridApi.applyTransaction({
					add: [createdRowData[createdRowData.length - 1]],
					addIndex: 0,
				})
			}
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
	class="flex flex-column h-full"
>
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>



<style>
	:global(.ag-header-cell-text) {
		overflow: hidden;
		word-break: keep-all !important;
		white-space: preserve-breaks;
		text-overflow: ellipsis;
	}

	:global(.ag-header-icon) {
		min-width: 20px !important;
	}

	:global(.ag-sort-indicator-icon) {
		min-width: 22px !important;
		margin-left: -6px !important;
	}

	/*:global(.ag-input-field-input) {*/
	/*	height: 32px;*/
	/*}*/

	/*:global(.ag-picker-field-wrapper) {*/
	/*	height: 32px;*/
	/*}*/
</style>
