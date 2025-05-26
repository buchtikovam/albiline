import {agGridTables, currentPageKey} from "$lib/runes/table.svelte.js";
import type {LayoutLoad} from "../../../../../../../.svelte-kit/types/src/routes/(app)/$types";


export const load: LayoutLoad = async () => {
	currentPageKey.value = "SalesTotalByDivision";

	if (!agGridTables.value[currentPageKey.value]) {
		agGridTables.value[currentPageKey.value] = {
			type: "clientSide",
			requiredFields: ["itemId"],
			identificationKey: "itemId",
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
			necessaryDataColumns: [
				"basePrice_CZ_LY",
				"basePrice_CZ_AY",
				"basePrice_CZ_Wholesale_LY",
				"basePrice_CZ_Wholesale_AY",
				"basePrice_CZ_Eshop_LY",
				"basePrice_CZ_Eshop_AY",
				"basePrice_CZ_Retail_LY",
				"basePrice_CZ_Retail_AY",
				"basePrice_CZ_RetailBakery_LY",
				"basePrice_CZ_RetailBakery_AY",
				"basePrice_CZ_EshopKinoko_LY",
				"basePrice_CZ_EshopKinoko_AY",
				"basePrice_CZ_RetailKinoko_LY",
				"basePrice_CZ_RetailKinoko_AY",
				"basePrice_SK_LY",
				"basePrice_SK_AY",
				"basePrice_SK_Wholesale_LY",
				"basePrice_SK_Wholesale_AY",
				"basePrice_SK_Eshop_LY",
				"basePrice_SK_Eshop_AY",
				"basePrice_SK_Retail_LY",
				"basePrice_SK_Retail_AY",
				"basePrice_PL_LY",
				"basePrice_PL_AY",
				"basePrice_PL_Wholesale_LY",
				"basePrice_PL_Wholesale_AY",
				"basePrice_PL_Eshop_LY",
				"basePrice_PL_Eshop_AY",
				"basePrice_CZ_Export_LY",
				"basePrice_CZ_Export_AY",
				"sales_Wholesale_LY",
				"sales_Wholesale_AY",
				"sales_Eshop_LY",
				"sales_Eshop_AY",
				"sales_Retail_LY",
				"sales_Retail_AY",
				"sales_WholesaleExport_LY",
				"sales_WholesaleExport_AY",
				"sales_RetailBakery_LY",
				"sales_RetailBakery_AY",
				"sales_Kinoko_LY",
				"sales_Kinoko_AY"
			]
		}
	}
};
