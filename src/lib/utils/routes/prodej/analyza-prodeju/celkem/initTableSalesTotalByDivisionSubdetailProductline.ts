import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesTotalByDivisionSubdetailProductline(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesTotalByDivisionSubdetailProductline",
		requiredFields: ["itemId"],
		identificationKey: "itemId",
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
			"basePrice_CZ_Export_AY"
		],
		...getAgGridTableFields(),
	}
}
