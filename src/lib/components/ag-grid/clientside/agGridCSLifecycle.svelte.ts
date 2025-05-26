import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
import type {GridApi} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";


export function mountCSGrid(
	gridApi: GridApi,
	table: AgGridTableType,
	headerTranslations: Record<string, () => string>
): void {
	if (table) {
		gridApi.setFilterModel(table.filtersToSave);
	}

	table.defaultColState = gridApi.getColumnState();

	gridApi.setGridOption(
		"columnDefs",
		getColumnHeaderTranslations(
			headerTranslations,
			gridApi.getColumnDefs() || []
		)
	);

	if (table.presetToSave.length > 0) {
		gridApi.applyColumnState({
			state: table.presetToSave,
			applyOrder: true,
		});
	}
}


export function unmountCSGrid(table: AgGridTableType, gridApi: GridApi): void {
	table.activeSelectedRowIndex = 0;
	table.createdTableData = [];
	table.deletedTableData = [];
	// table.selectedRows = ;

	gridApi.destroy();
}
