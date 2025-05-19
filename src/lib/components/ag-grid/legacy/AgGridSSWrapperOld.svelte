<script lang="ts">
	import {currentPageKey, agGridTables, tableViewSettings} from '$lib/runes/table.svelte.js';
	import {authDetails} from '$lib/runes/page.svelte.js';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte.js";
	import {disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte.js';
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte.js";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte.js";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {debounceFn} from "$lib/utils/general/debounce.svelte.js";
	import {onMount} from 'svelte';
	import type {AgGridTableType, TableRowRequest} from '$lib/types/components/table/table';
	import {
		createGrid, themeQuartz,
		type ColumnMovedEvent,
		type ColumnPinnedEvent, type ColumnVisibleEvent,
		type FilterModel, type GetRowIdParams,
		type GridApi, type GridOptions,
		type IServerSideDatasource, type IServerSideGetRowsParams,
		type SelectionChangedEvent, type SortChangedEvent, type RowSelectedEvent
	} from 'ag-grid-enterprise';
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
	import {
		ServerSideTotalRowsStatusBarComponent
	} from "$lib/utils/components/ag-grid/status-bar/serverSideTotalRowsStatusBarComponent.svelte.js";

	interface Props {
		url: string;
		gridOptionsCustom: GridOptions;
		headerTranslations: Record<string, () => string>
	}

	let {
		url,
		gridOptionsCustom,
		headerTranslations
	}: Props = $props();


	// page settings
	let pageKey: string = currentPageKey.value;
	let table: AgGridTableType = $state(agGridTables.value[pageKey]);
	let isEditing = false;


	// create grid
	let gridContainer: HTMLElement|undefined = $state(undefined);
	let gridApi: GridApi<unknown>;
	let excelFileInput: HTMLInputElement;
	let rowBufferSize = 100;
	let isInitial = $state(true);
	let themeParams = $state(themeAlbiBlueParams);

	// grid configuration
	const gridOptions: GridOptions = {
		theme: themeQuartz.withParams(themeParams),
		localeText: getAgGridLocale(),
		rowModelType: "serverSide",
		maintainColumnOrder: true,
		serverSideInitialRowCount: table.latestRowCount,
		enterNavigatesVerticallyAfterEdit: true,
		undoRedoCellEditing: true,
		cacheBlockSize: 1000,
		maxBlocksInCache: 20,
		rowBuffer: rowBufferSize,
		blockLoadDebounceMillis: 600,
		loadThemeGoogleFonts: false,
		undoRedoCellEditingLimit: 20,
		enableCellTextSelection: true,
		tooltipShowDelay: 1000,

		sideBar: {
			toolPanels: ["columns", "filters"],
		},

		cellSelection: {
			handle: {
				mode: "fill",
				direction: "y",
			},
		},

		rowSelection: {
			mode: 'multiRow',
			enableClickSelection: true,
			headerCheckbox: false,
			hideDisabledCheckboxes: true,
		},

		defaultColDef: {
			sortable: true,
			resizable: true,
			enableRowGroup: true,
			editable: true,
			minWidth: 60,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			autoHeaderHeight: true,
			wrapHeaderText: true,
			suppressHeaderMenuButton: true,
		},

		statusBar: {
			statusPanels: [
				{
					statusPanel: ServerSideTotalRowsStatusBarComponent,
					align: 'left',
				},
				{
					statusPanel: 'agSelectedRowCountComponent',
					align: 'left',
				},
			]
		},

		onCellEditingStarted: () => {
			isEditing = true;
		},

		onCellEditingStopped: () => {
			isEditing = false;
		},

		getMainMenuItems: (event) => {
			return [
				'pinSubMenu',
				'separator',
				'valueAggSubMenu', 'autoSizeThis', 'columnChooser', 'resetColumns',
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

		// onCellValueChanged: (event: CellValueChangedEvent<any>) => ccreateEventHandlers().onCellValueChanged()

		onSortChanged: (event: SortChangedEvent<any>) => {
			if (!isInitial) {
				gridApi.setServerSideSelectionState({
					selectAll: false,
					toggledNodes: []
				})
			}

			table.presetToSave = event.api.getColumnState() || [];
		},

		onColumnMoved(event: ColumnMovedEvent<any>) {
			table.presetToSave = event.api.getColumnState() || [];
		},

		onColumnVisible(event: ColumnVisibleEvent<any>) {
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

				// Convert empty column IDs to header names
				const emptyColumns = visibleColumnsFields
					.filter(colId => !columnsWithData.has(colId))
					.map(colId => {
						const colDef = columnDefs.find(def => def?.colId === colId);
						// Use headerName if exists, fallback to colId
						return colDef?.headerName || colId;
					});



				// Update UI and log results
				if (emptyColumns.length > 0) {
					// responseDialogMessages.value = [{
					// 	type: "InfoToast",
					// 	title: "Informace",
					// 	content: "Sloupce <b>(" + emptyColumns.join(", ") + ")</b> nemají načtená data. Doporučujeme je přenačíst."
					// }]

					// console.log('Columns without data:', emptyColumns);
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

		onFilterChanged: () =>  {
			if (!isInitial) {
				gridApi.setServerSideSelectionState({
					selectAll: false,
					toggledNodes: []
				})
			}
		},

		getRowId: (params: GetRowIdParams) => {
			return String(params.data[table.identificationKey]);
		},

		onRowSelected(event: RowSelectedEvent<any>) {
			if (gridApi) {
				table.selectionState = gridApi.getServerSideSelectionState() || {
					toggledNodes: [],
					selectAll: false
				};
			}

			// Update selectedRows persistence with null checks
			if (table.selectionState?.toggledNodes) {
				const rows: Record<string, unknown>[] = [];

				table.selectionState.toggledNodes.forEach((rowNumber) => {
					const row = gridApi.getDisplayedRowAtIndex(Number(rowNumber) - 1);

					if (row?.data) {
						const rowObj: Record<string, unknown> = {};
						table.requiredFields?.forEach((field) => {
							rowObj[field] = row.data?.[field] ?? null;
						});
						rows.push(rowObj);
					}
				});

				table.selectedRows = rows;
			}
		},

		onSelectionChanged: (event: SelectionChangedEvent) => {
			table.activeSelectedRowIndex = 0

			if (table.selectionState?.toggledNodes) {
				disablePageTabs.value = table.selectionState.toggledNodes.length < 1;

				const rowArr: Record<string, unknown>[] = [];

				table.selectionState.toggledNodes.forEach((rowNumber) => {
					const row = event.api.getDisplayedRowAtIndex(Number(rowNumber) - 1);

					// Add null checks for row and row.data
					if (row?.data) {
						const rowObj: Record<string, unknown> = {};
						table.requiredFields?.forEach((field) => {
							// Safe property access with optional chaining
							rowObj[field] = row.data?.[field] ?? null;
						});
						rowArr.push(rowObj);
					}
				});

				table.selectedRows = rowArr;
			}
		},
	}


	//  datasource configuration
	let recentFilters: FilterModel[] = $state([]);

	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = table.fulltextFilterValue;

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			table.filtersToSave = currentFilter;

			// console.log(JSON.stringify(updatedParamsRequest, null, 1))

			apiServicePostHandled(url, updatedParamsRequest)
				.then(httpResponse => httpResponse.data)
				.then(response => {
					// console.log(response)
					params.success({ rowData: response.items });
					table.latestRowCount = response.totalRows === -1 ? 0 : response.totalRows;

					if (response.items.length > 0) {
						gridApi.setRowCount(table.latestRowCount || 0);
					}

					if (isInitial) {
						disablePageTabs.value = false;

						const columnState = {
							state: table.sortState,
						}

						gridApi.applyColumnState(columnState);

						// setting scroll position
						if (table.lastVisibleRowIndex > rowBufferSize) {
							gridApi.ensureIndexVisible(table.lastVisibleRowIndex + rowBufferSize, "top");
						} else {
							if (table.selectionState) {
								if (table.selectionState.toggledNodes) {
									if (Number(table.selectionState.toggledNodes[0])) {
										gridApi.ensureIndexVisible(
											Number(table.selectionState.toggledNodes[0]) - 1 ,
											"top"
										);
									}
								}
							} else {
								gridApi.ensureIndexVisible(0, "top");

							}
						}

						// setting selectedRows
						setTimeout(() => {
							if (table.selectionState) {
								if (table.selectionState.toggledNodes) {
									disablePageTabs.value = table.selectionState.toggledNodes.length === 0;
									gridApi.setServerSideSelectionState(table.selectionState)
								}
							}
						}, 200)
					}

					isInitial = false;
				})
				.catch(error => {
					console.log(error);
					params.fail();
				});
		}
	};


	// runs when component is mounted only
	onMount(() => {
		disablePageTabs.value = true;
		const finalGridOptions = { ...gridOptions, ...gridOptionsCustom };

		// initialize grid
		if (gridContainer) gridApi = createGrid(gridContainer, finalGridOptions);
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

		return (() => {
			if (gridApi) {
				table.selectionState = gridApi.getServerSideSelectionState() || {
					toggledNodes: [],
					selectAll: false
				};
			}

			// Update selectedRows persistence with null checks
			if (table.selectionState?.toggledNodes) {
				const rows: Record<string, unknown>[] = [];

				table.selectionState.toggledNodes.forEach((rowNumber) => {
					const row = gridApi.getDisplayedRowAtIndex(Number(rowNumber) - 1);

					if (row?.data) {
						const rowObj: Record<string, unknown> = {};
						table.requiredFields?.forEach((field) => {
							rowObj[field] = row.data?.[field] ?? null;
						});
						rows.push(rowObj);
					}
				});

				table.selectedRows = rows;
			}

			table.filtersToSave = gridApi.getFilterModel();
			table.lastVisibleRowIndex = gridApi.getFirstDisplayedRowIndex();
			table.presetToSave = gridApi.getColumnState() || [];
			table.activeSelectedRowIndex = 0;
			disableNavigation.value = false;


			setTimeout(() => {
				gridApi.destroy();
			}, 100)
		})
	})


	// used for waiting for API to cache data based on new input params
	$effect(() => {
		if (table.areInputParamsLoading) {
			gridApi.setGridOption("loading", true); // todo
		} else {
			gridApi.setGridOption("loading", false)
		}
	})


	// register datasource if user has added input params
	$effect(() => {
		if (Object.keys(table.loadedInputParams).length > 0 ) {
			gridApi.ensureIndexVisible(0, "top");
			resetTable();
		}
	})


	function resetTable() {
		// reset filterModel
		gridApi.setFilterModel(null);
		gridApi.setGridOption('serverSideDatasource', datasource);
		gridApi.setServerSideSelectionState({ toggledNodes: [], selectAll: false })
		gridApi.applyColumnState({
			state: [],
			applyOrder: true,
		})
	}


	// reset table to default column definitions
	$effect(() => {
		if (table.setColStateToDefault) {
			gridApi.applyColumnState({
				state: table.defaultColState,
				applyOrder: true,
			});

			table.setColStateToDefault = false;
		}
	})


	// fulltext implementation
	let timer: NodeJS.Timeout;

	$effect(() => {
		if (table.fulltextFilterValue.length > 0) {
			timer = debounceFn(timer, gridApi.onFilterChanged);
		} else {
			gridApi.onFilterChanged()
		}
	})


	// load selectedFilters from ribbon -> my filters
	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	// load selectedPreset from ribbon -> my presets
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
		if (gridContainer && gridApi) {
			const handleClickOutside = (event: MouseEvent) => {
				if (!gridContainer?.contains(event.target as Node) && isEditing) {
					gridApi.stopEditing(true);
				}
			};

			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			table.openInputParams = true;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.DELETE) {
			console.log("DELETE", gridApi.getServerSideSelectionState()?.toggledNodes);
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
			const filters = gridApi.getFilterModel();
			openedRibbonDialog.value = "ribbon-save-filters";
			table.filtersToSave = filters;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.SAVE_PRESET) {
			openedRibbonDialog.value = "ribbon-save-preset";
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


<div class="flex flex-column h-full">
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


	:global(.ag-tool-panel-horizontal-resize) {
		@apply bg-slate-300;
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


	/*:global(.ag-center-cols-viewport) {*/
	/*	min-height: 20px !important;*/
	/*}*/
</style>
