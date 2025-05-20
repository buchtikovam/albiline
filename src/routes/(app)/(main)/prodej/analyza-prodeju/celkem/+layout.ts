import {agGridTables, currentPageKey} from "$lib/runes/table.svelte.js";
import type {LayoutLoad} from "../../../../../../../.svelte-kit/types/src/routes/(app)/$types";


export const load: LayoutLoad = async () => {
	currentPageKey.value = "SalesTotalByDivision";

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "clientSide",
			requiredFields: ["id"],
			identificationKey: "id",
			defaultColState: [],
			setColStateToDefault: false,
			createdTableData: [],
			editedTableData: [],
			deletedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			openInputParams: false,
			fulltextFilterValue: "",
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			recentFilters: [],
			areInputParamsLoading: false,
			hasInputParams: false,
			loadedInputParams: {},
			showRefreshDataButton: false,
		}
	}
};
