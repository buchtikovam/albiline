import type {FilterModel, IServerSideGetRowsRequest} from "ag-grid-enterprise";
import type {Preset, StoredPreset, StoredPresets} from "$lib/types/components/table/presets";
import type {
	ColDef,
	ColGroupDef,
	IServerSideGroupSelectionState,
	IServerSideSelectionState,
	SortDirection
} from "ag-grid-community";
import type {StoredFilters} from "$lib/types/components/table/filters";
import type {InputParamsType} from "$lib/types/components/input-params/inputParams";



export interface TableRowRequest extends IServerSideGetRowsRequest {
	fulltext?: string,
	lastRow?: number | null,
	rowBatchSize?: number
}


export interface AgGridTables {
	[pageKey: string]: AgGridSSTableType|AgGridCSTableType;
}



export interface AgGridSSTableType {
	type: "serverSide";
	// for restoring default table settings and layout
	defaultColDef: (ColDef<unknown, any> | ColGroupDef<unknown>)[];
	// used when setting default colDef - preset
	setColDefToDefault: boolean;
	// used for disabling tabs and saving edits
	editedTableData: any[];
	// current filters used in table. Can be saved through ribbon
	filtersToSave: FilterModel;
	// used to set filters after user chose filter from ribbon -> my filters
	selectedFilters?: StoredFilters;
	// current presets in the table
	presetToSave: ColDef[]|ColGroupDef[];
	// used to set presets after user chose preset from ribbon -> my presets
	selectedPreset?: StoredPresets;
	// selected preset completed by default col defs
	selectedPresetFull?: StoredPresets;
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
	// used for table waiting before data is cached. When response ok, then ag grid registers datasource
	areInputParamsLoading: boolean;
	// whether or not show input params dialog
	hasInputParams: boolean;
}


export interface AgGridCSTableType {
	type: "clientSide";
	// for restoring default table settings and layout
	defaultColDef: (ColDef<unknown, any> | ColGroupDef<unknown>)[];
	// used when setting default colDef - preset
	setColDefToDefault: boolean;
	// used for disabling tabs and saving edits
	editedTableData: any[];
	// current filters used in table. Can be saved through ribbon
	filtersToSave: FilterModel;
	// used to set filters after user chose filter from ribbon -> my filters
	selectedFilters?: StoredFilters;
	// current presets in the table
	presetToSave: ColDef[]|ColGroupDef[];
	// used to set presets after user chose preset from ribbon -> my presets
	selectedPreset?: StoredPresets;
	// selected preset completed by default col defs
	selectedPresetFull?: StoredPresets;
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
	// used for table waiting before data is cached. When response ok, then ag grid registers datasource
	areInputParamsLoading: boolean;
	// whether or not show input params dialog
	hasInputParams: boolean;

	loadedInputParams?: InputParamsType
}


export type ColumnOrder = ColId[]

type ColId = {
	colId: string
}
