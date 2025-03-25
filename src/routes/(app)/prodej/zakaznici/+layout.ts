import type {LayoutLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/$types";
import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";

export const load: LayoutLoad = async () => {
	currentPageKey.value = "CustomersGetList";

	console.log("yyyay")

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "serverSide",
			defaultColDef: [],
			setColDefToDefault: false,
			editedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			fulltextFilterValue: "",
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			latestRowCount: 100,
			areInputParamsLoading: false,
			hasInputParams: false,
		}
	}
};
