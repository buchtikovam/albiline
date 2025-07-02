import type {GridOptions, ValueFormatterParams, ValueGetterParams} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import * as m from '$lib/paraglide/messages.js';
import type {ICellRendererParams} from "ag-grid-community";
import ArrowRightCellRenderer from "$lib/components/ag-grid/cell-renderer/ArrowRightCellRenderer.svelte";
import {ArrowRightComp} from "$lib/utils/components/ag-grid/cell-renderers/arrowRight.svelte";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";
import {totalDivisionPercentageAggregator} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionPercentageAggregator";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import {totalGenericDivisionPercentageAggregator} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalGenericDivisionPercentageAggregator";
import { totalDivisionAggregator } from '$lib/utils/components/ag-grid/agg-functions/aggregators/totalDivisionAggregator';
import { getSumAggObj } from '$lib/utils/components/ag-grid/agg-functions/agg-objects/getSumAggObj';
import { getTotalDivisionAggObj } from '$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionAggObj';
import { getTotalDivisionPercentageAggObj } from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalDivisionPercentageAggObj";
import {
	getTotalGenericDivisionPercentageAggObj
} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalGenericDivisionPercentageAggObj";


export const SalesTotalByStoreAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: 'bottom',

	aggFuncs: {
		totalDivisionPercentageAgg: totalDivisionPercentageAggregator,
		totalGenericDivisionPercentageAgg: totalGenericDivisionPercentageAggregator,
		totalDivisionAgg: totalDivisionAggregator
	},

	rowSelection: {
		mode: 'singleRow',
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false
	},

	columnDefs: [
		getAgColumn( // Země
			'salesCountryCode', 'text', 70,
			false, false, false, []
		),

		getAgColumn( // Měna
			'currency', 'text', 70,
			false, false, false, []
		),

		getAgColumn( // B
			'customerRank', 'text', 60,
			false, false, false, []
		),

		getAgColumn( // OZ
			'dealerCode', 'number', 60,
			false, false, false, []
		),

		getAgColumn( // OM
			'managerCode', 'number', 60,
			false, false, false, []
		),

		getAgColumn( // Číslo zákazníka
			'customerNodeCode', 'number', 90,
			false, false, false, []
		),

		getAgColumn( // Číslo prodejny
			'deliveryAddressCode', 'number', 90,
			false, false, false, []
		),

		getAgColumn( // Zákazník
			'customerNodeName', 'text', 220,
			false, false, false, []
		),

		getAgColumn( // Prodejna
			'deliveryAddress', 'text', 220,
			false, false, false, []
		),

		getAgColumn( // Ulice
			'street', 'text', 200,
			false, false, false, []
		),

		getAgColumn( // Město
			'city', 'text', 200,
			false, false, false, []
		),

		getAgColumn( // PSČ
			'postCode', 'text', 80,
			false, false, false, []
		),

		getAgColumn( // Typ prodejny
			'retailStoreType', 'text', 180,
			false, false, false, []
		),

		getAgColumn( // První prodej
			'firstSalesDate', 'date', 150,
			false, false, false, []
		),

		getAgColumn( // Celkem vloni
			'sales_LY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Celkem letos
			'sales_AY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// Nárůst
			'sales_DiffAbs', 'number', 110,
			false, false, false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // %
			'sales_Diff', 'number', 80,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_AY,
							divisor: params.data.sales_LY,
							originalValue: params.data.sales_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn( // % z obratu letos
			'_computedColumn1', 'number', 90,
			false, false, false, ['text-right'],
			{
				aggFunc: () => null, // todo: finish agg func
				valueGetter: (params: ValueGetterParams) => {
					const totalSalesLY = params.context?.totalSalesLY;

					if (!params.data || typeof params.data.sales_LY!== 'number' || typeof totalSalesLY !== 'number') {
						return null;
					}

					const currentRowSalesLY: number = params.data.sales_LY;

					if (totalSalesLY === 0) {
						return currentRowSalesLY === 1;
					}

					return currentRowSalesLY / totalSalesLY;
				},
				valueFormatter: (params: ValueFormatterParams) => formatPercentage(params.value, 0)
			}
		),

		getAgColumn( // % z obratu vloni
			'_computedColumn2', 'number', 90,
			false, false, false, ['text-right'],
			{
				aggFunc: () => null, // todo: finish agg func
				valueGetter: (params: ValueGetterParams) => {
					const totalSalesAY = params.context?.totalSalesAY;

					if (!params.data || typeof params.data.sales_AY !== 'number' || typeof totalSalesAY !== 'number') {
						return null;
					}

					const currentRowSalesAY: number = params.data.sales_AY;

					if (totalSalesAY === 0) {
						return null;
					}

					return currentRowSalesAY / totalSalesAY;
				},
				valueFormatter: (params: ValueFormatterParams) => formatPercentage(params.value, 0)
			}
		),

		{
			field: 'group_hry_vo',
			children: [
				getAgColumn( // vloni
					'sales_3_LY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // letos
					'sales_3_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'sales_3_Diff', 'number', 80,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_3_AY,
									divisor: params.data.sales_3_LY,
									originalValue: params.data.sales_3_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_3_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_kouzelne_cteni',
			children: [
				getAgColumn(
					// vloni
					'sales_8_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_8_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_8_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_8_AY,
									divisor: params.data.sales_8_LY,
									originalValue: params.data.sales_8_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_8_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_kvido_a_skoly',
			children: [
				getAgColumn(
					// vloni
					'sales_10_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_10_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_10_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_10_AY,
									divisor: params.data.sales_10_LY,
									originalValue: params.data.sales_10_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_10_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_science',
			children: [
				getAgColumn(
					// vloni
					'sales_6_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_6_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_6_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_6_AY,
									divisor: params.data.sales_6_LY,
									originalValue: params.data.sales_6_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_6_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_darky',
			children: [
				getAgColumn(
					// vloni
					'sales_1_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_1_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_1_Diff',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_1_AY,
									divisor: params.data.sales_1_LY,
									originalValue: params.data.sales_1_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_1_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_stationery',
			children: [
				getAgColumn(
					// vloni
					'sales_7_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_7_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_7_Diff',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_7_AY,
									divisor: params.data.sales_7_LY,
									originalValue: params.data.sales_7_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_7_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_pdo',
			children: [
				getAgColumn(
					// vloni
					'sales_0_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_0_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_0_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_0_AY,
									divisor: params.data.sales_0_LY,
									originalValue: params.data.sales_0_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_0_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_mementerra',
			children: [
				getAgColumn(
					// vloni
					'sales_11_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_11_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_11_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_11_AY,
									divisor: params.data.sales_11_LY,
									originalValue: params.data.sales_11_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_11_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_baleni_darku',
			children: [
				getAgColumn(
					// vloni
					'sales_2_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_2_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_2_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_2_AY,
									divisor: params.data.sales_2_LY,
									originalValue: params.data.sales_2_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_2_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_party',
			children: [
				getAgColumn(
					// vloni
					'sales_5_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_5_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_5_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_5_AY,
									divisor: params.data.sales_5_LY,
									originalValue: params.data.sales_5_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_5_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_prodejny_mo',
			children: [
				getAgColumn(
					// vloni
					'sales_4_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_4_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_4_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_4_AY,
									divisor: params.data.sales_4_LY,
									originalValue: params.data.sales_4_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_4_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_knihy',
			children: [
				getAgColumn(
					// loni
					'sales_12_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_12_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_12_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_12_AY,
									divisor: params.data.sales_12_LY,
									originalValue: params.data.sales_12_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_12_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_posli_prani',
			children: [
				getAgColumn(
					// loni
					'sales_13_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_13_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_13_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_13_AY,
									divisor: params.data.sales_13_LY,
									originalValue: params.data.sales_13_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_13_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		{
			field: 'group_ostatni',
			children: [
				getAgColumn(
					// vloni
					'sales_9_LY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// letos
					'sales_9_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'sales_9_Diff',
					'number',
					80,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.sales_9_AY,
									divisor: params.data.sales_9_LY,
									originalValue: params.data.sales_9_Diff
								};
							}

							return null;
						},
						...getTotalDivisionPercentageAggObj()
					}
				),

				getAgColumn(
					// Nárůst
					'sales_9_DiffAbs',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				)
			]
		},

		getAgColumn(
			// ZC celkem vloni
			'basePrice_LY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// ZC celkem letos
			'basePrice_AY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// %
			'basePrice_Diff',
			'number',
			80,
			false,
			false,
			false,
			['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.basePrice_AY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.basePrice_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn(
			// Vč. DPH vloni
			'salesWithVat_LY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// Vč. DPH letos
			'salesWithVat_AY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// %
			'salesWithVatDiff',
			'number',
			70,
			false,
			false,
			false,
			['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.salesWithVat_AY,
							divisor: params.data.salesWithVat_LY,
							originalValue: params.data.salesWithVatDiff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn(
			// % slevy vloni
			'discountPct_LY', 'number', 100,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_LY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.discountPct_LY
						};
					}

					return null;
				},
				...getTotalGenericDivisionPercentageAggObj()
			}
		),

		getAgColumn(
			// % slevy letos
			'discountPct_AY', 'number', 100,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_AY,
							divisor: params.data.basePrice_AY,
							originalValue: params.data.discountPct_AY
						};
					}

					return null;
				},
				...getTotalGenericDivisionPercentageAggObj()
			}
		),

		// TODO - secret fields

		getAgColumn( // Email
			'email', 'text', 220,
			false, false, false, []
		),

		getAgColumn( // První závoz
			'firstOrderDate', 'date', 100,
			false, false, false, ["text-right"],
			{ aggFunc: () => null }
		),

		getAgColumn( // Poslední závoz
			'lastOrderDate', 'date', 100,
			false, false, false, ["text-right"],
			{ aggFunc: () => null }
		),

		getAgColumn( // Prodejen vloni
			'storesCountLY', 'number', 80,
			false, false, false, ["text-right"]
		),

		getAgColumn( // Prodejen letos
			'storesCountAY', 'number', 80,
			false, false, false, ["text-right"]
		),

		getAgColumn( // PDO dnů bez obj.
			'daysWithoutOrder_0', 'number', 80,
			false, false, false, ["text-right"]
		),

		getAgColumn( // DY dnů bez obj.
			'daysWithoutOrder_1', 'number', 80,
			false, false, false, ["text-right"]
		),

		getAgColumn( // BD dnů bez obj.
			'daysWithoutOrder_2', 'number', 80,
			false, false, false, ["text-right"]
		),

		getAgColumn( // HRY dnů bez obj.
			'daysWithoutOrder_3', 'number', 80,
			false, false, false, ["text-right"]
		),

		// Faktury
		getAgColumn('_documents', 'text', 60, false, false, false, [], {
			cellRenderer: ArrowRightComp,
			sortable: false,
			suppressHeaderFilterButton: true,
			aggFunc: () => null,
		}),

		getAgColumn(
			// Počet dodávek letos
			'deliveries',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// Prodeje B2B eshop vloni
			'sales_B2B_LY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// Prodeje B2B eshop letos
			'sales_B2B_AY',
			'number',
			110,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// %
			'sales_B2B_Diff',
			'number',
			80,
			false,
			false,
			false,
			['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales_B2B_AY,
							divisor: params.data.sales_B2B_LY,
							originalValue: params.data.sales_B2B_Diff
						};
					}

					return null;
				},
				...getTotalDivisionPercentageAggObj()
			}
		),

		getAgColumn(
			// Marže letos
			'profit_AY',
			'number',
			100,
			false,
			false,
			false,
			['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn(
			// %
			'margin_AY',
			'number',
			70,
			false,
			false,
			false,
			['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.profit_AY,
							divisor: params.data.sales_AY,
							originalValue: params.data.margin_AY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		{
			field: 'group_hry_vo',
			children: [
				getAgColumn(
					// Marže letos
					'profit_3_AY',
					'number',
					100,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_3_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_3_AY,
									divisor: params.data.sales_3_AY,
									originalValue: params.data.margin_3_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_kouzelne_cteni',
			children: [
				getAgColumn(
					// Marže letos
					'profit_8_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_8_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_8_AY,
									divisor: params.data.sales_8_AY,
									originalValue: params.data.margin_8_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_kvido_a_skoly',
			children: [
				getAgColumn(
					// Marže letos
					'profit_10_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_10_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_10_AY,
									divisor: params.data.sales_10_AY,
									originalValue: params.data.margin_10_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_science',
			children: [
				getAgColumn(
					// Marže letos
					'profit_6_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_6_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_6_AY,
									divisor: params.data.sales_6_AY,
									originalValue: params.data.margin_6_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_darky',
			children: [
				getAgColumn(
					// Marže letos
					'profit_1_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_1_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_1_AY,
									divisor: params.data.sales_1_AY,
									originalValue: params.data.margin_1_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_stationery',
			children: [
				getAgColumn(
					// Marže letos
					'profit_7_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_7_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_7_AY,
									divisor: params.data.sales_7_AY,
									originalValue: params.data.margin_7_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_pdo',
			children: [
				getAgColumn(
					// Marže letos
					'profit_0_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_0_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_0_AY,
									divisor: params.data.sales_0_AY,
									originalValue: params.data.margin_0_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_mementerra',
			children: [
				getAgColumn(
					// Marže letos
					'profit_11_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn(
					// %
					'margin_11_AY',
					'number',
					70,
					false,
					false,
					false,
					['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_11_AY,
									divisor: params.data.sales_11_AY,
									originalValue: params.data.margin_11_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_baleni_darku',
			children: [
				getAgColumn(
					// Marže letos
					'profit_2_AY',
					'number',
					110,
					false,
					false,
					false,
					['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_2_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_2_AY,
									divisor: params.data.sales_2_AY,
									originalValue: params.data.margin_2_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_party',
			children: [
				getAgColumn( // Marže letos
					'profit_5_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_5_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_5_AY,
									divisor: params.data.sales_5_AY,
									originalValue: params.data.margin_5_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_prodejny_mo',
			children: [
				getAgColumn( // Marže letos
					'profit_4_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_4_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_4_AY,
									divisor: params.data.sales_4_AY,
									originalValue: params.data.margin_4_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_knihy',
			children: [
				getAgColumn( // Marže letos
					'profit_12_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_12_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_12_AY,
									divisor: params.data.sales_12_AY,
									originalValue: params.data.margin_12_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_posli_prani',
			children: [
				getAgColumn( // Marže letos
					'profit_13_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_13_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_13_AY,
									divisor: params.data.sales_13_AY,
									originalValue: params.data.margin_13_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		{
			field: 'group_ostatni',
			children: [
				getAgColumn( // Marže letos
					'profit_9_AY', 'number', 110,
					false, false, false, ['text-right'],
					{ ...getSumAggObj() }
				),

				getAgColumn( // %
					'margin_9_AY', 'number', 70,
					false, false, false, ['text-right'],
					{
						valueGetter: (params: ValueGetterParams) => {
							// @ts-ignore
							if (params.data && !params.node.group) {
								return {
									dividend: params.data.profit_9_AY,
									divisor: params.data.sales_9_AY,
									originalValue: params.data.margin_9_AY
								};
							}

							return null;
						},
						...getTotalDivisionAggObj()
					}
				)
			]
		},

		getAgColumn( // Náklady loni
			'distributionCost_LY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_DistributionCost_LY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.distributionCost_LY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.margin_DistributionCost_LY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		getAgColumn( // Náklady
			'distributionCost_AY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_DistributionCost_AY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.distributionCost_AY,
							divisor: params.data.basePrice_AY,
							originalValue: params.data.margin_DistributionCost_AY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		getAgColumn( // Náklady expedice loni
			'expeditionCost_LY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_ExpeditionCost_LY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.expeditionCost_LY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.margin_ExpeditionCost_LY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		getAgColumn( // Náklady expedice
			'expeditionCost_AY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_ExpeditionCost_AY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.expeditionCost_AY,
							divisor: params.data.basePrice_AY,
							originalValue: params.data.margin_ExpeditionCost_AY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		getAgColumn( // Náklady doprava loni
			'transportCost_LY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_TransportCost_LY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.transportCost_LY,
							divisor: params.data.basePrice_LY,
							originalValue: params.data.margin_TransportCost_LY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		),

		getAgColumn( // Náklady doprava
			'transportCost_AY', 'number', 110,
			false, false, false, ['text-right'],
			{ ...getSumAggObj() }
		),

		getAgColumn( // % (ZC)
			'margin_TransportCost_AY', 'number', 70,
			false, false, false, ['text-right'],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.transportCost_AY,
							divisor: params.data.basePrice_AY,
							originalValue: params.data.margin_TransportCost_AY
						};
					}

					return null;
				},
				...getTotalDivisionAggObj()
			}
		)
	]
};


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
	_documents: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_prodejnach_table_column_documents,
	_computedColumn1: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn1,
	_computedColumn2: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn2,
}
