import type {ColumnState, FilterModel, IServerSideGetRowsRequest} from "ag-grid-enterprise";
import type {StoredPresets} from "$lib/types/components/table/presets";
import type {
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
	[pageKey: string]: AgGridTableType;
}


export interface AgGridTableType {
	url?: string;
	// used in inputParams after submit
	type: "serverSide" | "clientSide";
	// used for identifying cross tables records on the api
	requiredFields: string[];
	// main table id
	identificationKey: string;
	// for restoring default table settings and layout
	defaultColState: ColumnState[];
	// used when setting default colDef - preset
	setColStateToDefault: boolean;
	// created by applying transactions
	createdTableData?: any[];
	// used for disabling tabs and saving edits
	editedTableData: any[];
	// array of required fields and values
	deletedTableData?: any[];
	// current filters used in table. Can be saved through ribbon
	filtersToSave: FilterModel;
	// value to used for fulltext filtering
	fulltextFilterValue: string;
	// used to set filters after user chose filter from ribbon -> my filters
	selectedFilters?: StoredFilters;
	// current presets in the table
	presetToSave: ColumnState[];
	// used to set presets after user chose preset from ribbon -> my presets
	selectedPreset?: StoredPresets;
	// selected preset completed by default col defs
	selectedPresetFull?: StoredPresets;
	// current selected table rows
	selectedRows: Record<string, any>[];
	// ag grid selection state, runs in combination with selectedRows
	selectionState: IServerSideSelectionState | IServerSideGroupSelectionState;
	// current sort state of table
	sortState: { colId: string; sort?: SortDirection }[];
	// used in details for navigation between selected rows
	activeSelectedRowIndex: number;
	// last loaded and visible row id in table. Used to set scroll position
	lastVisibleRowIndex: number;
	// keeps track of how many rows data set contains. Used for setting scrollbar height
	latestRowCount?: number;
	// used for table waiting before data is cached. When response ok, then ag grid registers datasource
	areInputParamsLoading: boolean;
	// whether or not show input params dialog
	hasInputParams: boolean;
	// used to fetch data limited by user input params
	loadedInputParams: InputParamsType;
	// test
	openInputParams: boolean
	// refresh button for reloading data when unloaded column visible
	showRefreshDataButton: boolean;
	//
	recentFilters: FilterModel[]
	//
	necessaryDataColumns: string[];
}


export type ColumnOrder = ColId[]


type ColId = {
	colId: string|undefined;
}
