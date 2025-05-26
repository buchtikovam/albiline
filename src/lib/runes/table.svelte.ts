import type {AgGridTables} from "$lib/types/components/table/table";
import {SessionStore, sessionStore} from "$lib/utils/browser-storage/sessionStorage.svelte";

export interface TableSettings {
	headerHeight: number;
	headerFontSize: number;
	spacing: number;
	fontSize: number;
	iconSize: number;
}

// INITIALIZE IN +PAGE.SVELTE, NOT IN AG GRID WRAPPER
export const agGridTables: SessionStore<AgGridTables> = sessionStore("agGridTables", {});

export const pageKeys: SessionStore<{ value: string[], index: number }> = sessionStore("pageKeys", { value: [], index: 0 })

export const sideTableRowData: { value: any[] } = $state({ value: [] })

export const tableViewSettings: SessionStore<TableSettings> = sessionStore("tableView", {
	headerHeight: 28,
	headerFontSize: 11,
	spacing: 5,
	fontSize: 14,
	iconSize: 14,
})


/*
*
* {
    "fulltext": "",
    "inputs": [
        {
            "field": "datefrom",
            "type": "date",
            "value": "01.04.2020 00:00:000"
        },
        {
            "field": "dateto",
            "type": "date",
            "value": "01.04.2024 00:00:000"
        },
        {
            "field": "salescountrycode",
            "type": "text",
            "value": "CZ"
        },
        {
            "field": "coverkinokoandbakery",
            "type": "boolean",
            "value": true
        }
    ],
    "columnFilters": [],
    "columnList": [
        "id",
        "itemId",
        "itemName",
        "currency",
        "sales_LY",
        "sales_AY",
        "salesDiff",
        "sales_CZ_LY",
        "sales_CZ_AY",
        "sales_CZ_Diff",
        "sales_CZ_Wholesale_LY",
        "sales_CZ_Wholesale_AY",
        "sales_CZ_Wholesale_Diff",
        "sales_CZ_Eshop_LY",
        "sales_CZ_Eshop_AY",
        "sales_CZ_Eshop_Diff",
        "sales_CZ_Retail_LY",
        "sales_CZ_Retail_AY",
        "sales_CZ_Retail_Diff",
        "sales_CZ_RetailBakery_LY",
        "sales_CZ_RetailBakery_AY",
        "sales_CZ_RetailBakery_Diff",
        "sales_CZ_EshopKinoko_LY",
        "sales_CZ_EshopKinoko_AY",
        "sales_CZ_EshopKinoko_Diff",
        "sales_CZ_RetailKinoko_LY",
        "sales_CZ_RetailKinoko_AY",
        "sales_CZ_RetailKinoko_Diff",
        "sales_SK_LY",
        "sales_SK_AY",
        "sales_SK_LY_Diff",
        "sales_SK_Wholesale_LY",
        "sales_SK_Wholesale_AY",
        "sales_SK_Wholesale_LY_Diff",
        "sales_SK_Eshop_LY",
        "sales_SK_Eshop_AY",
        "sales_SK_Eshop_LY_Diff",
        "sales_SK_Retail_LY",
        "sales_SK_Retail_AY",
        "sales_SK_Retail_LY_Diff",
        "sales_PL_LY",
        "sales_PL_AY",
        "sales_PL_Diff",
        "sales_PL_Wholesale_LY",
        "sales_PL_Wholesale_AY",
        "sales_PL_Wholesale_Diff",
        "sales_PL_Eshop_LY",
        "sales_PL_Eshop_AY",
        "sales_PL_Eshop_Diff",
        "sales_CZ_Export_LY",
        "sales_CZ_Export_AY",
        "sales_CZ_Export_Diff",
        "basePrice_LY",
        "basePrice_AY",
        "basePrice_Diff",
        "discount_LY",
        "discount_AY",
        "discount_CZ_LY",
        "discount_CZ_AY",
        "discount_CZ_Wholesale_LY",
        "discount_CZ_Wholesale_AY",
        "discount_CZ_Eshop_LY",
        "discount_CZ_Eshop_AY",
        "discount_CZ_Retail_LY",
        "discount_CZ_Retail_AY",
        "discount_CZ_RetailBakery_LY",
        "discount_CZ_RetailBakery_AY",
        "discount_CZ_EshopKinoko_LY",
        "discount_CZ_EshopKinoko_AY",
        "discount_CZ_RetailKinoko_LY",
        "discount_CZ_RetailKinoko_AY",
        "discount_SK_LY",
        "discount_SK_AY",
        "discount_SK_Wholesale_LY",
        "discount_SK_Wholesale_AY",
        "discount_SK_Eshop_LY",
        "discount_SK_Eshop_AY",
        "discount_SK_Retail_LY",
        "discount_SK_Retail_AY",
        "discount_PL_LY",
        "discount_PL_AY",
        "discount_PL_Wholesale_LY",
        "discount_PL_Wholesale_AY",
        "discount_PL_Eshop_LY",
        "discount_PL_Eshop_AY",
        "discount_CZ_Export_LY",
        "discount_CZ_Export_AY",
        "profit_Wholesale_LY",
        "margin_Wholesale_LY",
        "profit_Wholesale_AY",
        "margin_Wholesale_AY",
        "profit_Eshop_LY",
        "margin_Eshop_LY",
        "profit_Eshop_AY",
        "margin_Eshop_AY",
        "profit_Retail_LY",
        "margin_Retail_LY",
        "profit_Retail_AY",
        "margin_Retail_AY",
        "profit_RetailBakery_LY",
        "margin_RetailBakery_LY",
        "profit_RetailBakery_AY",
        "margin_RetailBakery_AY",
        "profit_RetailKinoko_LY",
        "margin_Kinoko_LY",
        "profit_RetailKinoko_AY",
        "margin_Kinoko_AY",
        "profit_WholesaleExport_LY",
        "margin_WholesaleExport_LY",
        "profit_WholesaleExport_AY",
        "margin_WholesaleExport_AY"
    ]
    *
    *
}
* */
