import type {LayoutLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/$types";
import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";


export const load: LayoutLoad = async () => {
	currentPageKey.value = "ProductStockInventory";

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "clientSide",
			defaultColDef: [],
			setColDefToDefault: false,
			createdTableData: [],
			editedTableData: [],
			deletedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			areInputParamsLoading: false,
			hasInputParams: false,
		}
	}
};
