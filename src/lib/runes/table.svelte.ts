import type {AgGridTables} from "$lib/types/components/table/table";


// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export const agGridTables: AgGridTables = $state({
	"CustomersGetList" : {
		defaultColDef: [],
		setColDefToDefault: false,
		editedTableData: [],
		filtersToSave: {},
		presetToSave: [],
		selectedRows: [],
		selectionState: { selectAll: false, toggledNodes: [] },
		sortState: [],
		activeSelectedRowIndex: 0,
		lastVisibleRowIndex: 0,
		latestRowCount: 100,
		areInputParamsLoading: false,
		hasInputParams: false,
	},
	"ProductStockInventory" : {
		defaultColDef: [],
		setColDefToDefault: false,
		editedTableData: [],
		filtersToSave: {},
		presetToSave: [],
		selectedRows: [],
		selectionState: { selectAll: false, toggledNodes: [] },
		sortState: [],
		activeSelectedRowIndex: 0,
		lastVisibleRowIndex: 0,
		latestRowCount: 100,
		areInputParamsLoading: false,
		hasInputParams: false,
	}
});

export const currentPageKey: { value: string } = $state({ value: ""})
