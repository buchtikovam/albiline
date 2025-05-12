import type {ColDef, GetMainMenuItemsParams} from "ag-grid-community";
import type {GetRowIdParams} from "ag-grid-enterprise";
import type {GridDependencies} from "$lib/components/ag-grid/ss-wrapper/types";
import {
	ServerSideTotalRowsStatusBarComponent
} from "$lib/utils/components/ag-grid/status-bar/serverSideTotalRowsStatusBarComponent.svelte";


export function getDefaultColDef(): ColDef {
	return {
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
	}
}


export function getMainMenuItems(
	e: GetMainMenuItemsParams
) {
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
			name: 'IT',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
			subMenu: [
				{
					name: 'field: ' + e.column.getColId(),
					action: () => {
						navigator.clipboard.writeText(e.column.getColId()).then((r) => r);
					}
				}
			]
		}
	];
}


export function getContextMenuItems(): string[] {
	return ['copy', 'copyWithHeaders', 'cut', 'paste'];
}


export function getRowId(
	params: GetRowIdParams,
	deps: GridDependencies
) {
	return String(params.data[deps.table.identificationKey]);
}


export function getStatusBar() {
	return {
		statusPanels: [
			{
				statusPanel: ServerSideTotalRowsStatusBarComponent,
				align: 'left'
			},
			{
				statusPanel: 'agSelectedRowCountComponent',
				align: 'left'
			}
		]
	}
}


