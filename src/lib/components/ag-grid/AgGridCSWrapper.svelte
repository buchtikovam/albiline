<script lang="ts">
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {createGrid, type GridApi, type GridOptions, themeQuartz} from 'ag-grid-enterprise';
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {languageTag} from "$lib/paraglide/runtime";
	import type {ColDef} from "ag-grid-community";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {agGridTables} from "$lib/runes/table.svelte";
	import type {AgGridCSTableType} from "$lib/types/components/table/table";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {beforeNavigate, onNavigate} from "$app/navigation";

	interface Props {
		pageKey: string;
		requiredFields?: string[];
		headerTranslations: Record<string, () => string>;
		gridOptionsCustom: GridOptions;
	}

	let {
		pageKey,
		requiredFields,
		headerTranslations,
		gridOptionsCustom
	}: Props = $props();


	let table: AgGridCSTableType = $state(agGridTables.value[pageKey]);
	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let themeParams = $state(themeAlbiBlueParams);


	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: getAgGridLocale(),

		sideBar: {
			toolPanels: ["columns", "filters"],
		},

		rowSelection:{
			mode: "singleRow",
			// enableClickSelection: true,
			hideDisabledCheckboxes: true,
		},

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: false,
			minWidth: 50,
			maxWidth: 400,
			hide: false,
			filter: false,
			suppressHeaderMenuButton: true,
			enableRowGroup: true,
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

		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
	}


	let destroyed = $state(false);
	$inspect(destroyed);

	beforeNavigate(() => {
		destroyed = true;
		gridApi.destroy();

	})


	$effect(() => {
		gridApi = createGrid(gridContainer, { ...gridOptions, ...gridOptionsCustom });

		return(() => {
			gridApi.destroy();
		})
	})


	$effect(() => {
		if (table.hasInputParams) {
			getData()
		}
	})


	$effect(() => {
		table.areInputParamsLoading
			? gridApi.setGridOption("loading", true)
			: gridApi.setGridOption("loading", false);
	})


	async function getData() {
		if (table.type === "clientSide" && !destroyed) {
			table.areInputParamsLoading = true;
			const response = await apiServicePostHandled("pageData", table.loadedInputParams)
			const data = await response.data;
			table.areInputParamsLoading = false;
			gridApi.setGridOption("rowData", data.items)
		}

	}


	$effect(() => {
		if (languageTag()) {
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


	$effect(() => {

		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			table.hasInputParams = false;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
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
		margin-left: 4px;
		overflow: visible !important;
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-tool-panel-horizontal-resize) {
		background-color: var(--albi-500);
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
