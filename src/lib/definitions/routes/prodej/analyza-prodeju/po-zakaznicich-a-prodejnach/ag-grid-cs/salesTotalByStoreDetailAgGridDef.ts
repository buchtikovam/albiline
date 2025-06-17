import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';


export const SalesTotalByStoreDetailAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		// Divize
		getAgColumn("divisionId", "number", 120, false, false, false, []),
		// Název divize
		getAgColumn("divisionName", "text", 200, false, false, false, []),
		// Prodej vloni
		getAgColumn("sales_LY", "number", 150, false, false, false, []),
		// Prodej letos
		getAgColumn("sales_AY", "number", 150, false, false, false, []),
		// Nárůst
		getAgColumn("sales_DiffAbs", "number", 120, false, false, false, []),
		// %
		getAgColumn("sales_Diff", "number", 100, false, false, false, []),
		// ZC vloni
		getAgColumn("basePrice_LY", "number", 150, false, false, false, []),
		// ZC letos
		getAgColumn("basePrice_AY", "number", 150, false, false, false, []),
		// %
		getAgColumn("basePrice_Diff", "number", 100, false, false, false, []),
		// Sleva vloni
		getAgColumn("discount_LY", "number", 150, false, false, false, []),
		// Sleva letos
		getAgColumn("discount_AY", "number", 150, false, false, false, []),
		// Prodejen vloni
		getAgColumn("storesCountLY", "number", 150, false, false, false, []),
		// Prodejen letos
		getAgColumn("storesCountAY", "number", 150, false, false, false, []),
		// Dnů bez objednávky
		getAgColumn("daysWithoutOrder", "number", 180, false, false, false, []),
	]
}


export const SalesTotalByStoreDetailHeaderTranslations = {
	divisionId: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_divisionId,
	divisionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_divisionName,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_sales_Diff,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_basePrice_Diff,
	discount_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_discount_LY,
	discount_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_discount_AY,
	storesCountLY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_storesCountLY,
	storesCountAY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_storesCountAY,
	daysWithoutOrder: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_detail_table_column_daysWithoutOrder,
}
