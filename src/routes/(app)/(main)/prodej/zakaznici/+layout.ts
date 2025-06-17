import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type { LayoutLoad } from '../$types';

export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["CustomersGetList"],
		index: 0
	};

	if (!agGridTables.value[pageKeys.value.value[0]]) {
		agGridTables.value[pageKeys.value.value[0]] = {
			url: "customers",
			name: "CustomersGetList",
			index: 0,
			gridApi: undefined,
			type: "serverSide",
			requiredFields: ["customerAddressCode", "customerNodeCode", "i_Name"],
			identificationKey: "rowNumber",
			defaultColState: [],
			setColStateToDefault: false,
			editedTableData: [],
			filtersToSave: {},
			presetToSave: [],
			fulltextFilterValue: "",
			selectedRows: [],
			openInputParams: false,
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			necessaryDataColumns: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			latestRowCount: 100,
			areInputParamsLoading: false,
			hasInputParams: false,
			loadedInputParams: {},
			showRefreshDataButton: false,
			recentFilters: [],
		}
	}
};
