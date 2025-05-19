import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
import type {GridApi} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import {disableNavigation} from "$lib/runes/navigation.svelte.js";

export function mountSSGrid(
	gridApi: GridApi,
	table: AgGridTableType,
	headerTranslations: Record<string, () => string>
) {
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
		})
	}
}


export function unmountSSGrid(gridApi: GridApi, table: AgGridTableType) {
	if (gridApi) {
		table.selectionState = gridApi.getServerSideSelectionState() || {
			toggledNodes: [],
			selectAll: false
		};
	}

	// Update selectedRows persistence with null checks
	if (table.selectionState?.toggledNodes) {
		const rows: Record<string, unknown>[] = [];

		table.selectionState.toggledNodes.forEach((rowNumber) => {
			const row = gridApi.getDisplayedRowAtIndex(Number(rowNumber) - 1);

			if (row?.data) {
				const rowObj: Record<string, unknown> = {};
				table.requiredFields?.forEach((field) => {
					rowObj[field] = row.data?.[field] ?? null;
				});
				rows.push(rowObj);
			}
		});

		table.selectedRows = rows;
	}

	table.filtersToSave = gridApi.getFilterModel();
	table.lastVisibleRowIndex = gridApi.getFirstDisplayedRowIndex();
	table.presetToSave = gridApi.getColumnState() || [];
	table.activeSelectedRowIndex = 0;
	disableNavigation.value = false;


	setTimeout(() => {
		gridApi.destroy();
	}, 100)
}
