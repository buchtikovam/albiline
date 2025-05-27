import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';
import type {IAggFuncParams, IRowNode} from "ag-grid-enterprise";


function getDiff(
	dividendField: string,
	divisorField: string,
	params: IAggFuncParams
) {
	let dividendSum = 0;
	let divisorSum = 0;

	params.api.forEachNode((node: IRowNode) => {
		dividendSum += node.data[dividendField];
		divisorSum += node.data[divisorField];
	});

	if (divisorSum <= 0 && dividendSum > 0) return 1; // 100% growth

	if (divisorSum >= 0 && dividendSum < 0) return -1; // -100% decline

	if (divisorSum === 0 && dividendSum === 0) return 0; // 0% change

	return (dividendSum / divisorSum) - 1;
}


function getDivision(
	dividentField: string,
	divisorField: string,
	params: IAggFuncParams
) {
	let dividentSum = 0;
	let divisorSum = 0;

	params.api.forEachNode((node: IRowNode) => {
		dividentSum += node.data[dividentField];
		divisorSum += node.data[divisorField];
	});

	if (divisorSum !== 0) {
		return dividentSum / divisorSum;
	}

	return 0;
}



export const SalesCustomdetailByCustomersAgGridDef = {
	statusBar: undefined,
	grandTotalRow: "bottom",
	suppressStickyTotalRow: false,

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn(
			"salesCountryCode", // Země
			"text", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"dealerCode", // OZ
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"managerCode", // OM
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"customerNodeCode", // Číslo zákazníka
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"customerNodeName", // Zákazník
			"text", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"quantity_AY", // Kusů letos
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"quantity_Diff", // %
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("quantity_AY", "quantity_LY", params);
				},
			}
		),

		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnQuantity_LY", // Vráceno ks vloni
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),

				getAgColumn(
					"returnQuantity_AY", // Vráceno ks letos
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),
			]
		},



		getAgColumn(
			"salesPerItem_LY", // Prodej/kus vloni
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDivision("quantity_LY", "sales_LY", params);
				},
			}
		),

		getAgColumn(
			"salesPerItem_AY", // Prodej/kus letos
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDivision("quantity_AY", "sales_AY", params);
				},
			}
		),

		getAgColumn(
			"salesPerItem_Diff", // %
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"sales_LY", // Prodej vloni
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"sales_AY", // Prodej letos
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"sales_DiffAbs", // Nárůst
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"sales_Diff", // %
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("sales_AY", "sales_LY", params);
				},
			}
		),

		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnSales_LY", // Dobropisy vloni
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),
				getAgColumn(
					"returnSales_AY", // Dobropisy letos
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),
			]
		},

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),
		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: "sum",
			}
		),

		getAgColumn(
			"basePrice_Diff", // %
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("basePrice_AY", "basePrice_LY", params);
				},
			}
		),

		{
			field: "group_slevy", // Vratky
			children: [
				getAgColumn(
					"discount_LY", // Sleva vloni
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),

				getAgColumn(
					"discount_AY", // Sleva letos
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: "sum",
					}
				),

				getAgColumn(
					"discount_Diff", // %
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("discount_AY", "discount_LY", params);
						},
					}
				),

				getAgColumn(
					"discountPct_LY", // % slevy vloni
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: (params: IAggFuncParams) => { // todo
							// return getDivision("quantity_AY", "sales_AY", params);
						},
					}
				),

				getAgColumn(
					"discountPct_AY", // % slevy letos
					"number", 100,
					false, false, false,
					[],
					{
						aggFunc: (params: IAggFuncParams) => { // todo
							// return getDivision("quantity_AY", "sales_AY", params);
						},
					}
				),
			]
		},

		getAgColumn(
			"computedColumn1", // % z obratu vloni
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => { // todo
					// return getDivision("quantity_AY", "sales_AY", params);
				},
			}
		),
		getAgColumn(
			"computedColumn2", // % z obratu letos
			"number", 100,
			false, false, false,
			[],
			{
				aggFunc: (params: IAggFuncParams) => { // todo
					// return getDivision("quantity_AY", "sales_AY", params);
				},
			}
		),

		getAgColumn(
			"currency", // Měna // todo hidden ?
			"text", 100,
			false, true, false,
			[],
		)
	]
}


export const SalesCustomdetailByCustomersHeaderTranslations = {
	salesCountryCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesCountryCode,
	dealerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_dealerCode,
	managerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_managerCode,
	customerNodeCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_customerNodeCode,
	customerNodeName: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_customerNodeName,
	quantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_LY,
	quantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_AY,
	quantity_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_Diff,
	returnQuantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnQuantity_LY,
	returnQuantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnQuantity_AY,
	salesPerItem_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_LY,
	salesPerItem_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_AY,
	salesPerItem_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_Diff,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_Diff,
	returnSales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnSales_LY,
	returnSales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnSales_AY,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_Diff,
	discount_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_LY,
	discount_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_AY,
	discount_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_Diff,
	discountPct_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discountPct_LY,
	discountPct_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discountPct_AY,
	computedColumn1: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn1,
	computedColumn2: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn2,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_currency,
	group_vratky: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_vratky,
	group_slevy: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_slevy
};
