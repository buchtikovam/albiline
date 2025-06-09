import type {GridOptions, IAggFuncParams, ValueFormatterParams, ValueGetterParams} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import * as m from '$lib/paraglide/messages.js';
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import type {ICellRendererParams} from "ag-grid-community";
import {compoundDiffAggregator} from "$lib/utils/components/ag-grid/agg-functions/compoundRatioDiffAggregator";



export const SalesCustomerorstoreByProductlineByCostLevelAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	aggFuncs: {
		'diffPercentage': compoundDiffAggregator,
	},

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn(
			"divisionName", // Divize
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"productLineName", // Linie
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"conceptionName", // Koncepce
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"costLevelCode", // KLP
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"costLevelName", // Název KLP
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"quantity_AY", // Kusů letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
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
							originalDiffValue: params.data.quantity_Diff
						};
					}

					return null;
				},
				aggFunc: 'diffPercentage',
				cellRenderer: (params: ICellRendererParams) => {
					if (params.node && params.node.group) {
						return formatPercentage(params.value, 0);
					}

					if (params.value && typeof params.value.originalDiffValue !== 'undefined') {
						return formatPercentage(params.value.originalDiffValue, 0);
					}

					return '';
				},
			}
		),

		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"sales_LY", // Prodej vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_AY", // Prodej letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"sales_DiffAbs", // Nárůst
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
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
							originalDiffValue: params.data.sales_Diff
						};
					}

					return null;
				},
				aggFunc: 'diffPercentage',
				cellRenderer: (params: ICellRendererParams) => {
					if (params.node && params.node.group) {
						return formatPercentage(params.value, 0);
					}

					if (params.value && typeof params.value.originalDiffValue !== 'undefined') {
						return formatPercentage(params.value.originalDiffValue, 0);
					}

					return '';
				},
			}
		),

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
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
							originalDiffValue: params.data.basePrice_Diff
						};
					}

					return null;
				},
				aggFunc: 'diffPercentage',
				cellRenderer: (params: ICellRendererParams) => {
					if (params.node && params.node.group) {
						return formatPercentage(params.value, 0);
					}

					if (params.value && typeof params.value.originalDiffValue !== 'undefined') {
						return formatPercentage(params.value.originalDiffValue, 0);
					}

					return '';
				},
			}
		),

		getAgColumn(
			"discount_LY", // Sleva vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"discount_AY", // Sleva letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"storageBasePriceCurrency", // Sklad ZC
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"storageQuantity", // Sklad kusů
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),
	]
}


export const SalesCustomerorstoreByProductlineByCostLevelHeaderTranslations = {
	divisionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_po_klp_table_column_divisionName,
	productLineName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_po_klp_table_column_productLineName,
	conceptionName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_po_klp_table_column_conceptionName,
	costLevelCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_po_klp_table_column_costLevelCode,
	costLevelName: m.routes_prodej_analyza_prodeju_po_zakaznicich_po_liniich_po_klp_table_column_costLevelName,
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
