import type {GridOptions, ValueGetterParams} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';
import {getSumAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getSumAggObj";
import {
	getTotalDivisionPercentageAggObj
} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionPercentageAggObj";
import {
	totalDivisionPercentageAggregator
} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionPercentageAggregator";


export const SalesSubdetailByCostlevelAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	aggFuncs: {
		totalDivisionPercentageAgg: totalDivisionPercentageAggregator,
	},

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn( // Divize
			"divisionName", "text", 160,
			false, false, false, []
		),

		getAgColumn( // Linie
			"productLineName", "text", 180,
			false, false, false, []
		),

		getAgColumn( // Koncepce
			"conceptionName", "text", 180,
			false, false, false, []
		),

		getAgColumn( // KLP
			"costLevelCode", "text", 80,
			false, false, false, []
		),

		getAgColumn( // Název KLP
			"costLevelName", "text", 220,
			false, false, false, []
		),

		getAgColumn( // Prodej vloni
			"sales_LY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Prodej letos
			"sales_AY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Nárůst
			"sales_DiffAbs", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
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
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn( // ZC vloni
			"basePrice_LY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // ZC letos
			"basePrice_AY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
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
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn( // Sleva vloni
			"discount_LY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Sleva letos
			"discount_AY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Kusů vloni
			"quantity_LY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Kusů letos
			"quantity_AY", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),
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
