import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import * as m from '$lib/paraglide/messages.js';
import type {IAggFuncParams, IRowNode, ValueFormatterParams} from "ag-grid-enterprise";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";
import {formatPercentage} from "$lib/utils/general/formatPercentage";


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



export const SalesCustomerorstoreByProductlineAgGridDef = {
	statusBar: undefined,
	grandTotalRow: "pinnedBottom",
	enableRowPinning: true,

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},


	columnDefs: [
		getAgColumn(
			"divisionName", // Divize
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"productLineName", // Linie
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"quantity_AY", // Kusů letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"quantity_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("quantity_AY", "quantity_LY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_LY", // Prodej vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_AY", // Prodej letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_DiffAbs", // Nárůst
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("sales_AY", "sales_LY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"basePrice_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("basePrice_AY", "basePrice_LY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		getAgColumn(
			"discount_LY", // Sleva vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"discount_AY", // Sleva letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"storageBasePriceCurrency", // Sklad ZC
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"storageQuantity", // Sklad kusů
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),
	]
}


export const SalesCustomersorStoreByProductlineHeaderTranslations = {
	divisionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_divisionName,
	productLineName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_productLineName,
	quantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_quantity_LY,
	quantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_quantity_AY,
	quantity_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_quantity_Diff,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_currency,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_sales_Diff,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_basePrice_Diff,
	discount_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_discount_LY,
	discount_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_discount_AY,
	storageBasePriceCurrency: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_storageBasePriceCurrency,
	storageQuantity: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_storageQuantity
}
