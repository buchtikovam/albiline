import type {
	ColumnMovedEvent,
	ColumnPinnedEvent,
	ColumnVisibleEvent,
	FilterChangedEvent,
	GetMainMenuItemsParams,
	GridOptions,
	SelectionChangedEvent,
	SortChangedEvent,
} from 'ag-grid-community';
import {
	type CellValueChangedEvent,
	type GetRowIdParams, type GridApi,
	type RowSelectedEvent,
	themeQuartz
} from "ag-grid-enterprise";
import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte.js";
import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
import {
	handleCellEditingStart,
	handleCellEditingStopped,
	handleCellValueChanged,
	handleColumnMoved,
	handleColumnPinned,
	handleColumnVisibleChanged,
	handleFilterChanged,
	handleRowSelected, handleSelectionChanged,
	handleSortChanged
} from '$lib/components/ag-grid/serverside/agGridSSEventHandlers.svelte.js';
import type { AgGridTableType } from '$lib/types/components/table/table';
import {
	getContextMenuItems,
	getDefaultColDef,
	getMainMenuItems,
	getRowId,
	getStatusBar
} from '$lib/components/ag-grid/serverside/agGridSSUtils.svelte.js';



export function getSSGridOptions (
	table: AgGridTableType,
): GridOptions {
	return {
		theme: themeQuartz.withParams(themeAlbiBlueParams),
		localeText: getAgGridLocale(),
		rowModelType: 'serverSide',
		maintainColumnOrder: true,
		serverSideInitialRowCount: 0,
		enterNavigatesVerticallyAfterEdit: true,
		undoRedoCellEditing: true,
		cacheBlockSize: 1000,
		maxBlocksInCache: 20,
		rowBuffer: 100,
		blockLoadDebounceMillis: 600,
		loadThemeGoogleFonts: false,
		undoRedoCellEditingLimit: 20,
		enableCellTextSelection: true,
		tooltipShowDelay: 1000,

		sideBar: {
			toolPanels: ['columns', 'filters']
		},

		cellSelection: {
			handle: {
				mode: 'fill',
				direction: 'y'
			}
		},

		rowSelection: {
			mode: 'multiRow',
			enableClickSelection: true,
			headerCheckbox: false,
			hideDisabledCheckboxes: true
		},

		statusBar: getStatusBar(),
		defaultColDef: getDefaultColDef(),
		getRowId: (params: GetRowIdParams) => getRowId(params, table),
	}
}



export function getSSGridOptionsHandlers(
	updateIsEditing: (newValue: boolean) => void,
	isInitial: boolean,
	gridApi: GridApi,
	table: AgGridTableType,
): GridOptions {
	return {
		// utils
		getMainMenuItems: (e: GetMainMenuItemsParams) => getMainMenuItems(e),
		getContextMenuItems: () => getContextMenuItems(),

		// row events
		onRowSelected: (e: RowSelectedEvent) => handleRowSelected(e, gridApi, table),

		// cell events
		onCellValueChanged: (e: CellValueChangedEvent) => handleCellValueChanged(e, table),
		onCellEditingStarted: () => handleCellEditingStart(updateIsEditing),
		onCellEditingStopped: () => handleCellEditingStopped(updateIsEditing),

		// column events
		onColumnMoved: (e: ColumnMovedEvent) => handleColumnMoved(e, table),
		onColumnPinned: (e: ColumnPinnedEvent) => handleColumnPinned(e, table),
		onColumnVisible: (e: ColumnVisibleEvent) => handleColumnVisibleChanged(e, isInitial, table),

		// grid events
		onSortChanged: (e: SortChangedEvent) => handleSortChanged(e, table, isInitial),
		onFilterChanged: (e: FilterChangedEvent) => handleFilterChanged(e, isInitial),
		onSelectionChanged: (e: SelectionChangedEvent) => handleSelectionChanged(e, table),
	}
}
