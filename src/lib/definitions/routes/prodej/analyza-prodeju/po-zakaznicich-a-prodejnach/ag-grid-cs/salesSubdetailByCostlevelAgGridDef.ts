import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';


export const SalesSubdetailByCostlevelAgGridDef: GridOptions = {
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
		getAgColumn("divisionName", "text", 200, false, false, false, []),
		// Linie
		getAgColumn("productLineName", "text", 200, false, false, false, []),
		// Koncepce
		getAgColumn("conceptionName", "text", 200, false, false, false, []),
		// KLP
		getAgColumn("costLevelCode", "text", 120, false, false, false, []),
		// Název KLP
		getAgColumn("costLevelName", "text", 200, false, false, false, []),
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
		// Kusů vloni
		getAgColumn("quantity_LY", "number", 150, false, false, false, []),
		// Kusů letos
		getAgColumn("quantity_AY", "number", 150, false, false, false, []),
	]
}


export const SalesSubdetailByCostlevelHeaderTranslations = {
	divisionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_divisionName,
	productLineName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_productLineName,
	conceptionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_conceptionName,
	costLevelCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_costLevelCode,
	costLevelName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_costLevelName,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_sales_Diff,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_basePrice_Diff,
	discount_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_discount_LY,
	discount_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_discount_AY,
	quantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_quantity_LY,
	quantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_costLevel_detail_table_column_quantity_AY,
}
