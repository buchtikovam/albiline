import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";
import type {AgGridTableType} from "$lib/types/components/table/table";

export function initTableSalesTotalByStore(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesTotalByStore",
		identificationKey: "deliveryAddressCode",
		requiredFields: [],
		necessaryDataColumns: [
			"sales_89_LY",
			"sales_89_AY",
			"sales_89_DiffAbs",
			"sales_89_Diff",
			"sales_90_LY",
			"sales_90_AY",
			"sales_90_DiffAbs",
			"sales_90_Diff",
			"sales_97_LY",
			"sales_97_AY",
			"sales_97_DiffAbs",
			"sales_97_Diff",
			"sales_99_LY",
			"sales_99_AY",
			"sales_99_DiffAbs",
			"sales_99_Diff",
			"profit_89_AY",
			"profit_90_AY",
			"profit_97_AY",
			"profit_99_AY",
			"margin_89_AY",
			"margin_90_AY",
			"margin_97_AY",
			"margin_99_AY",
			"sales_3_AY",
			"sales_8_AY",
			"sales_10_AY",
			"sales_6_AY",
			"sales_1_AY",
			"sales_7_AY",
			"sales_0_AY",
			"sales_11_AY",
			"sales_2_AY",
			"sales_5_AY",
			"sales_4_AY",
			"sales_12_AY",
			"sales_13_AY",
			"sales_9_AY",
			"basePrice_LY",
			"basePrice_AY"
		],
		...getAgGridTableFields()
	}
}
