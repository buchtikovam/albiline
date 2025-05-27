import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/$types";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomdetailByCustomers"],
		index: 0,
	}

	if (!agGridTables.value[pageKeys.value.value[0]]) {
		agGridTables.value[pageKeys.value.value[0]] = {
			type: "clientSide",
			name: "SalesCustomdetailByCustomers",
			index: 0,
			requiredFields: ["customerNodeCode"],
			identificationKey: "customerNodeCode",
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
