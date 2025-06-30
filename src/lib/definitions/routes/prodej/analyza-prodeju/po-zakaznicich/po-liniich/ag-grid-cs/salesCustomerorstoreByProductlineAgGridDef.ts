import {
	getTotalDivisionPercentageAggObj
} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionPercentageAggObj";
import {totalDivisionPercentageAggregator} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionPercentageAggregator";
import {getSumAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getSumAggObj";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import type {GridOptions, ValueGetterParams} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';


export const SalesCustomerorstoreByProductlineAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	aggFuncs: {
		'totalDivisionPercentageAgg': totalDivisionPercentageAggregator,
	},

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn( // Divize
			"divisionName", "text", 120,
			false, false, false, []
		),

		getAgColumn( // Linie
			"productLineName", "text", 200,
			false, false, false, []
		),

		getAgColumn( // Kusů vloni
			"quantity_LY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Kusů letos
			"quantity_AY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // %
			"quantity_Diff", "number", 70,
			false, false, false, ["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.quantity_AY,
							divisor: params.data.quantity_LY,
							originalDiffValue: params.data.quantity_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),

		getAgColumn( // Měna
			"currency", "text", 70,
			false, false, false, []
		),

		getAgColumn( // Prodej vloni
			"sales_LY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Prodej letos
			"sales_AY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Nárůst
			"sales_DiffAbs", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // %
			"sales_Diff", "number", 70,
			false, false, false, ["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_AY,
							divisor: params.data.sales_LY,
							originalDiffValue: params.data.sales_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),

		getAgColumn( // ZC vloni
			"basePrice_LY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // ZC letos
			"basePrice_AY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // %
			"basePrice_Diff", "number", 70,
			false, false, false, ["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.basePrice_AY,
							divisor: params.data.basePrice_LY,
							originalDiffValue: params.data.basePrice_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj(),
			}
		),

		getAgColumn( // Sleva vloni
			"discount_LY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Sleva letos
			"discount_AY", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Sklad ZC
			"storageBasePriceCurrency", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
		),

		getAgColumn( // Sklad kusů
			"storageQuantity", "number", 105,
			false, false, false, ["text-right"],
			{...getSumAggObj()}
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
