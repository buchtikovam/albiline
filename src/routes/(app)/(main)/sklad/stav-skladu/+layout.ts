import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
import type {LayoutLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/$types";


export const load: LayoutLoad = async () => {
	currentPageKey.value = "ProductStockInventory";

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "clientSide",
			requiredFields: ["productId"],
			identificationKey: "productId",
			defaultColState: [],
			setColStateToDefault: false,
			createdTableData: [],
			editedTableData: [],
			deletedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			fulltextFilterValue: "",
			openInputParams: true,
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			recentFilters: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			areInputParamsLoading: false,
			hasInputParams: false,
			loadedInputParams: {},
			showRefreshDataButton: false,
		}
	}
};
