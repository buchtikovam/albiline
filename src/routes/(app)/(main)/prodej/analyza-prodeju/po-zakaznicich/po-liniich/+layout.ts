import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/$types";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductline"],
		index: 0,
	}

	// table for /prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp


	if (!agGridTables.value["SalesCustomerorstoreByProductlineByCostlevel"]) {
		agGridTables.value["SalesCustomerorstoreByProductlineByCostlevel"] = {
			type: "clientSide",
			name: "SalesCustomerorstoreByProductlineByCostlevel",
			index: 0,
			gridApi: undefined,
			requiredFields: ["costLevelCode"],
			identificationKey: "costLevelCode",
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
			necessaryDataColumns: [],
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
