<script lang="ts">
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {
		type BodyScrollEvent,
		type ColumnMovedEvent,
		type ColumnPinnedEvent, type ColumnResizedEvent,
		type ColumnVisibleEvent,
		createGrid,
		type FilterChangedEvent,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type RowDataUpdatedEvent,
		type SelectionChangedEvent, type ShouldRowBeSkippedParams,
		type SortChangedEvent,
		themeQuartz
	} from 'ag-grid-enterprise';
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {getLocale} from "$lib/paraglide/runtime";
	import type {ColDef, ColGroupDef} from "ag-grid-community";
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {agGridTables} from "$lib/runes/table.svelte";
	import type {AgGridCSTableType, AgGridSSTableType, ColumnOrder} from "$lib/types/components/table/table";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {beforeNavigate} from "$app/navigation";
	import {onMount, tick} from "svelte";
	import {disablePageTabs} from "$lib/runes/navigation.svelte";
	import deepcopy from "deepcopy";
	import {authDetails} from "$lib/runes/page.svelte";
	import {cacheTableData, clearCache, getCacheAge, getCachedTableData} from "$lib/cacheManager";
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";

	interface Props {
		pageKey: string;
		requiredFields?: string[];
		rowNumberIdentificationKey: string,
		headerTranslations: Record<string, () => string>;
		gridOptionsCustom: GridOptions;
	}

	let {
		pageKey,
		requiredFields,
		rowNumberIdentificationKey,
		headerTranslations,
		gridOptionsCustom
	}: Props = $props();


	let table: AgGridCSTableType = $state(agGridTables.value[pageKey]);
	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let themeParams = $state(themeAlbiBlueParams);
	let recentFilters: FilterModel[] = $state([]);
	let isEditing = false;


	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: getAgGridLocale(),

		sideBar: {
			toolPanels: ["columns", "filters"],
		},

		rowSelection:{
			mode: "singleRow",
			enableClickSelection: true,
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

		onCellEditingStarted: () => {
			isEditing = true;
		},

		onCellEditingStopped: () => {
			isEditing = false;
		},

		onFilterChanged(event: FilterChangedEvent<any>) {
			const currentFilter = event.api.getFilterModel();
			table.filtersToSave = currentFilter;
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};

			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}
		},

		onColumnMoved(event: ColumnMovedEvent<any>) {
			table.presetToSave = event.api.getColumnState() || [];
		},

		onColumnVisible(event: ColumnVisibleEvent<any>) {
			table.presetToSave = event.api.getColumnState() || [];
		},

		onColumnPinned(event: ColumnPinnedEvent<any>) {
			table.presetToSave = event.api.getColumnState() || [];
		},

		onColumnResized(event: ColumnResizedEvent<any>) {
			table.presetToSave = event.api.getColumnState();
		},

		onSortChanged(event: SortChangedEvent<any>) {
			table.presetToSave = event.api.getColumnState() || [];
		},

		getRowId: (params: GetRowIdParams) => {
			return String(params.data[rowNumberIdentificationKey]);
		},

		onBodyScroll(event: BodyScrollEvent<any>) {
			if (event.top > -1) {
				table.lastVisibleRowIndex = event.api.getFirstDisplayedRowIndex();
			}
		},

		onRowDataUpdated(event: RowDataUpdatedEvent<any>) {
			setTimeout(() => {
				table.lastVisibleRowIndex < 10
					? event.api.ensureIndexVisible(table.lastVisibleRowIndex, "top")
					: event.api.ensureIndexVisible(table.lastVisibleRowIndex + 10, "top");
			}, 300)

			if (table.selectedRows.length > 0) {
				table.selectedRows.forEach((row) => {
					let node = gridApi.getRowNode(String(row[rowNumberIdentificationKey]));
					node?.setSelected(true)
				});
			}
		},

		onSelectionChanged(event: SelectionChangedEvent<any>) {
			table.selectedRows = event.api.getSelectedRows();
		},


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

		getContextMenuItems: () => {
			return [
				'copy',
				'copyWithHeaders',
				'cut',
				'paste',
			];
		},

		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
	}


	// initiate grid
	onMount(() => {
		disablePageTabs.value = true;

		const finalGridOptions =  {...gridOptions, ...gridOptionsCustom};

		gridApi = createGrid(gridContainer, finalGridOptions);
		gridApi.setFilterModel(table.filtersToSave);

		table.defaultColState = gridApi.getColumnState();

		gridApi.setGridOption(
			"columnDefs",
			getColumnHeaderTranslations(
				headerTranslations,
				gridApi.getColumnDefs() || []
			)
		);


		if (table.presetToSave.length > 0) {
			gridApi.applyColumnState({
				state: table.presetToSave,
				applyOrder: true,
			})
		}

		return(() => {
			table.activeSelectedRowIndex = 0;
			table.createdTableData = [];
			table.deletedTableData = [];
		})
	})


	let lastInputParams = $state(table.loadedInputParams);
	$inspect(lastInputParams)

	$effect(() => {
		if (Object.keys(table.loadedInputParams).length > 0) {
			if (JSON.stringify(table.loadedInputParams) !== JSON.stringify(lastInputParams)) {
				clearCache(pageKey);
				getData();
			} else {
				getData();
			}
		} else {
			clearCache(pageKey);
			getData();
		}


		lastInputParams = table.loadedInputParams;
	})


	async function getData() {
		try {
			const cached = await getCachedTableData(pageKey);

			if (cached) {
				gridApi.setGridOption("rowData", cached);
			} else {
				await fetchAndCache();
			}
		} catch (e) {
			console.log("Get data error: ", e instanceof Error ? e.message : "");
		}
	}


	async function fetchAndCache() {
		try {
			gridApi.setGridOption("loading", true)
			const response = await apiServicePostHandled('pageData', table.loadedInputParams);
			const data = await response.data;

			gridApi.setGridOption("loading", false);
			gridApi.setGridOption("rowData", data.items);

			await cacheTableData(pageKey, data.items);
		} catch (e) {
			console.log("Fetch and cache error: ", e instanceof Error ? e.message : "");
		}
	}



	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	$effect(() => {
		if (table.setColStateToDefault) {
			gridApi.applyColumnState({
				state: table.defaultColState,
				applyOrder: true,
			});

			table.setColStateToDefault = false;
		}
	})


	$effect(() => {
		if (table.selectedPreset) {
			gridApi.applyColumnState({
				state: table.selectedPreset.pagePresetValue,
				applyOrder: true
			});

			table.selectedPresetFull = table.selectedPreset;
			table.selectedPreset = undefined;
		}
	})




	$effect(() => {
		if (table.fulltextFilterValue.length > 1) {
			gridApi.setGridOption("quickFilterText", table.fulltextFilterValue);
		} else {
			gridApi.setGridOption("quickFilterText", "");
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


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.NEW) {
			// const rowToAdd = {};
			//
			// rowToAdd[rowNumberIdentificationKey] = table.createdTableData.length * -1;
			//
			// table.createdTableData.push(rowToAdd);
			//
			// gridApi.applyTransaction({
			// 	addIndex: 0,
			// 	add: [rowToAdd]
			// })

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.DELETE) {
			const rowsToDelete = gridApi.getSelectedRows();
			const rowsToDeleteStripped: any[] = []

			console.log(rowsToDelete)

			rowsToDelete.map((row) => {
				const strippedRow = {};

				if (requiredFields) {
					requiredFields.forEach((field) => {
						strippedRow[field] = row[field];
					})
				} else {
					strippedRow[rowNumberIdentificationKey] = row[rowNumberIdentificationKey];
				}

				rowsToDeleteStripped.push(strippedRow)
			})

			table.deletedTableData.push(...rowsToDeleteStripped);

			gridApi.applyTransaction({
				remove: rowsToDelete,
			})

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			table.areInputParamsLoading = true;
			console.log("load", pageKey)
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.EXPORT_EXCEL_HEADERS) {
			const allColumns = gridApi.getAllDisplayedColumns();

			// Exclude the first column
			let columnKeys = allColumns?.map(col => col.getColId());
			columnKeys.splice(0,1);

			gridApi.exportDataAsExcel({
				columnKeys: columnKeys,
				skipColumnGroupHeaders: false,
				skipColumnHeaders: false,
				onlySelected: false,
				shouldRowBeSkipped(): boolean {
					return true;
				},
				author: authDetails.userName || "AG Grid",
			});

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.EXPORT_EXCEL_DATA) {
			const allColumns = gridApi.getAllDisplayedColumns();

			// Exclude the first column
			let columnKeys = allColumns?.map(col => col.getColId());
			columnKeys.splice(0,1);

			gridApi.exportDataAsExcel({
				columnKeys: columnKeys,
				skipColumnGroupHeaders: false,
				skipColumnHeaders: false,
				author: authDetails.userName || "AG Grid",
				exportedRows: "all", // determines if export has un/sorted and un/filtered rows
				freezeRows: "headers", // sticky header row
				onlySelected: false,
			});

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.FILTER_QUICK) {
			const column = gridApi.getFocusedCell();
			const selection = window.getSelection()?.toString().trim();

			if (column && selection) {
				const cellType = column.column.getColDef().cellDataType;
				let currentFilters = gridApi.getFilterModel();
				let filterModelType;

				if (cellType === "text") filterModelType = "contains";

				if (cellType === "number" || cellType === "date") filterModelType = "equals";

				currentFilters[column.column.getColId()] = {
					filterType: "multi",
					filterModels: [{
						filterType: cellType,
						type: filterModelType,
						filter: selection
					}, null]
				}

				gridApi.setFilterModel(currentFilters);
				gridApi.onFilterChanged();
			}

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.FILTER_UNDO) {
			recentFilters.pop();

			recentFilters[recentFilters.length - 1]
				? gridApi.setFilterModel(recentFilters[recentFilters.length - 1])
				: gridApi.setFilterModel(null);

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.FILTER_REMOVE) {
			gridApi.setFilterModel(null);
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.MY_FILTERS) {
			openedRibbonDialog.value = "ribbon-my-filters";
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.SAVE_FILTERS) {
			openedRibbonDialog.value = "ribbon-save-filters"
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.SAVE_PRESET) {
			openedRibbonDialog.value = "ribbon-save-preset"
			table.presetToSave = gridApi.getColumnState() || [];
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.MY_PRESETS) {
			openedRibbonDialog.value = "ribbon-my-presets";
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
		@apply bg-slate-300;
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
