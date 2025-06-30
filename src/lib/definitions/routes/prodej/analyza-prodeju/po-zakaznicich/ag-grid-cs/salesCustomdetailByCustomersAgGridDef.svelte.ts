import {
	totalDivisionAggregator
} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionAggregator";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';
import type {
	GridOptions, IAggFuncParams,
	ValueFormatterParams,
	ValueGetterParams
} from "ag-grid-enterprise";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import {
	totalDivisionPercentageAggregator,
} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionPercentageAggregator";
import {totalGenericDivisionPercentageAggregator} from '$lib/utils/components/ag-grid/agg-functions/aggregators/totalGenericDivisionPercentageAggregator';
import {totalAvgDivisionPercentageAggregator} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalAvgDivisionPercentageAggregator";
import {getSumAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getSumAggObj";
import {getTotalDivisionPercentageAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionPercentageAggObj";
import {getTotalDivisionAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionAggObj";
import {getTotalAvgDivisionPercentageAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalAvgDivisionPercentageAggObj";
import {getTotalGenericDivisionPercentageAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalGenericDivisionPercentageAggObj";
import {getContext} from "svelte";



export const SalesCustomdetailByCustomersAgGridDefSvelte: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	aggFuncs: {
		'totalDivisionPercentageAgg': totalDivisionPercentageAggregator,
		'totalDivisionAgg': totalDivisionAggregator,
		'totalGenericDivisionPercentageAgg': totalGenericDivisionPercentageAggregator,
		'totalAvgDivisionPercentageAgg': totalAvgDivisionPercentageAggregator,
	},

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn( // % z obratu letos
			"_computedColumn1", "number", 90,
			false, false, false, ["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					console.log("agg", params.context)
					return 2
				},
				valueGetter: (params: ValueGetterParams) => {
					const totalSalesLY = params.context?.totalSalesLY;

					if (!params.data || typeof params.data.sales_LY !== 'number' || typeof totalSalesLY !== 'number') {
						return null;
					}

					const currentRowSalesLY: number = params.data.sales_LY;

					if (totalSalesLY === 0) {
						return currentRowSalesLY === 1;
					}

					return currentRowSalesLY / totalSalesLY;
				},
				valueFormatter: (params: ValueFormatterParams) => formatPercentage(params.value, 0),
			}
		),

		getAgColumn( // % z obratu vloni
			"_computedColumn2", "number", 90,
			false, false, false, ["text-right", "computed2"],
			{
				aggFunc: "sum",
				valueGetter: (params: ValueGetterParams) => {
					const totalSalesAY = params.context?.totalSalesAY;

					if (!params.data || typeof params.data.sales_AY !== 'number' || typeof totalSalesAY !== 'number') {
						return null;
					}

					const currentRowSalesAY: number = params.data.sales_AY;

					if (totalSalesAY === 0) {
						return null;
					}

					return currentRowSalesAY / totalSalesAY;
				},
				valueFormatter: (params: ValueFormatterParams) => formatPercentage(params.value, 0),
			}
		),

		getAgColumn(
			"salesCountryCode", // Země
			"text", 65,
			false, false, false,
			[],
		),

		getAgColumn(
			"dealerCode", // OZ
			"number", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"managerCode", // OM
			"number", 60,
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
			"text", 200,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 80,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"quantity_AY", // Kusů letos
			"number", 80,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"quantity_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.quantity_AY,
							divisor: params.data.quantity_LY,
							originalValue: params.data.quantity_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),


		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[],
		),


		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnQuantity_LY", // Vráceno ks vloni
					"number", 80,
					false, true, false,
					["text-right", "text-red-700"],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					"returnQuantity_AY", // Vráceno ks letos
					"number", 80,
					false, true, false,
					["text-right", "text-red-700"],
					{ ...getSumAggObj() }
				),
			]
		},



		getAgColumn(
			"salesPerItem_LY", // Prodej/kus vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					// console.log(params)


					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_LY,
							divisor: params.data.quantity_LY,
							originalValue: params.data.salesPerItem_LY,
						};
					}
					return null;
				},
				...getTotalDivisionAggObj(true),
			}
		),

		getAgColumn(
			"salesPerItem_AY", // Prodej/kus letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_AY,
							divisor: params.data.quantity_AY,
							originalValue: params.data.salesPerItem_AY,
						};
					}

					console.log(params)
					return null;
				},
				...getTotalDivisionAggObj(true),
			}
		),

		getAgColumn( // %
			"salesPerItem_Diff", "number", 70,
			false, false, false, ["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							currentPeriodSale: params.data.sales_AY,
							currentPeriodQuantity: params.data.quantity_AY,
							previousPeriodSale: params.data.sales_LY,
							previousPeriodQuantity: params.data.quantity_LY,
							originalValue: params.data.salesPerItem_Diff
						};
					}
					return null;
				},
				...getTotalAvgDivisionPercentageAggObj(),
			}
		),

		getAgColumn( // Prodej vloni
			"sales_LY", "number", 100,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"sales_AY", // Prodej letos
			"number", 100,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"sales_DiffAbs", // Nárůst
			"number", 100,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"sales_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_AY,
							divisor: params.data.sales_LY,
							originalValue: params.data.sales_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),

		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnSales_LY", // Dobropisy vloni
					"number", 90,
					false, true, false,
					["text-right", "text-red-700"],
					{ ...getSumAggObj() }
				),
				getAgColumn(
					"returnSales_AY", // Dobropisy letos
					"number", 90,
					false, true, false,
					["text-right", "text-red-700"],
					{ ...getSumAggObj() }
				),
			]
		},

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 90,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 90,
			false, false, false,
			["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			"basePrice_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.basePrice_AY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.basePrice_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),

		{
			field: "group_slevy", // Slevy
			children: [
				getAgColumn(
					"discount_LY", // Sleva vloni
					"number", 90,
					false, false, false,
					["text-right"],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					"discount_AY", // Sleva letos
					"number", 90,
					false, false, false,
					["text-right"],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					"discount_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.discount_AY,
									divisor: params.data.discount_LY,
									originalValue: params.data.discount_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj(),
					}
				),

				getAgColumn(
					"discountPct_LY", // % slevy vloni
					"number", 80,
					false, false, false,
					["text-right"],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_LY,
									divisor: params.data.basePrice_LY,
									originalValue: params.data.discountPct_LY,
								};
							}
							return null;
						},
						...getTotalGenericDivisionPercentageAggObj(),
					}
				),

				getAgColumn(
					"discountPct_AY", // % slevy letos
					"number", 80,
					false, false, false,
					["text-right"],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_AY,
									divisor: params.data.basePrice_AY,
									originalValue: params.data.discountPct_AY,
								};
							}
							return null;
						},
						...getTotalGenericDivisionPercentageAggObj(),
					}
				),
			]
		},




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
	_computedColumn1: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn1,
	_computedColumn2: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn2,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_currency,
	group_vratky: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_vratky,
	group_slevy: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_slevy
};
