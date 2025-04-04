<script lang="ts">
	import { themeAlbiBlueParams } from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import { addToEditedTableData } from "$lib/utils/addToEditedTableData";
	import {
		type CellValueChangedEvent,
		createGrid,
		type GridApi,
		type GridOptions, themeQuartz
	} from 'ag-grid-enterprise';
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {getLocale} from "$lib/paraglide/runtime";
	import type {ColDef} from "ag-grid-community";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import type {AgGridSSTableType} from "$lib/types/components/table/table";

	interface Props {
		rowData: any[];
		returnWholeRowOnEdit?: boolean;
		editedRowData?:	any[];
		createdRowData?: any[];
		requiredFields?: string[];
		totalRow?: boolean;
		hiddenHeader?: boolean;
		fullHeight?: boolean;
		headerTranslations: Record<string, () => string>;
		gridOptionsCustom: GridOptions;
	}

	let {
		rowData,
		returnWholeRowOnEdit,
		editedRowData = $bindable(),
		createdRowData = $bindable(),
		requiredFields,
		totalRow,
		fullHeight,
		hiddenHeader,
		headerTranslations,
		gridOptionsCustom
	}: Props = $props();


	let pageKey: string = currentPageKey.value;
	let table: AgGridSSTableType = $state(agGridTables.value[pageKey]);

	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let themeParams = $state(themeAlbiBlueParams);


	if (hiddenHeader) {
		themeParams.headerHeight = 0;
	}

	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: getAgGridLocale(),

		groupTotalRow: totalRow === true ? "bottom" : undefined,
		grandTotalRow: totalRow === true ? "bottom" : undefined,

		rowSelection: undefined,

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

		getMainMenuItems: (event) => {
			return [
				'pinSubMenu',
				'separator',
				'valueAggSubMenu',
				'autoSizeThis',
				'columnChooser',
				'resetColumns',
				'separator',
				'sortUnSort',
				'separator',
				{
					name: "IT",
					icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-code-xml\"><path d=\"m18 16 4-4-4-4\"/><path d=\"m6 8-4 4 4 4\"/><path d=\"m14.5 4-5 16\"/></svg>",
					subMenu: [
						{
							name: "field: " + event.column.getColId(),
							action: () => {
								navigator.clipboard.writeText(event.column.getColId())
							},
						}
					]
				}
			];
		},

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
						let match = false;

						editedRowData.forEach((row) => {
							requiredFields.forEach((field) => {
								if (row[field] === event.data[field]) {
									match = true;
								}
							})
						})

						if (!match) {
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



	$effect(() => {
		if (getLocale()) {
			if (Object.keys(headerTranslations).length > 0) {
				let colDefs = gridApi.getColumnDefs();

				// const colDefs =
				colDefs?.forEach((column: ColDef) => {
					if (headerTranslations[column.field]) {
						column.headerName = headerTranslations[column.field]();
					}

					if (column.children) {
						column.children.forEach((child: ColDef) => {
							if (headerTranslations[child.field]) {
								child.headerName = headerTranslations[child.field]();
							}
						})
					}
				})

				// update grid with updated column defs
				gridApi.setGridOption("columnDefs", colDefs);
			}
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
		max-height: 32px;
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


	:global(.ag-row-footer) {
		background-color: #fff7ed;
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

	:global(.ag-tool-panel-horizontal-resize) {
		@apply bg-slate-300 !important;
	}

	:global(.ag-checkbox) {
		margin-left: 4px;
		overflow: visible !important;
		outline: none !important;
		box-shadow: none !important;
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
