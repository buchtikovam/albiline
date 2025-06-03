import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';
import type {GridOptions, IAggFuncParams, IRowNode, ValueFormatterParams, ValueGetterParams} from "ag-grid-enterprise";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";


function getDiff(
	dividendField: string,
	divisorField: string,
	params: IAggFuncParams
) {
	let dividendSum = 0;
	let divisorSum = 0;

	// console.log(params)

	params.api.forEachNodeAfterFilter((node: IRowNode) => {
		dividendSum += node.data[dividendField];
		divisorSum += node.data[divisorField];
	});

	if (divisorSum <= 0 && dividendSum > 0) return 1; // 100% growth

	if (divisorSum >= 0 && dividendSum < 0) return -1; // -100% decline

	if (divisorSum === 0 && dividendSum === 0) return 0; // 0% change

	return (dividendSum / divisorSum) - 1;
}


function getDivision(
	dividentField: string,
	divisorField: string,
	params: IAggFuncParams,
	substract?: boolean
) {
	let dividentSum = 0;
	let divisorSum = 0;

	params.api.forEachNodeAfterFilter((node: IRowNode) => {
		dividentSum += node.data[dividentField];
		divisorSum += node.data[divisorField];
	});

	if (substract) {
		return (dividentSum / divisorSum) - 1;
	}

	if (divisorSum !== 0) {
		return dividentSum / divisorSum;
	}

	return 0;
}


let totalRowNodes = $state({ });


export const SalesCustomdetailByCustomersAgGridDefSvelte: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "pinnedBottom",
	suppressStickyTotalRow: false,
	enableRowPinning: true,
	// onFirstDataRendered: () => {
	// 	const value = getGrandTotalRow();
	// 	if (value === "isRowPinned") {
	// 		setGrandTotalRow(gridApi, "bottom");
	// 		setIsRowPinned(gridApi, "top");
	// 	} else {
	// 		setGrandTotalRow(gridApi, value);
	// 	}
	// },
	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn(
			"salesCountryCode", // Země
			"text", 65,
			false, false, false,
			[],
		),

		getAgColumn(
			"dealerCode", // OZ
			"number", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"managerCode", // OM
			"number", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"customerNodeCode", // Číslo zákazníka
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"customerNodeName", // Zákazník
			"text", 200,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantity_LY", // Kusů vloni
			"number", 80,
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
			"number", 80,
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
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("quantity_AY", "quantity_LY", params);
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),


		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[],
		),


		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnQuantity_LY", // Vráceno ks vloni
					"number", 80,
					false, true, false,
					["text-right", "text-red-700"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"returnQuantity_AY", // Vráceno ks letos
					"number", 80,
					false, true, false,
					["text-right", "text-red-700"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),
			]
		},



		getAgColumn(
			"salesPerItem_LY", // Prodej/kus vloni
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					// console.log(params.api())
					return getDivision("sales_LY", "quantity_LY",  params);
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"salesPerItem_AY", // Prodej/kus letos
			"number", 105,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDivision("sales_AY", "quantity_AY", params);
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				}
			}
		),

		getAgColumn(
			"salesPerItem_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => { // todo: doesnt match
					let lyArr: number[] = [];
					let ayArr: number[] = [];

					params.api.forEachNode((node: IRowNode) => {
						lyArr.push(node.data["salesPerItem_LY"]);
						ayArr.push(node.data["salesPerItem_AY"])
					})

					const sumLy = lyArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
					const sumAy = ayArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

					let avg_salesperitem_ly = sumLy / lyArr.length;
					let avg_salesperitem_ay = sumAy / ayArr.length;

					if (avg_salesperitem_ly <= 0 && avg_salesperitem_ay > 0) return 1;

					if (avg_salesperitem_ly >= 0 && avg_salesperitem_ay < 0) return -1;

					if (avg_salesperitem_ly === 0 && avg_salesperitem_ay === 0) return 0;

					return avg_salesperitem_ay / avg_salesperitem_ly - 1
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		getAgColumn(
			"sales_LY", // Prodej vloni
			"number", 100,
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
			"number", 100,
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
			"number", 100,
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
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("sales_AY", "sales_LY", params);
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		{
			field: "group_vratky", // Vratky
			children: [
				getAgColumn(
					"returnSales_LY", // Dobropisy vloni
					"number", 90,
					false, true, false,
					["text-right", "text-red-700"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						},
					}
				),
				getAgColumn(
					"returnSales_AY", // Dobropisy letos
					"number", 90,
					false, true, false,
					["text-right", "text-red-700"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						},
					}
				),
			]
		},

		getAgColumn(
			"basePrice_LY", // ZC vloni
			"number", 90,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				},
			}
		),

		getAgColumn(
			"basePrice_AY", // ZC letos
			"number", 90,
			false, false, false,
			["text-right"],
			{
				aggFunc: "sum",
				valueFormatter: (params: ValueFormatterParams) => {
					return formatNumberToCzech(params.value)
				},
			}
		),

		getAgColumn(
			"basePrice_Diff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("basePrice_AY", "basePrice_LY", params);
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				},
			}
		),

		{
			field: "group_slevy", // Slevy
			children: [
				getAgColumn(
					"discount_LY", // Sleva vloni
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						},
					}
				),

				getAgColumn(
					"discount_AY", // Sleva letos
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: "sum",
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						},
					}
				),

				getAgColumn(
					"discount_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("discount_AY", "discount_LY", params);
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						},
					}
				),

				getAgColumn(
					"discountPct_LY", // % slevy vloni
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => { // todo: doesnt match
							return getDivision("sales_LY", "basePrice_LY", params, true);
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						},
					}
				),

				getAgColumn(
					"discountPct_AY", // % slevy letos
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {  // todo: doesnt match
							return getDivision("sales_AY", "basePrice_AY", params, true);
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						},
					}
				),
			]
		},
		//
		// getAgColumn(
		// 	"_computedColumn1", // % z obratu vloni
		// 	"number", 90,
		// 	false, false, false,
		// 	["text-right"],
		// 	{
		// 		valueGetter: (params: ValueGetterParams) => {
		// 			// params.data contains the data for the current row.
		//
		// 			if (!params.data || typeof params.data.sales_LY !== 'number') {
		// 				return null;
		// 			}
		//
		// 			const currentRowSalesLY: number = params.data.sales_LY;
		// 			let totalSalesLY = 0;
		//
		// 			console.log(params)
		//
		// 			params.api.forEachNode((node: IRowNode) => {
		// 				if (node.data && typeof node.data.sales_LY === 'number') {
		// 					totalSalesLY += node.data.sales_LY;
		// 				}
		// 			});
		//
		// 			if (totalSalesLY === 0) {
		// 				return currentRowSalesLY === 0 ? 0 : null;
		// 			}
		//
		// 			return currentRowSalesLY / totalSalesLY;
		// 		},
		//
		// 		valueFormatter: (params: ValueFormatterParams) => {
		// 			return formatPercentage(params.value, 0);
		// 		},
		//
		// 		aggFunc: 'sum',
		// 	}
		// ),

		//
		// getAgColumn(
		// 	"_computedColumn2", // % z obratu letos
		// 	"number", 90,
		// 	false, false, false,
		// 	["text-right"],
		// 	{
		// 		valueGetter: (params: ValueGetterParams) => {
		// 			// params.data contains the data for the current row.
		// 			if (!params.data || typeof params.data.sales_AY !== 'number') {
		// 				return null;
		// 			}
		//
		// 			const currentRowSalesAY: number = params.data.sales_AY;
		// 			let totalSalesAY = 0;
		//
		// 			params.api.forEachNode((node: IRowNode) => {
		// 				if (node.data && typeof node.data.sales_AY === 'number') {
		// 					totalSalesAY += node.data.sales_AY;
		// 				}
		// 			});
		//
		// 			if (totalSalesAY === 0) {
		// 				return currentRowSalesAY === 0 ? 0 : null;
		// 			}
		//
		// 			return currentRowSalesAY / totalSalesAY;
		// 		},
		//
		// 		valueFormatter: (params: ValueFormatterParams) => {
		// 			return formatPercentage(params.value, 0);
		// 		},
		//
		// 		aggFunc: 'sum',
		// 	}
		// ),


	]
}


export const SalesCustomdetailByCustomersHeaderTranslations = {
	salesCountryCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesCountryCode,
	dealerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_dealerCode,
	managerCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_managerCode,
	customerNodeCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_customerNodeCode,
	customerNodeName: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_customerNodeName,
	quantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_LY,
	quantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_AY,
	quantity_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_quantity_Diff,
	returnQuantity_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnQuantity_LY,
	returnQuantity_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnQuantity_AY,
	salesPerItem_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_LY,
	salesPerItem_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_AY,
	salesPerItem_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_salesPerItem_Diff,
	sales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_LY,
	sales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_AY,
	sales_DiffAbs: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_DiffAbs,
	sales_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_sales_Diff,
	returnSales_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnSales_LY,
	returnSales_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_returnSales_AY,
	basePrice_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_LY,
	basePrice_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_AY,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_basePrice_Diff,
	discount_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_LY,
	discount_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_AY,
	discount_Diff: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discount_Diff,
	discountPct_LY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discountPct_LY,
	discountPct_AY: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_discountPct_AY,
	_computedColumn1: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn1,
	_computedColumn2: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_computedColumn2,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_currency,
	group_vratky: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_vratky,
	group_slevy: m.routes_prodej_analyza_prodeju_po_zakaznicich_table_column_group_slevy
};
