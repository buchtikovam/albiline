<script lang="ts">
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {
		type BodyScrollEvent,
		type ColumnMovedEvent,
		type ColumnPinnedEvent,
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

		onFilterChanged(event: FilterChangedEvent<any>) {
			const currentFilter = event.api.getFilterModel();
			table.filtersToSave = currentFilter;
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};

			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}
		},

		onColumnMoved(event: ColumnMovedEvent<any>) {
			table.presetToSave = event.api.getColumnDefs() || [];
		},

		onColumnVisible(event: ColumnVisibleEvent<any>) {
			table.presetToSave = event.api.getColumnDefs() || [];
		},

		onColumnPinned(event: ColumnPinnedEvent<any>) {
			table.presetToSave = event.api.getColumnDefs() || [];
		},

		onSortChanged(event: SortChangedEvent<any>) {
			table.presetToSave = event.api.getColumnDefs() || [];
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

		if (finalGridOptions.columnDefs) {
			table.defaultColDef = finalGridOptions.columnDefs
		}

		// overwrite default coldef if user has unsaved preset
		if (table.presetToSave.length > 0) {
			finalGridOptions.columnDefs = table.presetToSave;
		}

		gridApi = createGrid(gridContainer, finalGridOptions);
		gridApi.setFilterModel(table.filtersToSave);


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
			// gridApi.setGridOption("loading", true)
			const cached = await getCachedTableData(pageKey);

			if (cached) {
				gridApi.setGridOption("rowData", cached);
				// gridApi.setGridOption("loading", false)
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



	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	$effect(() => {
		if (table.setColDefToDefault) {
			const columnOrder: ColumnOrder = [];
			const preset = deepcopy(table.defaultColDef);

			const processColumns = (cols: any[]) => {
				cols.forEach(col => {
					col.headerName = headerTranslations[col.field || ""]();
					columnOrder.push({ colId: col.field });
					if (col.children) processColumns(col.children);
				});
			};

			processColumns(preset);

			gridApi.setGridOption("columnDefs", preset);
			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});

			table.setColDefToDefault = false;
		}
	})


	$effect(() => {
		if (table.selectedPreset) {
			const preset = deepcopy(table.selectedPreset.pagePresetValue);
			const columnOrder: ColumnOrder = [];

			const processColumns = (cols: any[]) => {
				cols.forEach(col => {
					col.headerName = headerTranslations[col.field || ""]();
					columnOrder.push({ colId: col.field });
					if (col.children) processColumns(col.children);
				});
			};

			processColumns(preset);

			gridApi.setGridOption("columnDefs", preset);
			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});

			table.selectedPresetFull = {
				pagePresetId: table.selectedPreset.pagePresetId,
				pagePresetName: table.selectedPreset.pagePresetName,
				pagePresetValue: preset,
			};

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
			openedRibbonDialog.value = "ribbon-save-preset";
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
