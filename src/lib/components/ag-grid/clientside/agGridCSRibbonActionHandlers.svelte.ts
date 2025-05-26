import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {GridApi} from "ag-grid-enterprise";
import {authDetails} from "$lib/runes/page.svelte";
import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
import {pageKeys} from "$lib/runes/table.svelte";


export function handleRibbonActionCS(
	action: RibbonActionEnum,
	table: AgGridTableType,
	gridApi: GridApi,
	excelFileInput: HTMLInputElement,
)  {
	switch (action) {
		case RibbonActionEnum.LOAD:
			table.openInputParams = true;
			break;

		case RibbonActionEnum.EXPORT_EXCEL_HEADERS:
			gridApi.exportDataAsExcel(getExcelExportOnlyHeadersParams(gridApi));
			break;

		case RibbonActionEnum.EXPORT_EXCEL_DATA:
			// @ts-ignore
			gridApi.exportDataAsExcel(getExcelExportParams(gridApi));
			break;

		case RibbonActionEnum.IMPORT:
			excelFileInput.click();
			break;

		case RibbonActionEnum.FILTER_QUICK:
			handleQuickFilter(gridApi);
			break;

		case RibbonActionEnum.FILTER_UNDO:
			handleFilterUndo(table, gridApi);
			break;

		case RibbonActionEnum.FILTER_REMOVE:
			gridApi.setFilterModel(null);
			break;

		case RibbonActionEnum.MY_FILTERS:
			openedRibbonDialog.value = "ribbon-my-filters";
			break;

		case RibbonActionEnum.SAVE_FILTERS:
			table.filtersToSave = gridApi.getFilterModel();
			openedRibbonDialog.value = "ribbon-save-filters";
			break;

		case RibbonActionEnum.MY_PRESETS:
			openedRibbonDialog.value = "ribbon-my-presets";
			break;

		case RibbonActionEnum.SAVE_PRESET:
			openedRibbonDialog.value = "ribbon-save-preset";
			table.presetToSave = gridApi.getColumnState() || [];
			break;
	}
}


function getExcelExportOnlyHeadersParams(
	gridApi: GridApi,
) {
	const allColumns = gridApi.getAllDisplayedColumns();
	// Exclude the first column
	let columnKeys = allColumns?.map(col => col.getColId());
	columnKeys.splice(0,1);

	return {
		columnKeys: columnKeys,
		skipColumnGroupHeaders: false,
		skipColumnHeaders: false,
		onlySelected: false,
		author: authDetails.userName || "AG Grid",
		shouldRowBeSkipped(): boolean {
			return true;
		},
	}
}


function getExcelExportParams(
	gridApi: GridApi
) {
	const allColumns = gridApi.getAllDisplayedColumns();
	// Exclude the first column
	let columnKeys = allColumns?.map(col => col.getColId());
	columnKeys.splice(0,1);

	return {
		columnKeys: columnKeys,
		skipColumnGroupHeaders: false,
		skipColumnHeaders: false,
		author: authDetails.userName || 'AG Grid',
		exportedRows: 'all',
		freezeRows: 'headers',
		onlySelected: false
	};
}


function handleQuickFilter(
	gridApi: GridApi
) {
	const column = gridApi.getFocusedCell();
	const selection = window.getSelection()?.toString().trim();

	if (column && selection) {
		const cellType = column.column.getColDef().cellDataType;
		let currentFilters = gridApi.getFilterModel();
		let filterModelType;

		if (cellType === "text") filterModelType = "contains";

		if (cellType === "number" || cellType === "date") filterModelType = "equals";

		currentFilters[column.column.getColId()] = {
			filterType: "multi",
			filterModels: [{
				filterType: cellType,
				type: filterModelType,
				filter: selection
			}, null]
		}

		gridApi.setFilterModel(currentFilters);
		gridApi.onFilterChanged();
	}
}


function handleFilterUndo(
	table: AgGridTableType,
	gridApi: GridApi
) {
	table.recentFilters.pop();

	table.recentFilters[table.recentFilters.length - 1]
		? gridApi.setFilterModel(table.recentFilters[table.recentFilters.length - 1])
		: gridApi.setFilterModel(null);
}
