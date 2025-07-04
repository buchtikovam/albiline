import {apiServicePostHandled} from '$lib/api/apiService.svelte';
import {getColumnFilters} from './getColumnFilters';
import deepcopy from "deepcopy";
import type {PageMetaDataInputs} from "$lib/types/routes/pageSettings";
import type {InputParamsType} from '$lib/types/components/input-params/inputParams';
import type {AgGridTableType} from '$lib/types/components/table/table';



export async function loadInputParamsInTable(
	table: AgGridTableType,
	inputParams: InputParamsType,
	type: "clientSide"|"serverSide",
	restrictions: PageMetaDataInputs
) {
	table.latestRowCount = 0;
	table.lastVisibleRowIndex = 0;
	table.areInputParamsLoading = true;
	table.hasInputParams = true;
	table.selectionState = { selectAll: false, toggledNodes: [] };
	table.selectedRows = [];
	table.openInputParams = false;
	table.loadedInputParams = {
		fulltext: restrictions.fulltextEnabled
			? inputParams.fulltext
			: "",
		inputs: inputParams.inputs,
		columnFilters: restrictions.columnFiltersEnabled
			? getColumnFilters(deepcopy(inputParams.columnFilters))
			: [],
	}



	if (type === "serverSide") {
		let columnList: string[] = deepcopy(table.requiredFields);

		// get column list for server side table
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

		if (table.necessaryDataColumns) {
			columnList = columnList.concat(table.necessaryDataColumns);
		}

		// cache table on the api
		const response = await apiServicePostHandled(
			"cachedPageData",
			{
				fulltext: restrictions.fulltextEnabled
					? inputParams.fulltext
					: "",
				inputs: inputParams.inputs,
				columnFilters: restrictions.columnFiltersEnabled
					? getColumnFilters(deepcopy(inputParams.columnFilters))
					: [],
				columnList: columnList,
			}
		)

		if (response) {
			if (response.success) table.areInputParamsLoading = false;
		}
	}
}
