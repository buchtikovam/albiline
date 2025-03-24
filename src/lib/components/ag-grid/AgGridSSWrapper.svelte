<script lang="ts">
	import {currentPageKey, agGridTables} from '$lib/runes/table.svelte';
	import {authDetails, fulltextFilterValue, isMobile} from '$lib/runes/page.svelte';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import * as XLSX from "xlsx";
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {addToEditedTableData} from '$lib/utils/addToEditedTableData';
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {onMount, tick} from 'svelte';
	import {
		type CellValueChangedEvent,
		type Column, type ColumnMovedEvent, type ColumnPinnedEvent, type ColumnVisibleEvent,
		createGrid,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams,
		type SelectionChangedEvent, type ShouldRowBeSkippedParams,
		type SortChangedEvent,
		themeQuartz
	} from 'ag-grid-enterprise';
	import type {ColumnOrder, AgGridSSTableType, TableRowRequest} from '$lib/types/components/table/table';
	import type {ColDef} from 'ag-grid-community';
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {languageTag} from "$lib/paraglide/runtime";
	import deepcopy from "deepcopy";

	interface Props {
		url: string;
		requiredFields: string[];
		gridOptionsCustom: GridOptions;
		headerTranslations: Record<string, () => string>
	}

	let {
		url,
		requiredFields,
		gridOptionsCustom,
		headerTranslations
	}: Props = $props();


	let pageKey: string = currentPageKey.value;
	let table: AgGridSSTableType = $state(agGridTables.value[pageKey]);

	// create grid
	let gridContainer: HTMLElement|undefined = $state(undefined);
	let gridApi: GridApi<unknown>;
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
			// enableClickSelection: true,
			headerCheckbox: false, // maybe add later ?
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


		onCellValueChanged: (event: CellValueChangedEvent<any>) => {
			if (event.oldValue !== event.newValue) {
				addToEditedTableData(
					event,
					requiredFields,
					table.editedTableData,
				)
			}
		},


		onSortChanged: (event: SortChangedEvent<any>) => {
			if (!isInitial) {
				gridApi.setServerSideSelectionState({
					selectAll: false,
					toggledNodes: []
				})
			}

			if (event.columns) {
				event.columns.forEach((column: Column) => {
					let match = false;

					table.sortState.forEach((sort) => {
						if (sort.colId === column.getId()) {
							match = true;
							sort.sort = column.getSort();
						}
					})

					if (!match) {
						table.sortState.push({
							colId: column.getColId(),
							sort: column.getSort(),
						})
					}
				})

				table.presetToSave = event.api.getColumnDefs();
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

		onFilterChanged: () =>  {
			if (!isInitial) {
				gridApi.setServerSideSelectionState({
					selectAll: false,
					toggledNodes: []
				})
			}
		},


		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber);
		},


		onSelectionChanged: (event: SelectionChangedEvent) => {
			table.selectionState = event.api.getServerSideSelectionState();
			table.activeSelectedRowIndex = 0

			if (table.selectionState) {
				if (table.selectionState.toggledNodes) {
					disablePageTabs.value = table.selectionState.toggledNodes.length < 1;

					const selectedRows: any[] = [];

					table.selectionState.toggledNodes.forEach((rowNumber) => {
						selectedRows.push(event.api.getDisplayedRowAtIndex(Number(rowNumber) - 1));
					})

					if (selectedRows.length > 0) {
						const rowArr: Record<string, number>[] = [];

						try {
							selectedRows.forEach((row) => {
								let rowObj: {[key: string]: any} = {}
								requiredFields.forEach((field) => {
									rowObj[field] = row.data[field]
								})

								rowArr.push(rowObj);
							});
						} catch (e) {

						}

						// disablePageTabs.value = false;
						table.selectedRows = rowArr;
					} else {
						// disablePageTabs.value = true;
						// table.selectedRows = [];
					}
				}
			}
		},
	}


	$inspect(table.filtersToSave)


	//  datasource configuration
	let recentFilters: FilterModel[] = $state([]);

	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = fulltextFilterValue.value;

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			table.filtersToSave = currentFilter;

			console.log(JSON.stringify(updatedParamsRequest, null, 1))


			apiServicePostHandled(url, updatedParamsRequest)
				.then(httpResponse => httpResponse.data)
				.then(response => {
					console.log(response)

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



	// used when ribbon -> edit button is pressed
	const columnDefaultEditable = new Map();



	// runs when component is mounted only
	onMount(() => {
		disablePageTabs.value = true;

		const finalGridOptions =  {...gridOptions, ...gridOptionsCustom};

		console.log("mount")
		table.defaultColDef = finalGridOptions.columnDefs;

		// overwrite default coldef if user has unsaved preset
		if (table.presetToSave.length > 0) {
			finalGridOptions.columnDefs = table.presetToSave;
		}

		// initialize grid
		if (gridContainer) {
			gridApi = createGrid(gridContainer, finalGridOptions);
		}


		gridApi.setFilterModel(table.filtersToSave);


		let colDefs = gridApi.getColumnDefs();

		// const colDefs =
		colDefs?.forEach((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)
		})

		// update grid with updated column defs
		gridApi.setGridOption("columnDefs", colDefs);


		return (() => {
			table.selectionState = gridApi.getServerSideSelectionState();
			table.filtersToSave = gridApi.getFilterModel();
			table.lastVisibleRowIndex = gridApi.getFirstDisplayedRowIndex();
			table.presetToSave = gridApi.getColumnDefs() || [];
			table.activeSelectedRowIndex = 0;
			disableNavigation.value = false;

			if (table.selectionState) {
				if (table.selectionState.toggledNodes) {
					const rows: any[] = [];

					table.selectionState.toggledNodes.forEach((rowNumber) => {
						rows.push(gridApi.getDisplayedRowAtIndex(Number(rowNumber) - 1));
					})

					if (rows.length > 0) {
						const rowArr: Record<string, number>[] = [];

						rows.forEach((row) => {
							let rowObj: { [key: string]: any } = {}
							requiredFields.forEach((field) => {
								rowObj[field] = row.data[field]
							})

							rowArr.push(rowObj);
						});

						table.selectedRows = rowArr;
					}
				}
			}

			setTimeout(() => {
				gridApi.destroy();
			}, 100)
		})
	})


	$effect(() => {
		if (table.areInputParamsLoading) {
			gridApi.setGridOption("loading", true)
		} else {
			gridApi.setGridOption("loading", false)
			gridApi.setGridOption('serverSideDatasource', datasource);
		}
	})


	$effect(() => {
		if (gridApi) {
			if (languageTag()) {
				let colDefs = gridApi.getColumnDefs();

				// const colDefs =
				colDefs?.forEach((column: ColDef) => {
					column.headerName = headerTranslations[column.field || ""]();
				})



				// update grid with updated column defs
				gridApi.setGridOption("columnDefs", colDefs);
			}
		}
	})


	$effect(() => {
		if (table.setColDefToDefault) {
			const columnOrder: ColumnOrder = [];

			table.defaultColDef.forEach((column: ColDef) => {
				columnOrder.push({ colId: column.field })
				column.hide = column.hide || false;
				column.headerName = headerTranslations[column.field || ""]();
			})

			gridApi.setGridOption("columnDefs", table.defaultColDef);
			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});

			table.setColDefToDefault = false;
		}
	})


	// listening to fulltext filter changes from layout, refresh grid with delay
	let timer: NodeJS.Timeout;

	function debounceFulltext() {
		clearTimeout(timer)

		timer = setTimeout(async () => {
			await tick();
			gridApi.onFilterChanged()
		}, 1000)
	}

	$effect(() => {
		if (fulltextFilterValue.value.length > 1) {
			debounceFulltext();
		}
	})



	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	$effect(() => {
		if (table.selectedPreset) {
			const preset = deepcopy(table.selectedPreset.pagePresetValue);
			const columnOrder: ColumnOrder = [];

			preset.forEach((column: ColDef) => {
				columnOrder.push({ colId: column.field })
				column.hide = column.hide || false;
				column.headerName = headerTranslations[column.field || ""]();
			})

			console.log(columnOrder);
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



	let excelFileInput: HTMLInputElement;

	function handleExcelUpload(event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];

			let columnFields: { field: string, headerName: string }[] = gridApi.getColumnDefs()?.map(colDef => {
				return {
					field: colDef.colId,
					headerName: colDef.headerName,
				}
			})


			let jsonData = XLSX.utils.sheet_to_json(sheet);

			const rowDataExc = jsonData.map((row) => {
				const importedRow: Record<string, any> = {};

				columnFields.forEach((columnField) => {
					importedRow[columnField.field] = row[columnField.headerName];
				})

				return importedRow;
			});

			console.log(rowDataExc);
		};

		reader.readAsArrayBuffer(file);
	}



	$effect(() => {
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
			table.presetToSave = gridApi.getColumnDefs() || [];
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
	onchange={handleExcelUpload}
/>


<div class="flex flex-column h-full">
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


	:global(.ag-tool-panel-horizontal-resize) {
		background-color: var(--slate-300);
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
