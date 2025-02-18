<script lang="ts">
	import {
		activeSelectedRowIndex,
		defaultColDef,
		editedTableData,
		filtersToSave,
		lastVisibleRowIndex,
		latestRowCount,
		presetToSave,
		selectedFilters,
		selectionState,
		sortState,
		storedSelectedRows
	} from '$lib/runes/table.svelte';
	import {authDetails, fulltextFilterValue, sessionKey} from '$lib/runes/page.svelte';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {disablePageTabs} from '$lib/runes/navigation.svelte';
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import {addToEditedTableData} from '$lib/utils/addToEditedTableData';
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/getAgGridLocale";

	import {onMount, tick} from 'svelte';
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
		serverSideInitialRowCount: latestRowCount.value,
		enterNavigatesVerticallyAfterEdit: true,
		undoRedoCellEditing: true,
		cacheBlockSize: 1000,
		maxBlocksInCache: 20,
		rowBuffer: rowBufferSize,
		blockLoadDebounceMillis: 600,
		undoRedoCellEditingLimit: 20,
		enableCellTextSelection: true,
		// sideBar: true,

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
					editedTableData.value
				)
			}
		},


		onSortChanged: (event: SortChangedEvent<any>) => {
			if (!isInitial) {
				gridApi.setServerSideSelectionState({
					selectAll: false,
					toggledNodes: []
				})

				storedSelectedRows.value = [];
			}

			if (event.columns) {
				event.columns.forEach((column: Column) => {
					let match = false;

					sortState.value.forEach((sort) => {
						if (sort.colId === column.getId()) {
							match = true;
							sort.sort = column.getSort();
						}
					})

					if (!match) {
						sortState.value.push({
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

				storedSelectedRows.value = [];
			}
		},


		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber);
		},


		onSelectionChanged: (event: SelectionChangedEvent) => {
			selectionState.value = event.api.getServerSideSelectionState();
			activeSelectedRowIndex.value = 0

			if (selectionState.value) {
				if (selectionState.value.toggledNodes) {
					const selectedRows: any[] = [];

					selectionState.value.toggledNodes.forEach((rowNumber) => {
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

						storedSelectedRows.value = rowArr;
						disablePageTabs.value = false;
					} else {
						disablePageTabs.value = true;
						storedSelectedRows.value = [];
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

			fetch(url
				,{
					method: "post",
					body: JSON.stringify(params.request),
					headers: {
						"Content-Type": "application/json",
						"Session-Key": sessionKey.value || "",
					}
				}
			)
			.then(httpResponse => httpResponse.json())
			.then(response => {
				params.success({ rowData: response.items });
				latestRowCount.value = response.totalRows === -1 ? 0 : response.totalRows;
				gridApi.setRowCount(latestRowCount.value);

				if (isInitial) { // TODO: ?? use session storage with route as a key to save and update
					const columnState = {
						state: sortState.value,
					}

					gridApi.applyColumnState(columnState);

					// setting scroll position
					if (lastVisibleRowIndex.value > rowBufferSize) {
						gridApi.ensureIndexVisible(lastVisibleRowIndex.value + rowBufferSize, "top");
					} else {
						if (selectionState.value) {
							if (selectionState.value.toggledNodes) {
								if (Number(selectionState.value.toggledNodes[0])) {
									gridApi.ensureIndexVisible(Number(selectionState.value.toggledNodes[0]) - 1 , "top");
								}
							}
						}
					}

					// setting selectedRows
					if (selectionState.value) {
						setTimeout(() => {
							disablePageTabs.value = selectionState.value.toggledNodes.length === 0;
							gridApi.setServerSideSelectionState(selectionState.value)
						}, 200)
					}
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
		console.log("!!! ---- MOUNTED ---- !!!")

		if (gridContainer) { // initialize grid
			gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		}

		gridApi.setFilterModel(filtersToSave.value);
		gridApi.setGridOption('serverSideDatasource', datasource);

		let colDefs = gridApi.getColumnDefs();
		let columnOrder: ColumnOrder = [];
		// add header translations + keep track of initial editable state of columns
		if (presetToSave.value.length > 0) {
			colDefs = presetToSave.value;
		}

		colDefs?.forEach(colDef => {
			columnOrder.push({ colId: colDef.colId })
		})

		// const colDefs =
		colDefs?.forEach((column: ColDef) => {
			columnDefaultEditable.set(column.field, column.editable)
			column.headerName = headerTranslations[column.field || ""]();
		})

		// initialize default column definitions for ribbon -> load preset
		defaultColDef.value = colDefs || [];

		// update grid with updated column defs
		gridApi.setGridOption("columnDefs", colDefs);
		gridApi.applyColumnState({
			state: columnOrder,
			applyOrder: true
		});

		return (() => {
			console.log("!!! ---- RETURN ---- !!!")
			selectionState.value = gridApi.getServerSideSelectionState();
			filtersToSave.value = gridApi.getFilterModel();
			lastVisibleRowIndex.value = gridApi.getFirstDisplayedRowIndex();
			presetToSave.value = gridApi.getColumnDefs() || [];
			gridApi.destroy();
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
		if (Object.keys(selectedFilters.value).length > 0) {
			gridApi.setFilterModel(selectedFilters.value);
			selectedFilters.value = {};
		}
	})



	$effect(() => {
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


		if (ribbonAction.value === RibbonActionEnum.FILTER_QUICK) {
			const column = gridApi.getFocusedCell()?.column;
			const selection = window.getSelection()?.toString().trim();

			if (column && selection) {
				const cellType = column.getColDef().cellDataType;
				let currentFilters = gridApi.getFilterModel();
				let filterModelType;

				if (cellType === "text") filterModelType = "contains";

				if (cellType === "number") filterModelType = "equals";

				if (cellType === "date") filterModelType = "equals";


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
			openedRibbonDialog.value = "ribbon-save-filters";
			filtersToSave.value = gridApi.getFilterModel();
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}


		if (ribbonAction.value === RibbonActionEnum.SAVE_PRESET) {
			openedRibbonDialog.value = "ribbon-save-preset";
			filtersToSave.value = gridApi.getFilterModel();
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})


	$inspect("action", ribbonAction.value);
	$inspect("ribbon dialog", openedRibbonDialog.value);
</script>




<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>

