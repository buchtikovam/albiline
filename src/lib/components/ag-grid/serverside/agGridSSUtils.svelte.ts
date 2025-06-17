import type {GetRowIdParams, GridApi, IServerSideDatasource} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {ColDef, GetMainMenuItemsParams} from "ag-grid-community";
import {
	ServerSideTotalRowsStatusBarComponent
} from "$lib/utils/components/ag-grid/status-bar/serverSideTotalRowsStatusBarComponent.svelte.js";


export function handleClickOutside (
	event: MouseEvent,
	gridContainer: HTMLElement|undefined,
	isEditing: boolean,
	gridApi: GridApi,
){
	if (!gridContainer?.contains(event.target as Node) && isEditing) {
		gridApi.stopEditing(true);
	}
}


export function onTablePresetSelected (
	gridApi: GridApi,
	table: AgGridTableType
) {
	if (table.selectedPreset) {
		gridApi.applyColumnState({
			state: table.selectedPreset.pagePresetValue,
			applyOrder: true
		});

		table.selectedPresetFull = table.selectedPreset;
		table.selectedPreset = undefined;
	}
}


export function resetTable(
	gridApi: GridApi,
) {
	gridApi.setServerSideSelectionState({ toggledNodes: [], selectAll: false })
	gridApi.applyColumnState({
		state: [],
		applyOrder: true,
	})
}



export function resetColState(
	gridApi: GridApi,
	table: AgGridTableType
)  {
	gridApi.applyColumnState({
		state: table.defaultColState,
		applyOrder: true,
	});

	table.setColStateToDefault = false;
}



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
	table: AgGridTableType
) {
	return String(params.data[table.identificationKey]);
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
