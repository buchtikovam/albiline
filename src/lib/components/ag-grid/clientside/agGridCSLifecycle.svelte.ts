import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
import type {GridApi} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";


export function mountCSGrid(
	gridApi: GridApi,
	table: AgGridTableType,
	headerTranslations: Record<string, () => string>
): void {
	gridApi.setFilterModel(table.filtersToSave);
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


	setTimeout(() => {
		if (table.selectedRows.length > 0) {
			table.selectedRows.forEach((row) => {
				let node = gridApi.getRowNode(String(row[table.identificationKey]));
				node?.setSelected(true)
			});
		}
	}, 800)
}


export function unmountCSGrid(table: AgGridTableType, gridApi: GridApi): void {
	table.activeSelectedRowIndex = 0;
	table.createdTableData = [];
	table.deletedTableData = [];
	console.log(gridApi.getSelectedRows())
	// table.selectedRows = ;

	gridApi.destroy();
}
