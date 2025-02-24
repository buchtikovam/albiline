import type { Preset } from '$lib/types/components/table/presets';
import type {
	ColDef,
	ColGroupDef,
	IServerSideGroupSelectionState,
	IServerSideSelectionState,
	SortDirection
} from 'ag-grid-community';
import type { FilterModel } from "ag-grid-enterprise";

export interface ServerSideTables {
	[pageKey: string]: ServerSideTable
}


// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER!!!
export interface ServerSideTable {
	// for restoring default table settings and layout
	defaultColDef: (ColDef<unknown, any> | ColGroupDef<unknown>)[];
	// used when setting default colDef - preset
	setColDefToDefault: boolean;
	// used for disabling tabs and saving edits
	editedTableData: any[];
	// current filters used in table. Can be saved through ribbon
	filtersToSave: FilterModel;
	selectedFilters: FilterModel;
	presetToSave: Preset[];
	selectedPreset: Preset[];
	selectedRows: Record<string, any>[];
	selectionState: IServerSideSelectionState|IServerSideGroupSelectionState|null;
	sortState: { colId: string, sort: SortDirection|undefined }[];
	activeSelectedRowIndex: number;
	lastVisibleRowIndex: number;
	latestRowCount: number;
}


export const serverSideTables: ServerSideTables = $state({});

export const serverSideTableKey = btoa("/(app)/prodej/zakaznici");
