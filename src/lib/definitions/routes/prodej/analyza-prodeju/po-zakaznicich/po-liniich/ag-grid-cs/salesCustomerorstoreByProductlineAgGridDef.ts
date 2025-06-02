import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import * as m from '$lib/paraglide/messages.js';


export const SalesCustomerorstoreByProductlineAgGridDef = {
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
			"divisionName", // Divize
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"productLineName", // Linie
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"quantity_AY", // Kusů letos
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"quantity_Diff", // %
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_LY", // Prodej vloni
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_AY", // Prodej letos
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_DiffAbs", // Nárůst
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_Diff", // %
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"basePrice_Diff", // %
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"discount_LY", // Sleva vloni
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"discount_AY", // Sleva letos
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"storageBasePriceCurrency", // Sklad ZC
			"number", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"storageQuantity", // Sklad kusů
			"number", 70,
			false, false, false,
			[]
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


/*"routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_table_column_divisionName" : "Divize"*/
