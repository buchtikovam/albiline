// api will keep track of input params, creating a smaller data set for
// server side tables.
import { apiServicePostHandled } from '$lib/api/apiService.svelte';
import type { InputParamsType } from '$lib/types/components/input-params/inputParams';
import type {AgGridTableType} from '$lib/types/components/table/table';
import { getColumnFilters } from './getColumnFilters';
import deepcopy from "deepcopy";


export async function loadInputParamsInTable(
	table: AgGridTableType,
	inputParams: InputParamsType,
	type: "clientSide"|"serverSide"
) {
	const columnList: string[] = deepcopy(table.requiredFields);

	if (Object.keys(table.presetToSave).length > 0) {
		table.presetToSave.forEach(preset => {
			if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
				columnList.push(preset.colId)
			}
		})
	} else {
		table.defaultColState.forEach(preset => {
			if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
				columnList.push(preset.colId)
			}
		})
	}

	table.areInputParamsLoading = true;
	table.hasInputParams = true;
	table.loadedInputParams = {
		fulltext: inputParams.fulltext,
		inputs: inputParams.inputs,
		columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
	}

	if (type === "clientSide") {
		table.areInputParamsLoading = false;
	}


	if (type === "serverSide") {
		console.log(columnList)

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
