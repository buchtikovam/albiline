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
		returnWholeRowOnEdit?: boolean;
		editedRowData?:	any[];
		createdRowData?: any[];
		requiredFields?: string[];
		hiddenHeader?: boolean;
		fullHeight?: boolean;
		gridOptionsCustom: GridOptions;
	}

	let {
		rowData,
		returnWholeRowOnEdit,
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

		// if returnWholeRowOnEdit, return whole row, then it gets updated on its own because of svelte state

		// if record already exists, is added to editedRowData
		// if record was created during runtime, has not been saved and is being edited, gets added to createdRowData

		// checks created x edited by unique field, that only existing records have
		onCellValueChanged(event: CellValueChangedEvent<any>) {
			if (requiredFields) {
				let isInitialColumn = requiredFields.every((field) => {
					return event.data[field] !== null;
				})

				if (event.oldValue !== event.newValue) {
					if (returnWholeRowOnEdit && editedRowData) {
						console.log(editedRowData);

						let match = false;

						editedRowData.forEach((row) => {
							requiredFields.forEach((field) => {
								if (row[field] === event.data[field]) {
									match = true;
								}
							})
						})

						if (!match) {
							console.log("no match")
							editedRowData.push(event.data)
						}
					}

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
	/* HEADER */


	:global(.ag-header-cell-text) {
		overflow: hidden;
		word-break: keep-all !important;
		-webkit-line-clamp: 2; /* number of lines to show */
		line-clamp: 2;
		white-space: preserve-breaks;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	:global(.ag-header-icon) {
		min-width: 20px !important;
	}

	:global(.ag-sort-indicator-icon) {
		min-width: 22px !important;
		margin-left: -6px !important;
	}

	:global(.ag-filter-apply-panel) {
		padding: 0 6px 6px 6px;
	}

	:global(.ag-filter-body-wrapper) {
		padding: 6px 6px 0 6px;
	}



	/* SIDEBAR FILTER PANEL */


	:global(.ag-filter-tool-panel) {
		height: 100% !important;
		display: flex !important;
		flex-direction: column !important;
	}

	:global(.ag-filter-toolpanel-search) {
		display: none;
	}

	:global(.ag-filter-toolpanel-group-instance-header-icon) {
		color: var(--albi-500);
	}

	:global(.ag-filter-list-panel) {
		height: 100% !important;
		padding: 4px 0;
		overflow: auto;
	}

	:global(.ag-filter-toolpanel-instance-body) {
		border-radius: 6px;
		border-width: 1px;
		margin: 4px 8px !important;
	}

	:global(.ag-filter-toolpanel-instance-filter) {
		width: 100%;
		margin-right: 40px;
	}


	/* SIDEBAR COLUMN PANEL */


	:global(.ag-column-panel-column-select) {
		padding-top: 4px;
	}

	:global(.ag-column-drop-vertical-empty-message) {
		border-radius: 6px;
	}


	/*INPUTY */



	/*:global(.ag-filter-select) {*/
	/*	margin-bottom: 6px;*/
	/*	padding-bottom: 0;*/
	/*}*/

	/*:global(.ag-input-wrapper) {*/
	/*	margin-bottom: 6px;*/
	/*	padding-bottom: 0;*/
	/*}*/

	:global(.ag-text-field-input):focus {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-picker-field-wrapper) {
		height: 26px;
	}

	:global(.ag-input-field-input) {
		height: 26px;
	}

	:global(.ag-number-field-input):focus {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-picker-field-wrapper):focus-within {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-checkbox) {
		overflow: visible !important;
	}


	/*	BUTTONS */


	:global(.ag-standard-button) {
		line-height: normal;
		margin: 0 !important;
		display: flex !important;
		justify-content: center;
		align-items: center !important;
		width: fit-content;
		padding: 0 6px;
		height: 26px;
		margin-left: 6px !important;
	}


	:global(.ag-center-cols-viewport) {
		min-height: 60px !important;
	}
</style>
