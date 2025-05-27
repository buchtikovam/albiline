import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import type {IAggFuncParams, ValueFormatterParams} from "ag-grid-enterprise";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import * as m from "$lib/paraglide/messages";

export const SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef = {
	statusBar: undefined,

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn(
			"itemId", // Linie
			"number", 65,
			false, false, false,
			[],
		),

		getAgColumn(
			"itemName", // Název linie
			"text", 170,
			false, false, false,
			[],
		),

		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[],
		),

		getAgColumn(
			"sales_LY", // Celkem vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_AY", // Celkem letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"salesDiff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		{
			field: "group_cz", // CZ
			children: [
				getAgColumn(
					"sales_CZ_LY", // Celkem vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_AY", // Celkem letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Wholesale_LY", // VO vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Wholesale_AY", // VO letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Eshop_LY", // CZ eShop vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Eshop_AY", // CZ eShop letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Retail_LY", // CZ prodejny vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Retail_AY", // CZ prodejny letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Retail_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_bakery", // Pekárny
			children: [
				getAgColumn(
					"sales_CZ_RetailBakery_LY", // Vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailBakery_AY", // Letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailBakery_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_kinoko", // Kinoko
			children: [
				getAgColumn(
					"sales_CZ_EshopKinoko_LY", // eShop vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_EshopKinoko_AY", // eShop letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_EshopKinoko_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_LY", // MO vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_AY", // MO letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_sk", // SK
			children: [
				getAgColumn(
					"sales_SK_LY", // SK celkem vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_AY", // SK celkem letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_LY_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Wholesale_LY", // SK VO vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_Wholesale_AY", // SK VO letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}

				),

				getAgColumn(
					"sales_SK_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Eshop_LY", // SK eShop vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_Eshop_AY", // SK eShop letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Retail_LY", // SK prodejny vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_Retail_AY", // SK prodejny letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_SK_Retail_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_pl", // PL
			children: [
				getAgColumn(
					"sales_PL_LY", // PL celkem vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_AY", // PL celkem letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_PL_Wholesale_LY", // PL VO vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_Wholesale_AY", // PL VO letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_PL_Eshop_LY", // PL eShop vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_Eshop_AY", // PL eShop letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_PL_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_export", // Export
			children: [
				getAgColumn(
					"sales_CZ_Export_LY", // Export celkem vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Export_AY", // Export celkem letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Export_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},
	]
}


export const SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations = {
	itemId: () => "KLP",
	itemName: () => "Název KLP",
	currency: () => "Jedn.",
	sales_LY: m.routes_prodej_analyza_prodeju_table_column_sales_ly,
	sales_AY: m.routes_prodej_analyza_prodeju_table_column_sales_ay,
	salesDiff: m.routes_prodej_analyza_prodeju_table_column_diff,
	group_cz: m.routes_prodej_analyza_prodeju_table_column_group_cz,
	sales_CZ_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_ly,
	sales_CZ_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_ay,
	sales_CZ_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_diff,
	sales_CZ_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_ly,
	sales_CZ_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_ay,
	sales_CZ_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_diff,
	sales_CZ_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_ly,
	sales_CZ_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_ay,
	sales_CZ_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_diff,
	sales_CZ_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_ly,
	sales_CZ_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_ay,
	sales_CZ_Retail_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_diff,
	sales_CZ_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_ly,
	sales_CZ_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_ay,
	sales_CZ_RetailBakery_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_diff,
	sales_CZ_EshopKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_ly,
	sales_CZ_EshopKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_ay,
	sales_CZ_EshopKinoko_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_diff,
	sales_CZ_RetailKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_ly,
	sales_CZ_RetailKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_ay,
	sales_CZ_RetailKinoko_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_diff,
	group_sk: m.routes_prodej_analyza_prodeju_table_column_group_sk,
	sales_SK_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ly,
	sales_SK_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ay,
	sales_SK_LY_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ly_diff,
	sales_SK_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_ly,
	sales_SK_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_ay,
	sales_SK_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_diff,
	sales_SK_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_ly,
	sales_SK_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_ay,
	sales_SK_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_diff,
	sales_SK_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_ly,
	sales_SK_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_ay,
	sales_SK_Retail_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_diff,
	group_pl: m.routes_prodej_analyza_prodeju_table_column_group_pl,
	sales_PL_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_ly,
	sales_PL_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_ay,
	sales_PL_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_diff,
	sales_PL_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_ly,
	sales_PL_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_ay,
	sales_PL_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_diff,
	sales_PL_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_ly,
	sales_PL_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_ay,
	sales_PL_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_diff,
	group_export: m.routes_prodej_analyza_prodeju_table_column_group_export,
	sales_CZ_Export_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_ly,
	sales_CZ_Export_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_ay,
	sales_CZ_Export_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_diff,
}
