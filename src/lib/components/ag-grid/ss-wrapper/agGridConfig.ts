import {themeAlbiBlueParams} from '$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte';
import {
	handleCellEditingStart,
	handleCellEditingStopped,
	handleCellValueChanged,
	handleColumnMoved,
	handleColumnPinned,
	handleColumnVisibleChanged, handleFilterChanged,
	handleRowSelected, handleSelectionChanged,
	handleSortChanged
} from "$lib/components/ag-grid/ss-wrapper/gridEventHandlers";
import {getAgGridLocale} from '$lib/utils/components/ag-grid/methods/getAgGridLocale';
import {
	getContextMenuItems,
	getDefaultColDef,
	getMainMenuItems,
	getRowId, getStatusBar
} from "$lib/components/ag-grid/ss-wrapper/gridUtils";
import {
	type CellValueChangedEvent,
	type ColumnMovedEvent,
	type ColumnPinnedEvent,
	type ColumnVisibleEvent,
	type GetRowIdParams,
	type RowSelectedEvent,
	type SelectionChangedEvent,
	type SortChangedEvent,
	themeQuartz
} from 'ag-grid-enterprise';
import type {
	GetMainMenuItemsParams,
	FilterChangedEvent,
	GridOptions
} from 'ag-grid-community';
import type {GridDependencies} from "$lib/components/ag-grid/ss-wrapper/types";



export const getBaseGridOptions = (deps: GridDependencies): GridOptions => ({
	theme: themeQuartz.withParams(themeAlbiBlueParams),
	localeText: getAgGridLocale(),
	rowModelType: 'serverSide',
	maintainColumnOrder: true,
	serverSideInitialRowCount: deps.table.latestRowCount,
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

	// utils
	getRowId: (params: GetRowIdParams) => getRowId(params, deps),
	getMainMenuItems: (e: GetMainMenuItemsParams) => getMainMenuItems(e),
	getContextMenuItems: () => getContextMenuItems(),

	// row events
	onRowSelected: (e: RowSelectedEvent) => handleRowSelected(e, deps),

	// cell events
	onCellValueChanged: (e: CellValueChangedEvent) => handleCellValueChanged(e, deps),
	onCellEditingStarted: () => handleCellEditingStart(deps),
	onCellEditingStopped: () => handleCellEditingStopped(deps),

	// column events
	onColumnMoved: (e: ColumnMovedEvent) => handleColumnMoved(e, deps),
	onColumnPinned: (e: ColumnPinnedEvent) => handleColumnPinned(e, deps),
	onColumnVisible: (e: ColumnVisibleEvent) => handleColumnVisibleChanged(e, deps),

	// grid events
	onSortChanged: (e: SortChangedEvent) => handleSortChanged(e, deps),
	onFilterChanged: (e: FilterChangedEvent) => handleFilterChanged(e, deps),
	onSelectionChanged: (e: SelectionChangedEvent) => handleSelectionChanged(e, deps),
});

