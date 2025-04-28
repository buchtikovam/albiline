// api will keep track of input params, creating a smaller data set for
// server side tables.
import { apiServicePostHandled } from '$lib/api/apiService.svelte';
import type { InputParamsType } from '$lib/types/components/input-params/inputParams';
import type { AgGridCSTableType, AgGridSSTableType } from '$lib/types/components/table/table';
import { getColumnFilters } from './getColumnFilters';
import deepcopy from "deepcopy";


export async function loadInputParamsInTable(
	table: AgGridCSTableType|AgGridSSTableType,
	inputParams: InputParamsType,
	type: "clientSide"|"serverSide"
) {
	let columnList: string[] = [];

	// TODO: issue here - not providing required fields -> extend table type
	// if (Object.keys(table.presetToSave).length > 0) {
	// 	table.presetToSave.forEach(preset => {
	// 		if (!preset.hide && !preset.colId.includes("ag-Grid")) {
	// 			columnList.push(preset.colId)
	// 		}
	// 	})
	// } else {
	// 	table.defaultColState.forEach(preset => {
	// 		if (!preset.hide && !preset.colId.includes("ag-Grid")) {
	// 			columnList.push(preset.colId)
	// 		}
	// 	})
	// }



	table.areInputParamsLoading = true;
	table.hasInputParams = true;
	table.selectedRows = [];
	table.selectionState = null;
	table.lastVisibleRowIndex = 0;
	table.sortState = [];
	table.filtersToSave = {};
	table.loadedInputParams = {
		fulltext: inputParams.fulltext,
		inputs: inputParams.inputs,
		columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
		// columnList: columnList,
	}

	if (type === "clientSide") {
		table.areInputParamsLoading = false;
	}


	if (type === "serverSide") {
		const response = await apiServicePostHandled(
			"cachedPageData",
			{
				fulltext: inputParams.fulltext,
				inputs: inputParams.inputs,
				columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
				columnList: columnList,
			}
		)

		if (response.success) {
			table.areInputParamsLoading = false;
		}
	}
}
