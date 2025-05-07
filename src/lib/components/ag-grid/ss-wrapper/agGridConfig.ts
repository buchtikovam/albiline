import { themeQuartz } from 'ag-grid-enterprise';
import { themeAlbiBlueParams } from '$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte';
import { getAgGridLocale } from '$lib/utils/components/ag-grid/methods/getAgGridLocale';
import { ServerSideTotalRowsStatusBarComponent } from '$lib/utils/components/ag-grid/status-bar/serverSideTotalRowsStatusBarComponent.svelte';
import type { GridOptions, ColDef } from 'ag-grid-community';


export const getBaseGridOptions = (): GridOptions => ({
	theme: themeQuartz.withParams(themeAlbiBlueParams),
	localeText: getAgGridLocale(),
	rowModelType: "serverSide",
	maintainColumnOrder: true,
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
		toolPanels: ["columns", "filters"]
	},
	cellSelection: {
		handle: {
			mode: "fill",
			direction: "y"
		}
	},
	rowSelection: {
		mode: 'multiRow',
		enableClickSelection: true,
		headerCheckbox: false,
		hideDisabledCheckboxes: true,
	},
	statusBar: {
		statusPanels: [
			{
				statusPanel: ServerSideTotalRowsStatusBarComponent,
				align: 'left'
			},
			{
				statusPanel: 'agSelectedRowCountComponent',
				align: 'left'
			},
		]
	},
	defaultColDef: getDefaultColDef(),
});


const getDefaultColDef = (): ColDef => ({
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
});
