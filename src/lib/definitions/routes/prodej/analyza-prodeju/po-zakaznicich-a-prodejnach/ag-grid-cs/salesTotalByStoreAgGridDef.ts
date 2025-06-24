import type {GridOptions} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import * as m from '$lib/paraglide/messages.js';
import type {ICellRendererParams} from "ag-grid-community";
import ArrowRightCellRenderer from "$lib/components/ag-grid/cell-renderer/ArrowRightCellRenderer.svelte";
import {ArrowRightComp} from "$lib/utils/components/ag-grid/cell-renderers/arrowRight.svelte";

export const SalesTotalByStoreAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn("documents", "text", 60, false, false, false, [], {
			cellRenderer: ArrowRightComp,
			sortable: false,
			filterable: false,
			suppressHeaderFilterButton: true,
		}),

		// Země
		getAgColumn("salesCountryCode", "text", 100, false, false, false, []),
		// Měna
		getAgColumn("currency", "text", 100, false, false, false, []),
		// B
		getAgColumn("customerRank", "text", 100, false, false, false, []),
		// OZ
		getAgColumn("dealerCode", "number", 120, false, false, false, []),
		// OM
		getAgColumn("managerCode", "number", 120, false, false, false, []),
		// Číslo zákazníka
		getAgColumn("customerNodeCode", "number", 150, false, false, false, []),
		// Číslo prodejny
		getAgColumn("deliveryAddressCode", "number", 150, false, false, false, []),
		// Zákazník
		getAgColumn("customerNodeName", "text", 200, false, false, false, []),
		// Prodejna
		getAgColumn("deliveryAddress", "text", 200, false, false, false, []),
		// Ulice
		getAgColumn("street", "text", 150, false, false, false, []),
		// Město
		getAgColumn("city", "text", 150, false, false, false, []),
		// PSČ
		getAgColumn("postCode", "text", 100, false, false, false, []),
		// Typ prodejny
		getAgColumn("retailStoreType", "text", 150, false, false, false, []),
		// První prodej
		getAgColumn("firstSalesDate", "date", 150, false, false, false, []),
		// Celkem vloni
		getAgColumn("sales_LY", "number", 150, false, false, false, []),
		// Celkem letos
		getAgColumn("sales_AY", "number", 150, false, false, false, []),
		// Nárůst
		getAgColumn("sales_DiffAbs", "number", 120, false, false, false, []),
		// %
		getAgColumn("sales_Diff", "number", 100, false, false, false, []),

		{
			field: "group_hry_vo",
			children: [
				getAgColumn("sales_3_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_3_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_3_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_3_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_kouzelne_cteni",
			children: [
				getAgColumn("sales_8_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_8_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_8_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_8_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_kvido_a_skoly",
			children: [
				getAgColumn("sales_10_LY", "number", 120, false, false, false, []),     // vloni
				getAgColumn("sales_10_AY", "number", 120, false, false, false, []),     // letos
				getAgColumn("sales_10_Diff", "number", 100, false, false, false, []),   // %
				getAgColumn("sales_10_DiffAbs", "number", 120, false, false, false, []),// Nárůst
			]
		},
		{
			field: "group_science",
			children: [
				getAgColumn("sales_6_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_6_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_6_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_6_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_darky",
			children: [
				getAgColumn("sales_1_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_1_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_1_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_1_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_stationery",
			children: [
				getAgColumn("sales_7_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_7_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_7_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_7_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_pdo",
			children: [
				getAgColumn("sales_0_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_0_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_0_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_0_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_mementerra",
			children: [
				getAgColumn("sales_11_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_11_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_11_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_11_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_baleni_darku",
			children: [
				getAgColumn("sales_2_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_2_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_2_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_2_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_party",
			children: [
				getAgColumn("sales_5_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_5_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_5_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_5_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_prodejny_mo",
			children: [
				getAgColumn("sales_4_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_4_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_4_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_4_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},
		{
			field: "group_knihy",
			children: [
				getAgColumn("sales_12_LY", "number", 120, false, false, false, []),     // loni
				getAgColumn("sales_12_AY", "number", 120, false, false, false, []),     // letos
				getAgColumn("sales_12_Diff", "number", 100, false, false, false, []),   // %
				getAgColumn("sales_12_DiffAbs", "number", 120, false, false, false, []),// Nárůst
			]
		},
		{
			field: "group_posli_prani",
			children: [
				getAgColumn("sales_13_LY", "number", 120, false, false, false, []),     // loni
				getAgColumn("sales_13_AY", "number", 120, false, false, false, []),     // letos
				getAgColumn("sales_13_Diff", "number", 100, false, false, false, []),   // %
				getAgColumn("sales_13_DiffAbs", "number", 120, false, false, false, []),// Nárůst
			]
		},
		{
			field: "group_ostatni",
			children: [
				getAgColumn("sales_9_LY", "number", 120, false, false, false, []),      // vloni
				getAgColumn("sales_9_AY", "number", 120, false, false, false, []),      // letos
				getAgColumn("sales_9_Diff", "number", 100, false, false, false, []),    // %
				getAgColumn("sales_9_DiffAbs", "number", 120, false, false, false, []), // Nárůst
			]
		},

		// ZC celkem vloni
		getAgColumn("basePrice_LY", "number", 150, false, false, false, []),
		// ZC celkem letos
		getAgColumn("basePrice_AY", "number", 150, false, false, false, []),
		// %
		getAgColumn("basePrice_Diff", "number", 100, false, false, false, []),
		// Vč. DPH vloni
		getAgColumn("salesWithVat_LY", "number", 150, false, false, false, []),
		// Vč. DPH letos
		getAgColumn("salesWithVat_AY", "number", 150, false, false, false, []),
		// %
		getAgColumn("salesWithVatDiff", "number", 100, false, false, false, []),
		// % slevy vloni
		getAgColumn("discountPct_LY", "number", 120, false, false, false, []),
		// % slevy letos
		getAgColumn("discountPct_AY", "number", 120, false, false, false, []),
		// Email
		getAgColumn("email", "text", 200, false, false, false, []),
		// První závoz
		getAgColumn("firstOrderDate", "date", 150, false, false, false, []),
		// Poslední závoz
		getAgColumn("lastOrderDate", "date", 150, false, false, false, []),
		// Prodejen vloni
		getAgColumn("storesCountLY", "number", 150, false, false, false, []),
		// Prodejen letos
		getAgColumn("storesCountAY", "number", 150, false, false, false, []),
		// PDO dnů bez obj.
		getAgColumn("daysWithoutOrder_0", "number", 150, false, false, false, []),
		// DY dnů bez obj.
		getAgColumn("daysWithoutOrder_1", "number", 150, false, false, false, []),
		// BD dnů bez obj.
		getAgColumn("daysWithoutOrder_2", "number", 150, false, false, false, []),
		// HRY dnů bez obj.
		getAgColumn("daysWithoutOrder_3", "number", 150, false, false, false, []),

		// TODO

		// Počet dodávek letos
		getAgColumn("deliveries", "number", 180, false, false, false, []),
		// Prodeje B2B eshop vloni
		getAgColumn("sales_B2B_LY", "number", 200, false, false, false, []),
		// Prodeje B2B eshop letos
		getAgColumn("sales_B2B_AY", "number", 200, false, false, false, []),
		// %
		getAgColumn("sales_B2B_Diff", "number", 100, false, false, false, []),
		// Marže letos
		getAgColumn("profit_AY", "number", 120, false, false, false, []),
		// %
		getAgColumn("margin_AY", "number", 100, false, false, false, []),

		{
			field: "group_hry_vo",
			children: [
				getAgColumn("profit_3_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_3_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_kouzelne_cteni",
			children: [
				getAgColumn("profit_8_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_8_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_kvido_a_skoly",
			children: [
				getAgColumn("profit_10_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_10_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_science",
			children: [
				getAgColumn("profit_6_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_6_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_darky",
			children: [
				getAgColumn("profit_1_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_1_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_stationery",
			children: [
				getAgColumn("profit_7_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_7_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_pdo",
			children: [
				getAgColumn("profit_0_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_0_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_mementerra",
			children: [
				getAgColumn("profit_11_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_11_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_baleni_darku",
			children: [
				getAgColumn("profit_2_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_2_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_party",
			children: [
				getAgColumn("profit_5_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_5_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_prodejny_mo",
			children: [
				getAgColumn("profit_4_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_4_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_knihy",
			children: [
				getAgColumn("profit_12_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_12_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_posli_prani",
			children: [
				getAgColumn("profit_13_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_13_AY", "number", 100, false, false, false, []), // %
			]
		},
		{
			field: "group_ostatni",
			children: [
				getAgColumn("profit_9_AY", "number", 120, false, false, false, []), // Marže letos
				getAgColumn("margin_9_AY", "number", 100, false, false, false, []), // %
			]
		},

		// Náklady loni
		getAgColumn("distributionCost_LY", "number", 150, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_DistributionCost_LY", "number", 100, false, false, false, []),
		// Náklady
		getAgColumn("distributionCost_AY", "number", 150, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_DistributionCost_AY", "number", 100, false, false, false, []),
		// Náklady expedice loni
		getAgColumn("expeditionCost_LY", "number", 200, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_ExpeditionCost_LY", "number", 100, false, false, false, []),
		// Náklady expedice
		getAgColumn("expeditionCost_AY", "number", 200, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_ExpeditionCost_AY", "number", 100, false, false, false, []),
		// Náklady doprava loni
		getAgColumn("transportCost_LY", "number", 200, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_TransportCost_LY", "number", 100, false, false, false, []),
		// Náklady doprava
		getAgColumn("transportCost_AY", "number", 200, false, false, false, []),
		// % (ZC)
		getAgColumn("margin_TransportCost_AY", "number", 100, false, false, false, []),
	],
}


export const SalesTotalByStoreHeaderTranslations = {
	salesCountryCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_salesCountryCode,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_currency,
	customerRank: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_customerRank,
	dealerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_dealerCode,
	managerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_managerCode,
	customerNodeCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_customerNodeCode,
	deliveryAddressCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_deliveryAddressCode,
	customerNodeName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_customerNodeName,
	deliveryAddress: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_deliveryAddress,
	street: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_street,
	city: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_city,
	postCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_postCode,
	retailStoreType: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_retailStoreType,
	firstSalesDate: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_firstSalesDate,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_Diff,
	group_hry_vo: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_hry_vo,
	group_kouzelne_cteni: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_kouzelne_cteni,
	group_kvido_a_skoly: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_kvido_a_skoly,
	group_science: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_science,
	group_darky: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_darky,
	group_stationery: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_stationery,
	group_pdo: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_pdo,
	group_mementerra: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_mementerra,
	group_baleni_darku: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_baleni_darku,
	group_party: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_party,
	group_prodejny_mo: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_prodejny_mo,
	group_knihy: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_knihy,
	group_posli_prani: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_posli_prani,
	group_ostatni: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_group_ostatni,
	sales_3_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_3_LY,
	sales_3_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_3_AY,
	sales_3_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_3_Diff,
	sales_3_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_3_DiffAbs,
	sales_8_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_8_LY,
	sales_8_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_8_AY,
	sales_8_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_8_Diff,
	sales_8_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_8_DiffAbs,
	sales_10_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_10_LY,
	sales_10_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_10_AY,
	sales_10_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_10_Diff,
	sales_10_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_10_DiffAbs,
	sales_6_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_6_LY,
	sales_6_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_6_AY,
	sales_6_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_6_Diff,
	sales_6_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_6_DiffAbs,
	sales_1_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_1_LY,
	sales_1_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_1_AY,
	sales_1_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_1_Diff,
	sales_1_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_1_DiffAbs,
	sales_7_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_7_LY,
	sales_7_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_7_AY,
	sales_7_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_7_Diff,
	sales_7_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_7_DiffAbs,
	sales_0_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_0_LY,
	sales_0_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_0_AY,
	sales_0_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_0_Diff,
	sales_0_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_0_DiffAbs,
	sales_11_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_11_LY,
	sales_11_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_11_AY,
	sales_11_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_11_Diff,
	sales_11_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_11_DiffAbs,
	sales_2_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_2_LY,
	sales_2_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_2_AY,
	sales_2_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_2_Diff,
	sales_2_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_2_DiffAbs,
	sales_5_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_5_LY,
	sales_5_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_5_AY,
	sales_5_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_5_Diff,
	sales_5_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_5_DiffAbs,
	sales_4_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_4_LY,
	sales_4_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_4_AY,
	sales_4_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_4_Diff,
	sales_4_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_4_DiffAbs,
	sales_12_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_12_LY,
	sales_12_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_12_AY,
	sales_12_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_12_Diff,
	sales_12_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_12_DiffAbs,
	sales_13_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_13_LY,
	sales_13_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_13_AY,
	sales_13_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_13_Diff,
	sales_13_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_13_DiffAbs,
	sales_9_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_9_LY,
	sales_9_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_9_AY,
	sales_9_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_9_Diff,
	sales_9_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_9_DiffAbs,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_basePrice_Diff,
	salesWithVat_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_salesWithVat_LY,
	salesWithVat_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_salesWithVat_AY,
	salesWithVatDiff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_salesWithVatDiff,
	discountPct_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_discountPct_LY,
	discountPct_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_discountPct_AY,
	email: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_email,
	firstOrderDate: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_firstOrderDate,
	lastOrderDate: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_lastOrderDate,
	storesCountLY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_storesCountLY,
	storesCountAY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_storesCountAY,
	daysWithoutOrder_0: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_daysWithoutOrder_0,
	daysWithoutOrder_1: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_daysWithoutOrder_1,
	daysWithoutOrder_2: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_daysWithoutOrder_2,
	daysWithoutOrder_3: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_daysWithoutOrder_3,
	deliveries: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_deliveries,
	sales_B2B_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_B2B_LY,
	sales_B2B_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_B2B_AY,
	sales_B2B_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_sales_B2B_Diff,
	profit_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_AY,
	margin_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_AY,
	profit_3_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_3_AY,
	margin_3_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_3_AY,
	profit_8_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_8_AY,
	margin_8_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_8_AY,
	profit_10_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_10_AY,
	margin_10_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_10_AY,
	profit_6_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_6_AY,
	margin_6_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_6_AY,
	profit_1_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_1_AY,
	margin_1_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_1_AY,
	profit_7_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_7_AY,
	margin_7_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_7_AY,
	profit_0_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_0_AY,
	margin_0_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_0_AY,
	profit_11_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_11_AY,
	margin_11_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_11_AY,
	profit_2_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_2_AY,
	margin_2_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_2_AY,
	profit_5_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_5_AY,
	margin_5_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_5_AY,
	profit_4_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_4_AY,
	margin_4_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_4_AY,
	profit_12_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_12_AY,
	margin_12_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_12_AY,
	profit_13_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_13_AY,
	margin_13_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_13_AY,
	profit_9_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_profit_9_AY,
	margin_9_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_9_AY,
	distributionCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_distributionCost_LY,
	margin_DistributionCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_DistributionCost_LY,
	distributionCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_distributionCost_AY,
	margin_DistributionCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_DistributionCost_AY,
	expeditionCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_expeditionCost_LY,
	margin_ExpeditionCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_ExpeditionCost_LY,
	expeditionCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_expeditionCost_AY,
	margin_ExpeditionCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_ExpeditionCost_AY,
	transportCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_transportCost_LY,
	margin_TransportCost_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_TransportCost_LY,
	transportCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_transportCost_AY,
	margin_TransportCost_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_margin_TransportCost_AY,
	documents: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_documents,
}
