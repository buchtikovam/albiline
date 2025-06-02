import {
	type BodyScrollEndEvent,
	type BodyScrollEvent,
	type ColumnMovedEvent, type ColumnPinnedEvent, type ColumnResizedEvent,
	type ColumnVisibleEvent, type FilterChangedEvent,
	type GetRowIdParams, type GridApi,
	type GridOptions, type RowDataUpdatedEvent, type SelectionChangedEvent, type SortChangedEvent,
	themeQuartz
} from "ag-grid-enterprise";
import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
import {
	getContextMenuItemsCS,
	getDefaultColDef, getMainMenuItemsCS,
	getRowIdCS,
	getRowSelection,
	getStatusBar
} from "$lib/components/ag-grid/clientside/agGridCSUtils.svelte";
import type {GetMainMenuItemsParams} from "ag-grid-community";
import {
	handleBodyScroll,
	handleCellEditingStarted,
	handleCellEditingStopped,
	handleColumnMoved,
	handleColumnPinned,
	handleColumnResized,
	handleColumnVisibleChanged,
	handleFilterChanged, handleRowDataUpdated, handleSelectionChanged, handleSortChanged
} from "$lib/components/ag-grid/clientside/agGridCSEventHandlers.svelte";
import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte";
import type {AgGridTableType} from "$lib/types/components/table/table";

export function getCSGridOptions(
	table: AgGridTableType,
): GridOptions {
	return {
		// autoSizeStrategy: {
		// 	type: 'fitCellContents',
		// 	skipHeader: false
		// },
		theme: themeQuartz.withParams(themeAlbiBlueParams),
		localeText: getAgGridLocale(),
		loadThemeGoogleFonts: false,
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
		rowData: [],
		sideBar: {
			toolPanels: [
				{
					id: 'columns',
					labelDefault: 'Columns',
					labelKey: 'columns',
					iconKey: 'columns',
					toolPanel: 'agColumnsToolPanel',
					toolPanelParams: {
						suppressValues: true
					}
				},
				'filters'
			]
		},
		statusBar: getStatusBar(),
		rowSelection: getRowSelection(),
		defaultColDef: getDefaultColDef(),

		getRowId: (params: GetRowIdParams) => getRowIdCS(params, table),
	};
}


export function getCSGridOptionsHandlers(
	table: AgGridTableType,
	updateIsEditing: (newValue: boolean) => void,
	isInitial: boolean,
	gridApi: GridApi,
): GridOptions {
	return {
		getMainMenuItems: (event: GetMainMenuItemsParams) => getMainMenuItemsCS(event),
		getContextMenuItems: () => getContextMenuItemsCS(),

		onCellEditingStarted: () => handleCellEditingStarted(updateIsEditing),
		onCellEditingStopped: () => handleCellEditingStopped(updateIsEditing),

		onColumnMoved: (event: ColumnMovedEvent<any>) => handleColumnMoved(event, table),
		onColumnVisible: (event: ColumnVisibleEvent<any>) => handleColumnVisibleChanged(event, table, isInitial),
		onColumnPinned: (event: ColumnPinnedEvent<any>) => handleColumnPinned(event, table),
		onColumnResized: (event: ColumnResizedEvent<any>) => handleColumnResized(event, table),

		onFilterChanged: (event: FilterChangedEvent<any>) => handleFilterChanged(event, table),
		onSortChanged: (event: SortChangedEvent<any>) => handleSortChanged(event, table),
		onBodyScroll: (event: BodyScrollEvent<any>) => handleBodyScroll(event, table),
		onRowDataUpdated: (event: RowDataUpdatedEvent<any>) => handleRowDataUpdated(gridApi, event, table),
		onSelectionChanged: (event: SelectionChangedEvent<any>) => handleSelectionChanged(event, table)
	}
}
