import type {FilterModel, IServerSideGetRowsRequest} from "ag-grid-enterprise";
import type {Preset} from "$lib/types/components/table/presets";
import type {
	ColDef,
	ColGroupDef,
	IServerSideGroupSelectionState,
	IServerSideSelectionState,
	SortDirection
} from "ag-grid-community";
import type {StoredFilters} from "$lib/types/components/table/filters";



export interface TableRowRequest extends IServerSideGetRowsRequest {
	fulltext?: string,
	lastRow?: number | null,
	rowBatchSize?: number
}


export interface ServerSideTables {
	[pageKey: string]: ServerSideTable
}


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
	selectedFilters: StoredFilters | {};
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



export type ColumnOrder = ColId[]

type ColId = {
	colId: string
}
