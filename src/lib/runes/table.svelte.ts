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


// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export interface ServerSideTable {
	// for restoring default table settings and layout
	defaultColDef: (ColDef<unknown, any> | ColGroupDef<unknown>)[];
	// used when setting default colDef - preset
	setColDefToDefault: boolean;
	// used for disabling tabs and saving edits
	editedTableData: any[];
	// current filters used in table. Can be saved through ribbon
	filtersToSave: FilterModel;
	// used to set filters after user chose filter from ribbon -> my filters
	selectedFilters: FilterModel;
	// current presets in the table
	presetToSave: Preset[];
	// used to set presets after user chose preset from ribbon -> my presets
	selectedPreset: Preset[];
	// current selected table rows
	selectedRows: Record<string, any>[];
	// ag grid selection state, runs in combination with selectedRows
	selectionState: IServerSideSelectionState|IServerSideGroupSelectionState|null;
	// current sort state of table
	sortState: { colId: string, sort: SortDirection|undefined }[];
	// used in details for navigation between selected rows
	activeSelectedRowIndex: number;
	// last loaded and visible row id in table. Used to set scroll position
	lastVisibleRowIndex: number;
	// keeps track of how many rows data set contains. Used for setting scrollbar height
	latestRowCount: number;
}


export const serverSideTables: ServerSideTables = $state({});
