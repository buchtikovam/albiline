<script lang="ts">
	import {
		 type ServerSideTable, serverSideTables,
	} from '$lib/runes/table.svelte';
	import {authDetails, fulltextFilterValue, isMobile} from '$lib/runes/page.svelte';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import * as XLSX from "xlsx";
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {addToEditedTableData} from '$lib/utils/addToEditedTableData';
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {getContext, onMount, tick} from 'svelte';
	import {
		type CellValueChangedEvent,
		type Column,
		createGrid,
		type FilterModel,
		type GetRowIdParams,
		type GridApi,
		type GridOptions,
		type IServerSideDatasource,
		type IServerSideGetRowsParams,
		type SelectionChangedEvent,
		type SortChangedEvent,
		themeQuartz
	} from 'ag-grid-enterprise';
	import type {ColumnOrder, TableRowRequest} from '$lib/types/components/table/table';
	import type {ColDef} from 'ag-grid-community';
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
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


	let tableKey: string = getContext('serverSideTableKey');
	let table: ServerSideTable|undefined = $state(serverSideTables[tableKey]);


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
		sideBar: {
			toolPanels: ["columns", "filters"],
			hiddenByDefault: isMobile.value,
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


		getMainMenuItems: () => {
			return [
				'pinSubMenu',
				'separator',
				'valueAggSubMenu',
				'autoSizeThis',
				'columnChooser',
				'resetColumns',
				'separator',
				'sortUnSort',
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
					["customerNodeCode", "customerAddressCode"],
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
			}
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


			console.log(JSON.stringify(updatedParamsRequest, null, 1))

			apiServicePostHandled(url, updatedParamsRequest)
				.then(httpResponse => httpResponse.data)
				.then(response => {
					params.success({ rowData: response.items });
					table.latestRowCount = response.totalRows === -1 ? 0 : response.totalRows;
					gridApi.setRowCount(table.latestRowCount || 0);

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
		console.log(finalGridOptions.columnDefs);
		table.defaultColDef = finalGridOptions.columnDefs || [];


		// overwrite default coldef if user has unsaved preset
		if (table.presetToSave.length > 0) {
			finalGridOptions.columnDefs = table.presetToSave;
		}

		// initialize grid
		if (gridContainer) {
			gridApi = createGrid(gridContainer, finalGridOptions);
		}

		gridApi.setFilterModel(table.filtersToSave);
		gridApi.setGridOption('serverSideDatasource', datasource);

		let colDefs = gridApi.getColumnDefs();

		// const colDefs =
		colDefs?.forEach((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)
			column.headerName = headerTranslations[column.field || ""]();
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
		if (Object.keys(table.selectedFilters).length > 0) {
			gridApi.setFilterModel(table.selectedFilters);
			table.selectedFilters = {};
		}
	})


	$effect(() => {
		if (table.selectedPreset.length > 0) {
			const preset = deepcopy(table.selectedPreset);
			const columnOrder: ColumnOrder = [];

			preset.forEach((column: ColDef) => {
				columnOrder.push({ colId: column.field })
				column.headerName = headerTranslations[column.field || ""]();
			})

			gridApi.setGridOption("columnDefs", preset);
			gridApi.applyColumnState({
				state: columnOrder,
				applyOrder: true
			});

			table.selectedPreset = [];
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
			const allColumns = gridApi.getColumns();

			// Exclude the first column
			let columnKeys = allColumns?.map(col => col.getColId());

			gridApi.exportDataAsExcel({
				columnKeys: columnKeys,
				skipColumnGroupHeaders: false,
				skipColumnHeaders: false,
				onlySelected: false,
				allColumns: true, // whether or not render hidden columns
				processRowGroupCallback: () => "",
				processCellCallback: () => "",
				author: authDetails.userName || "AG Grid",
			});

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.EXPORT_EXCEL_DATA) {
			const allColumns = gridApi.getColumns();

			// Exclude the first column
			let columnKeys = allColumns?.map(col => col.getColId());

			gridApi.exportDataAsExcel({
				columnKeys: columnKeys,
				skipColumnGroupHeaders: false,
				skipColumnHeaders: false,
				allColumns: true, // whether or not render hidden columns
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
			const column = gridApi.getFocusedCell()?.column;
			const selection = window.getSelection()?.toString().trim();

			if (column && selection) {
				const cellType = column.getColDef().cellDataType;
				let currentFilters = gridApi.getFilterModel();
				let filterModelType;

				if (cellType === "text") filterModelType = "contains";

				if (cellType === "number" || cellType === "date") filterModelType = "equals";

				currentFilters[column.getColId()] = {
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
			console.log(gridApi.getColumnDefs());
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


	/*:global(.ag-center-cols-viewport) {*/
	/*	min-height: 20px !important;*/
	/*}*/
</style>
