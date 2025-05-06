<script lang="ts">
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte";
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
	import {agGridTables, tableViewSettings} from "$lib/runes/table.svelte";
	import type {AgGridTableType, ColumnOrder} from "$lib/types/components/table/table";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {beforeNavigate} from "$app/navigation";
	import {onMount, tick} from "svelte";
	import {disablePageTabs} from "$lib/runes/navigation.svelte";
	import deepcopy from "deepcopy";
	import {authDetails, responseDialogMessages} from "$lib/runes/page.svelte";
	import {cacheTableData, clearCache, getCacheAge, getCachedTableData} from "$lib/cacheManager";
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";

	interface Props {
		pageKey: string;
		headerTranslations: Record<string, () => string>;
		gridOptionsCustom: GridOptions;
	}

	let {
		pageKey,
		headerTranslations,
		gridOptionsCustom
	}: Props = $props();


	let table: AgGridTableType = $state(agGridTables.value[pageKey]);
	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let themeParams = $state(themeAlbiBlueParams);
	let recentFilters: FilterModel[] = $state([]);
	let isEditing = false;
	let excelFileInput: HTMLInputElement;
	let isInitial = $state(true);
	let previousVisibleColumns: string[] = $state([]);

	function arraysEqual(a: string[], b: string[]): boolean {
		if (a === b) return true;
		if (a?.length !== b?.length) return false;
		return a.every((val, index) => val === b[index]);
	}

	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: getAgGridLocale(),
		loadThemeGoogleFonts: false,

		sideBar: {
			toolPanels: ["columns", "filters"],
		},

		statusBar: {
			statusPanels: [
				{
					statusPanel: 'agTotalAndFilteredRowCountComponent',
					align: 'left',
				},
				{
					statusPanel: 'agSelectedRowCountComponent',
					align: 'left',
				},
			]
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
			// Get current visible columns
			const currentVisibleColumns = event.api.getColumnState()
				.filter(colState => !colState.hide && !colState.colId.includes("ag-Grid"))
				.map(colState => colState.colId);

			// Skip if visibility hasn't changed
			if (arraysEqual(currentVisibleColumns, previousVisibleColumns)) {
				return;
			}

			// Update visibility tracking
			previousVisibleColumns = currentVisibleColumns;

			table.showRefreshDataButton = false;

			if (!isInitial) {
				// Save column state
				table.presetToSave = event.api.getColumnState() || [];

				// Get all visible columns (excluding ag-Grid internal columns)
				const visibleColumnsFields = event.api.getColumnState()
					.filter(colState => !colState.hide && !colState.colId.includes("ag-Grid"))
					.map(colState => colState.colId);

				// Exit early if no visible columns
				if (visibleColumnsFields.length === 0) {
					table.showRefreshDataButton = false;
					return;
				}

				// Determine maximum rows to check (capped at 1000)
				const iterationMax = Math.min(table.latestRowCount ?? 1000, 1000);
				const columnsWithData = new Set<string>();
				const pendingColumns = new Set(visibleColumnsFields);
				let processedNodes = 0;

				// Check each node up to iterationMax or until all columns have data
				event.api.forEachNode((node) => {
					if (processedNodes >= iterationMax || pendingColumns.size === 0) return;

					// Check remaining pending columns against this node's data
					Array.from(pendingColumns).forEach(colId => {
						if (node.data?.[colId] != null) { // Using optional chaining
							columnsWithData.add(colId);
							pendingColumns.delete(colId);
						}
					});

					processedNodes++;
				});


				// Get column definitions for header names
				const columnDefs = event.api.getColumnDefs() || [];

				// Helper to find column def recursively
				const findColumnDef = (targetColId: string, defs: any[]): any => {
					for (const def of defs) {
						if (def.colId === targetColId) return def;
						if (def.children) {
							const childDef = findColumnDef(targetColId, def.children);
							if (childDef) return childDef;
						}
					}
					return null;
				};

				// Convert empty column IDs to header names with group handling
				const emptyColumns = visibleColumnsFields
					.filter(colId => !columnsWithData.has(colId))
					.flatMap(colId => {
						const colDef = findColumnDef(colId, columnDefs);
						if (!colDef) return [colId]; // Fallback to ID if not found

						// Handle group columns
						if (colDef.children) {
							return colDef.children
								.filter(childDef => !columnsWithData.has(childDef.colId))
								.map(childDef => childDef.headerName || childDef.colId);
						}

						return [colDef.headerName || colId];
					});

				// Update UI and log results
				if (emptyColumns.length > 0) {
					// responseDialogMessages.value = [{
					// 	type: "InfoToast",
					// 	title: "Informace",
					// 	content: "Sloupce <b>(" + emptyColumns.join(", ") + ")</b> nemají načtená data. Doporučujeme je přenačíst."
					// }]
					table.showRefreshDataButton = true;
				} else {
					// console.log('Columns without data:', emptyColumns);
					table.showRefreshDataButton = false;
				}
			} else {
				table.showRefreshDataButton = false;
			}
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
			return String(params.data[table.identificationKey]);
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
					let node = gridApi.getRowNode(String(row[table.identificationKey]));
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
			});
		}

		// Initialize visibility tracking after column setup
		previousVisibleColumns = gridApi.getColumnState()
			.filter(colState => !colState.hide && !colState.colId.includes("ag-Grid"))
			.map(colState => colState.colId);

		isInitial = false;

		return(() => {
			table.activeSelectedRowIndex = 0;
			table.createdTableData = [];
			table.deletedTableData = [];
		});
	});


	// let lastInputParams = deepcopy(table.loadedInputParams);

	$effect(() => {
		// if (Object.keys(table.loadedInputParams).length > 0) {
			if (table.areInputParamsLoading) {
				clearCache(pageKey);
				getData();
				// resetTable();
				table.areInputParamsLoading = false;
			} else {
				getData();
			}
		// }

		// lastInputParams = table.loadedInputParams;
	});

	// function resetTable() {
	// 	// reset filterModel
	// 	gridApi.setFilterModel(null);
	// 	gridApi.applyColumnState({
	// 		state: [],
	// 		applyOrder: true,
	// 	})
	// }



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
			const columnList: string[] = deepcopy(table.requiredFields);

			if (Object.keys(table.presetToSave).length > 0) {
				table.presetToSave.forEach(preset => {
					if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
						columnList.push(preset.colId)
					}
				})
			} else {
				table.defaultColState.forEach(preset => {
					if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
						columnList.push(preset.colId)
					}
				})
			}

			let requestObj = deepcopy(table.loadedInputParams);
			requestObj["columnList"] = columnList

			gridApi.setGridOption("loading", true)
			const response = await apiServicePostHandled('pageData', requestObj);
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
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			table.hasInputParams = false;
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


		if (ribbonAction.value === RibbonActionEnum.IMPORT) {
			excelFileInput.click();
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




<input
	type="file"
	accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	multiple={false}
	hidden
	bind:this={excelFileInput}
	onchange={(ev) => handleSSExcelUpload(ev, gridApi)}
/>


<div
	class="flex flex-column h-full"
>
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		style:--ag-spacing={tableViewSettings.value?.spacing + 'px'}
		style:--ag-header-height={tableViewSettings.value?.headerHeight + 'px'}
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
