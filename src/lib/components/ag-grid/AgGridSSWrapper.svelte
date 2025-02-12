<script lang="ts">
	import {
		activeSelectedRowIndex,
		defaultColDef,
		editedTableData,
		filtersToSave,
		lastVisibleRowIndex,
		latestRowCount,
		presetToSave,
		selectionState,
		sortState,
		storedSelectedRows
	} from '$lib/runes/table.svelte';
	import { fulltextFilterValue, sessionKey } from '$lib/runes/page.svelte';
	import { openedDialog, ribbonAction } from "$lib/runes/ribbon.svelte";
	import { disablePageTabs } from '$lib/runes/navigation.svelte';
	import { themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue";
	import { addToEditedTableData } from '$lib/utils/addToEditedTableData';
	import { RibbonActionEnum } from "$lib/enums/ribbon/ribbonAction";
	import { getAgGridLocale } from "$lib/utils/components/ag-grid/getAgGridLocale";

	import { tick } from 'svelte';
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
		type SortChangedEvent, themeQuartz
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
	let themeParams = $state(themeAlbiBlueParams)


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
		sideBar: true,

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
			gridApi.setServerSideSelectionState({
				selectAll: false,
				toggledNodes: []
			})
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
			gridApi.setServerSideSelectionState({
				selectAll: false,
				toggledNodes: []
			})
		},


		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber);
		},


		onRowSelected: () => { // TODO: odstranit
			const selectedRows: any[] = gridApi.getSelectedRows();
			let rowArr: {[key: string]: any}[] = []

			disablePageTabs.value = selectedRows.length > 0;
			activeSelectedRowIndex.value = 0

			selectedRows.forEach((row) => {
				let rowObj: {[key: string]: any} = {}
				requiredFields.forEach((field) => {
					rowObj[field] = row[field]
				})

				rowArr.push(rowObj);
			});

			storedSelectedRows.value = rowArr;
		},

	}


	$inspect(latestRowCount.value);


	//  datasource configuration
	let recentFilters: FilterModel[] = [];

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
					latestRowCount.value = response.totalRows;
					gridApi.setRowCount(response.totalRows);

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
									gridApi.ensureIndexVisible(Number(selectionState.value.toggledNodes[0]) - 1 , "top");
								}
							}
						}

						// setting selectedRows
						if (selectionState.value) {
							gridApi.setServerSideSelectionState(selectionState.value)
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



	// without inspect infinity loop happens ?
	$inspect(presetToSave.value)

	// used when ribbon -> edit button is pressed
	const columnDefaultEditable = new Map();

	// runs when component is mounted only
	$effect(() => {
		if (gridContainer) { // initialize grid
			gridApi = createGrid(gridContainer, {...gridOptions, ...gridOptionsCustom});
		}

		// initiliate datasource
		gridApi.setGridOption('serverSideDatasource', datasource);

		if (gridApi) {
			gridApi.setFilterModel(filtersToSave.value);

			console.log(JSON.stringify(filtersToSave.value, null, 1))
		}

		let colDefs = gridApi.getColumnDefs();
		let columnOrder: ColumnOrder = [];
		// add header translations + keep track of initial editable state of columns
		if (presetToSave.value.length > 0) {
			colDefs = presetToSave.value;
		}

		colDefs?.forEach(colDef => {
			// @ts-ignore
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
			selectionState.value = gridApi.getServerSideSelectionState();
			filtersToSave.value = gridApi.getFilterModel();
			lastVisibleRowIndex.value = gridApi.getFirstDisplayedRowIndex();
			presetToSave.value = gridApi.getColumnDefs() || [];
		})
	})



	// disable page tabs if no row is selected
	$effect(() => {
		disablePageTabs.value = storedSelectedRows.value.length === 0;
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
		if (ribbonAction.value === RibbonActionEnum.MY_FILTERS) {
			openedDialog.value = "ribbon-my-filters"
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})
</script>


<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		bind:this={gridContainer}
	></div>
</div>

