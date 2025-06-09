import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: [
			"SalesTotalByStore",
			"SalesTotalByStoreDetail",
			"SalesSubdetailByCostlevel"
		],
		index: 0,
	}

	if (!agGridTables.value["SalesTotalByStore"]) {
		agGridTables.value["SalesTotalByStore"] = {
			type: "clientSide",
			name: "SalesTotalByStore",
			index: 0,
			gridApi: undefined,
			requiredFields: [],
			identificationKey: "deliveryAddressCode",
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

	if (!agGridTables.value["SalesTotalByStoreDetail"]) {
		agGridTables.value["SalesTotalByStoreDetail"] = {
			type: "clientSide",
			name: "SalesTotalByStoreDetail",
			index: 0,
			gridApi: undefined,
			requiredFields: [],
			identificationKey: "divisionId",
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

	if (!agGridTables.value["SalesSubdetailByCostlevel"]) {
		agGridTables.value["SalesSubdetailByCostlevel"] = {
			type: "clientSide",
			name: "SalesSubdetailByCostlevel",
			index: 0,
			gridApi: undefined,
			requiredFields: [],
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
