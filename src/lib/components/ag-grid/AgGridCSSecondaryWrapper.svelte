<script lang="ts">
	import {agGridTables, currentPageKey, tableViewSettings} from "$lib/runes/table.svelte";
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte";
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
	import {addToEditedTableData} from "$lib/utils/addToEditedTableData";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import type {AgGridSSTableType} from "$lib/types/components/table/table";
	import {
		type CellFocusedEvent,
		type CellValueChangedEvent,
		createGrid,
		type GridApi,
		type GridOptions, themeQuartz
	} from 'ag-grid-enterprise';

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
	let themeParams = $derived(themeAlbiBlueParams);
	let isEditing = false;


	if (hiddenHeader) themeParams.headerHeight = 0;


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

		onCellEditingStarted: () => {
			isEditing = true;
		},

		onCellEditingStopped: () => {
			isEditing = false;
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

		gridApi.setGridOption(
			"columnDefs",
			getColumnHeaderTranslations(
				headerTranslations,
				gridApi.getColumnDefs() || []
			)
		);
	})


	$effect(() => {
		if (rowData) {
			gridApi.setGridOption("rowData", rowData);
		}
	})


	$effect(() => {
		if (gridContainer && gridApi) {
			const handleClickOutside = (event: MouseEvent) => {
				if (!gridContainer.contains(event.target as Node) && isEditing) {
					gridApi.stopEditing(true);
				}
			};

			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>



<div
	class="flex flex-column h-full"
>
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		style:--ag-spacing={tableViewSettings.value?.spacing + 'px'}
		style:--ag-header-height={hiddenHeader ? 0 : tableViewSettings.value?.headerHeight + 'px'}
		style:--ag-header-font-size={tableViewSettings.value?.headerFontSize + 'px'}
		style:--ag-font-size={tableViewSettings.value?.fontSize + 'px'}
		style:--ag-icon-size={tableViewSettings.value?.iconSize + 'px'}
		bind:this={gridContainer}
	></div>
</div>




<style>
	/* HEADER */
	:global(.ag-header-cell-text) {
		display: -webkit-box !important;
		-webkit-line-clamp: 2 !important; /* Limit to 2 lines */
		line-clamp: 2 !important;
		-webkit-box-orient: vertical !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		word-break: normal !important; /* Break words if needed */
		white-space: normal !important;
		line-height: 12px !important;
		max-height: 24px !important; /* 2 * line-height */
	}

	:global(.ag-header-icon) {
		min-width: 14px !important;
	}

	:global(.ag-header-icon):hover {
		background-color: #eceef1 !important;
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-sort-indicator-icon) {
		min-width: 18px !important;
		margin-left: -8px !important;
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
