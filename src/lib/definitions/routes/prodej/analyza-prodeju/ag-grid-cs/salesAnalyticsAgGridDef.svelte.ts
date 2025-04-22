import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


export const salesAnalyticsAgGridDef: GridOptions = {
	sideBar: {
		toolPanels: [
			"columns",
			"filters",
		],
	},

	suppressDragLeaveHidesColumns: true,

	columnDefs: [
		getAgColumn(
			"itemId", // Divize
			"number", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"itemName", // Název divize
			"text", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"currency", // Měna
			"text", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"sales_LY", // Celkem vloni
			"number", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"sales_AY", // Celkem letos
			"number", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"salesDiff", // % todo: procenta
			"number", 68,
			false, false, false,
			[],
		),

		{
			field: "group_cz", // CZ
			children: [
				getAgColumn(
					"sales_CZ_LY", // Celkem vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_AY", // Celkem letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Wholesale_LY", // VO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Wholesale_AY", // VO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Wholesale_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Eshop_LY", // CZ eShop vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Eshop_AY", // CZ eShop letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Eshop_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_LY", // CZ prodejny vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_AY", // CZ prodejny letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_LY", // CZ prodejny vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_AY", // CZ prodejny letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Retail_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_bakery", // Pekárny
			children: [
				getAgColumn(
					"sales_CZ_RetailBakery_LY", // Vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_RetailBakery_AY", // Letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_RetailBakery_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_kinoko", // Kinoko
			children: [
				getAgColumn(
					"sales_CZ_EshopKinoko_LY", // eShop vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_EshopKinoko_AY", // eShop letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_EshopKinoko_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_LY", // MO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_AY", // MO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_sk", // SK
			children: [
				getAgColumn(
					"sales_SK_LY", // SK celkem vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_AY", // SK celkem letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_LY_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Wholesale_LY", // SK VO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Wholesale_AY", // SK VO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Wholesale_LY_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Eshop_LY", // SK eShop vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Eshop_AY", // SK eShop letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Eshop_LY_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Retail_LY", // SK prodejny vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Retail_AY", // SK prodejny letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_SK_Retail_LY_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_pl", // PL
			children: [
				getAgColumn(
					"sales_PL_LY", // PL celkem vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_AY", // PL celkem letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Wholesale_LY", // PL VO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Wholesale_AY", // PL VO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Wholesale_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Eshop_LY", // PL eShop vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Eshop_AY", // PL eShop letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_PL_Eshop_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_export", // Export
			children: [
				getAgColumn(
					"sales_CZ_Export_LY", // Export celkem vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Export_AY", // Export celkem letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"sales_CZ_Export_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_zc", // ZC
			children: [
				getAgColumn(
					"basePrice_LY", // Celkem vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"basePrice_AY", // Celkem letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"basePrice_Diff", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		getAgColumn(
			"discount_LY", // Celkem sleva vloni
			"number", 68,
			false, false, false,
			[],
		),

		getAgColumn(
			"discount_AY", // Celkem sleva letos
			"number", 68,
			false, false, false,
			[],
		),

		{
			field: "group_cz", // CZ
			children: [
				getAgColumn(
					"discount_CZ_LY", // Celkem sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_AY", // Celkem sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Wholesale_LY", // VO sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Wholesale_AY", // VO sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Eshop_LY", // eShop sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Eshop_AY", // eShop sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Retail_LY", // Prodejny sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Retail_AY", // Prodejny sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			],
		},

		{
			field: "group_bakery", // Pekárny
			children: [
				getAgColumn(
					"discount_CZ_RetailBakery_LY", // Sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_RetailBakery_AY", // Sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_kinoko", // Kinoko
			children: [
				getAgColumn(
					"discount_CZ_EshopKinoko_LY", // eShop sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_EshopKinoko_AY", // eShop sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_RetailKinoko_LY", // MO sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_RetailKinoko_AY", // MO sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_sk", // SK
			children: [
				getAgColumn(
					"discount_SK_LY", // Celkem sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_AY", // Celkem sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Wholesale_LY", // VO sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Wholesale_AY", // VO sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Eshop_LY", // eShop sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Eshop_AY", // eShop sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Retail_LY", // Prodejny sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_SK_Retail_AY", // Prodejny sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			],
		},

		{
			field: "group_pl", // PL
			children: [
				getAgColumn(
					"discount_PL_LY", // Celkem sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_PL_AY", // Celkem sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_PL_Wholesale_LY", // VO sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_PL_Wholesale_AY", // VO sleva letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_PL_Eshop_LY", // eShop sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_PL_Eshop_AY", // eShop sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			],
		},

		{
			field: "group_export", // Export
			children: [
				getAgColumn(
					"discount_CZ_Export_LY", // Export sleva vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"discount_CZ_Export_AY", // Export sleva letos
					"number", 68,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_margin", // Marže
			children: [
				// wholesale
				getAgColumn(
					"profit_Wholesale_LY", // VO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Wholesale_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_Wholesale_AY", // VO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Wholesale_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				// eshop
				getAgColumn(
					"profit_Eshop_LY", // eShop vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Eshop_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_Eshop_AY", // eShop letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Eshop_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				// retail
				getAgColumn(
					"profit_Retail_LY", // MO vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Retail_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_Retail_AY", // MO letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Retail_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				// bakery
				getAgColumn(
					"profit_RetailBakery_LY", // Pekárny vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_RetailBakery_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_RetailBakery_AY", // Pekárny letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_RetailBakery_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				// kinoko
				getAgColumn(
					"profit_RetailKinoko_LY", // Kinoko vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Kinoko_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_RetailKinoko_AY", // Kinoko letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_Kinoko_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				// export
				getAgColumn(
					"profit_WholesaleExport_LY", // Export vloni
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_WholesaleExport_LY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"profit_WholesaleExport_AY", // Export letos
					"number", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"margin_WholesaleExport_AY", // % todo: procenta
					"number", 68,
					false, false, false,
					[],
				),
			],
		},

		// hidden columns

		// getAgColumn(
		// 	"sales_Wholesale_LY", // Sales Wholesale Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Wholesale_AY", // Sales Wholesale Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Eshop_LY", // Sales Eshop Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Eshop_AY", // Sales Eshop Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Retail_LY", // Sales Retail Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Retail_AY", // Sales Retail Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_WholesaleExport_LY", // Sales WholesaleExport Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_WholesaleExport_AY", // Sales WholesaleExport Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_RetailBakery_LY", // Sales RetailBakery Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_RetailBakery_AY", // Sales RetailBakery Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Kinoko_LY", // Sales RetailKinoko Ly
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
		//
		// getAgColumn(
		// 	"sales_Kinoko_AY", // Sales RetailKinoko Ay
		// 	"number", 68,
		// 	false, true, false,
		// 	[],
		// ),
	]
}



export const salesAnalyticsHeaderTranslations = {
	itemId: m.routes_prodej_analyza_prodeju_table_column_item_id,
	itemName: m.routes_prodej_analyza_prodeju_table_column_item_name,
	currency: m.routes_prodej_analyza_prodeju_table_column_currency,
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
	group_zc: m.routes_prodej_analyza_prodeju_table_column_group_zc,
	basePrice_LY: m.routes_prodej_analyza_prodeju_table_column_baseprice_ly,
	basePrice_AY: m.routes_prodej_analyza_prodeju_table_column_baseprice_ay,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_table_column_baseprice_diff,
	discount_LY: m.routes_prodej_analyza_prodeju_table_column_discount_ly,
	discount_AY: m.routes_prodej_analyza_prodeju_table_column_discount_ay,
	discount_CZ_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_ly,
	discount_CZ_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_ay,
	discount_CZ_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_wholesale_ly,
	discount_CZ_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_wholesale_ay,
	discount_CZ_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshop_ly,
	discount_CZ_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshop_ay,
	discount_CZ_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retail_ly,
	discount_CZ_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retail_ay,
	group_bakery: m.routes_prodej_analyza_prodeju_table_column_group_pekarny,
	discount_CZ_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailbakery_ly,
	discount_CZ_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailbakery_ay,
	group_kinoko: m.routes_prodej_analyza_prodeju_table_column_group_kinoko,
	discount_CZ_EshopKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshopkinoko_ly,
	discount_CZ_EshopKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshopkinoko_ay,
	discount_CZ_RetailKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailkinoko_ly,
	discount_CZ_RetailKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailkinoko_ay,
	discount_SK_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_ly,
	discount_SK_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_ay,
	discount_SK_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_wholesale_ly,
	discount_SK_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_wholesale_ay,
	discount_SK_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_eshop_ly,
	discount_SK_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_eshop_ay,
	discount_SK_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_retail_ly,
	discount_SK_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_retail_ay,
	discount_PL_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_ly,
	discount_PL_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_ay,
	discount_PL_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_wholesale_ly,
	discount_PL_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_wholesale_ay,
	discount_PL_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_eshop_ly,
	discount_PL_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_eshop_ay,
	discount_CZ_Export_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_export_ly,
	discount_CZ_Export_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_export_ay,
	group_margin: m.routes_prodej_analyza_prodeju_table_column_group_marze,
	profit_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_profit_wholesale_ly,
	margin_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_margin_wholesale_ly,
	profit_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_profit_wholesale_ay,
	margin_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_margin_wholesale_ay,
	profit_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_profit_eshop_ly,
	margin_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_margin_eshop_ly,
	profit_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_profit_eshop_ay,
	margin_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_margin_eshop_ay,
	profit_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_profit_retail_ly,
	margin_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_margin_retail_ly,
	profit_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_profit_retail_ay,
	margin_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_margin_retail_ay,
	profit_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_profit_retailbakery_ly,
	margin_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_margin_retailbakery_ly,
	profit_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_profit_retailbakery_ay,
	margin_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_margin_retailbakeryl_ay,
	profit_RetailKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_profit_retailkinoko_ly,
	margin_Kinoko_LY: m.routes_prodej_analyza_prodeju_table_column_margin_kinoko_ly,
	profit_RetailKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_profit_retailkinoko_ay,
	margin_Kinoko_AY: m.routes_prodej_analyza_prodeju_table_column_margin_kinoko_ay,
	profit_WholesaleExport_LY: m.routes_prodej_analyza_prodeju_table_column_profit_wholesaleexport_ly,
	margin_WholesaleExport_LY: m.routes_prodej_analyza_prodeju_table_column_margin_wholesaleexport_ly,
	profit_WholesaleExport_AY: m.routes_prodej_analyza_prodeju_table_column_profit_wholesaleexport_ay,
	margin_WholesaleExport_AY: m.routes_prodej_analyza_prodeju_table_column_margin_wholesaleexport_ay
}
