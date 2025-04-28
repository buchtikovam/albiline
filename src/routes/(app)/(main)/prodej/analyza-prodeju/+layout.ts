import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
import type {LayoutLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/$types";


export const load: LayoutLoad = async () => {
	currentPageKey.value = "SalesAnalytics";

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "clientSide",
			defaultColState: [],
			setColStateToDefault: false,
			createdTableData: [],
			editedTableData: [],
			deletedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			fulltextFilterValue: "",
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			areInputParamsLoading: false,
			hasInputParams: false,
			loadedInputParams: {}
		}
	}
};
