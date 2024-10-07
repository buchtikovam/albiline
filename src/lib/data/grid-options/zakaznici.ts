import { presetStore } from "$lib/stores/tableStore"
import { addToEditedData } from "$lib/utils/addToEditedData"
import { AG_GRID_LOCALE_CZ } from "@ag-grid-community/locale/cs-CZ.js"
import type { GridOptions } from "ag-grid-enterprise"

export const gridOptions: GridOptions = { // return from grid options 
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: true,
			minWidth: 100,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
		},	

		onCellValueChanged: (event) => {
			addToEditedData(event.data, event.column.getColId(), event.newValue)
		},

		onColumnResized: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		onColumnMoved: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		onColumnVisible: () => {
			presetStore.set(gridApi.getColumnDefs() || [])
		},

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.rowNumber); 
		},

		onRowSelected: (event) => {
			console.log(event.data.customerAddressCode);

			selectedRowIdStore.set(event.data.customerAddressCode)
		},

		columnDefs: columnDefinitions,
		debug: true,
		suppressExcelExport: true,
		suppressCsvExport: true,
		maintainColumnOrder: true, 
		enableCellTextSelection: true,
		ensureDomOrder: true,
		suppressRowClickSelection: true,
		rowModelType: "serverSide",
		rowSelection: "multiple",
		rowBuffer: 1,
		cacheBlockSize: 100,
	}