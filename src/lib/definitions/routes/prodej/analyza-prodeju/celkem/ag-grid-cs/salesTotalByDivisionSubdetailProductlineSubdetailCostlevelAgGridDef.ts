import type {IAggFuncParams, IRowNode, ValueFormatterParams} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import {formatNumberToCzech} from "$lib/utils/general/formatNumberToCzech";
import {formatPercentage} from "$lib/utils/general/formatPercentage";
import * as m from "$lib/paraglide/messages";

function getDiff(
	dividendField: string,
	divisorField: string,
	params: IAggFuncParams
) {
	let dividendSum = 0;
	let divisorSum = 0;

	params.api.forEachNode((node: IRowNode) => {
		dividendSum += node.data[dividendField];
		divisorSum += node.data[divisorField];
	});

	if (divisorSum <= 0 && dividendSum > 0) return 1; // 100% growth

	if (divisorSum >= 0 && dividendSum < 0) return -1; // -100% decline

	if (divisorSum === 0 && dividendSum === 0) return 0; // 0% change

	return (dividendSum / divisorSum) - 1;
}


function getDiffFromBasePrice(
	salesField: string,
	basePriceField: string,
	params: IAggFuncParams
) {
	let sales = 0;
	let baseprice = 0;

	params.api.forEachNode((node: IRowNode) => {
		sales += node.data[salesField];
		baseprice += node.data[basePriceField];
	});

	if (baseprice !== 0) {
		return (sales / baseprice) - 1;
	}

	return 0;
}


export const SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn(
			"itemId", // Linie
			"number", 65,
			false, false, false,
			[],
		),

		getAgColumn(
			"itemName", // Název linie
			"text", 170,
			false, false, false,
			[],
		),

		getAgColumn(
			"currency", // Měna
			"text", 70,
			false, false, false,
			[],
		),

		getAgColumn(
			"sales_LY", // Celkem vloni
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
			"sales_AY", // Celkem letos
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
			"salesDiff", // %
			"number", 70,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiff("sales_AY", "sales_LY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0)
				}
			}
		),

		{
			field: "group_cz", // CZ
			children: [
				getAgColumn(
					"sales_CZ_LY", // Celkem vloni
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
					"sales_CZ_AY", // Celkem letos
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
					"sales_CZ_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_AY", "sales_CZ_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Wholesale_LY", // VO vloni
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
					"sales_CZ_Wholesale_AY", // VO letos
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
					"sales_CZ_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_Wholesale_AY", "sales_CZ_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Eshop_LY", // CZ eShop vloni
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
					"sales_CZ_Eshop_AY", // CZ eShop letos
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
					"sales_CZ_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_Eshop_AY", "sales_CZ_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_Retail_LY", // CZ prodejny vloni
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
					"sales_CZ_Retail_AY", // CZ prodejny letos
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
					"sales_CZ_Retail_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_Retail_AY", "sales_CZ_Retail_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_bakery", // Pekárny
			children: [
				getAgColumn(
					"sales_CZ_RetailBakery_LY", // Vloni
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
					"sales_CZ_RetailBakery_AY", // Letos
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
					"sales_CZ_RetailBakery_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_RetailBakery_AY", "sales_CZ_RetailBakery_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_kinoko", // Kinoko
			children: [
				getAgColumn(
					"sales_CZ_EshopKinoko_LY", // eShop vloni
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
					"sales_CZ_EshopKinoko_AY", // eShop letos
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
					"sales_CZ_EshopKinoko_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_EshopKinoko_AY", "sales_CZ_EshopKinoko_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_CZ_RetailKinoko_LY", // MO vloni
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
					"sales_CZ_RetailKinoko_AY", // MO letos
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
					"sales_CZ_RetailKinoko_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_RetailKinoko_AY", "sales_CZ_RetailKinoko_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_sk", // SK
			children: [
				getAgColumn(
					"sales_SK_LY", // SK celkem vloni
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
					"sales_SK_AY", // SK celkem letos
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
					"sales_SK_LY_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_SK_AY", "sales_SK_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Wholesale_LY", // SK VO vloni
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
					"sales_SK_Wholesale_AY", // SK VO letos
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
					"sales_SK_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_SK_Wholesale_AY", "sales_SK_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Eshop_LY", // SK eShop vloni
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
					"sales_SK_Eshop_AY", // SK eShop letos
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
					"sales_SK_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_SK_Eshop_AY", "sales_SK_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_SK_Retail_LY", // SK prodejny vloni
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
					"sales_SK_Retail_AY", // SK prodejny letos
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
					"sales_SK_Retail_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_SK_Retail_AY", "sales_SK_Retail_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_pl", // PL
			children: [
				getAgColumn(
					"sales_PL_LY", // PL celkem vloni
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
					"sales_PL_AY", // PL celkem letos
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
					"sales_PL_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_PL_AY", "sales_PL_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_PL_Wholesale_LY", // PL VO vloni
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
					"sales_PL_Wholesale_AY", // PL VO letos
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
					"sales_PL_Wholesale_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_PL_Wholesale_AY", "sales_PL_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),

				getAgColumn(
					"sales_PL_Eshop_LY", // PL eShop vloni
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
					"sales_PL_Eshop_AY", // PL eShop letos
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
					"sales_PL_Eshop_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_PL_Eshop_AY", "sales_PL_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},

		{
			field: "group_export", // Export
			children: [
				getAgColumn(
					"sales_CZ_Export_LY", // Export celkem vloni
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
					"sales_CZ_Export_AY", // Export celkem letos
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
					"sales_CZ_Export_Diff", // %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("sales_CZ_Export_AY", "sales_CZ_Export_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0)
						}
					}
				),
			]
		},


		{
			field: "group_zc", // ZC
			children: [
				getAgColumn(
					"basePrice_LY", // Celkem vloni
					"number", 105,
					false, false, false,
					["text-right"],
					{
						aggFunc: 'sum',
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"basePrice_AY", // Celkem letos
					"number", 105,
					false, false, false,
					["text-right"],
					{
						aggFunc: 'sum',
						valueFormatter: (params: ValueFormatterParams) => {
							return formatNumberToCzech(params.value)
						}
					}
				),

				getAgColumn(
					"basePrice_Diff", // %
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiff("basePrice_AY", "basePrice_LY", params);
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			]
		},
		getAgColumn(
			"discount_LY", // Celkem sleva vloni %
			"number", 90,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiffFromBasePrice("sales_LY", "basePrice_LY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0);
				}
			}
		),

		getAgColumn(
			"discount_AY", // Celkem sleva letos %
			"number", 90,
			false, false, false,
			["text-right"],
			{
				aggFunc: (params: IAggFuncParams) => {
					return getDiffFromBasePrice("sales_AY", "basePrice_AY", params)
				},
				valueFormatter: (params: ValueFormatterParams) => {
					return formatPercentage(params.value, 0);
				}
			}
		),

		{
			field: "group_cz", // CZ
			children: [
				getAgColumn(
					"discount_CZ_LY", // Celkem sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_LY", "basePrice_CZ_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_AY", // Celkem sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_AY", "basePrice_CZ_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Wholesale_LY", // VO sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Wholesale_LY", "basePrice_CZ_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Wholesale_AY", // VO sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Wholesale_AY", "basePrice_CZ_Wholesale_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Eshop_LY", // eShop sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Eshop_LY", "basePrice_CZ_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Eshop_AY", // eShop sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Eshop_AY", "basePrice_CZ_Eshop_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Retail_LY", // Prodejny sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Retail_LY", "basePrice_CZ_Retail_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Retail_AY", // Prodejny sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Retail_AY", "basePrice_CZ_Retail_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			],
		},

		{
			field: "group_bakery", // Pekárny
			children: [
				getAgColumn(
					"discount_CZ_RetailBakery_LY", // Sleva vloni %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_RetailBakery_LY", "basePrice_CZ_RetailBakery_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_RetailBakery_AY", // Sleva letos %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_RetailBakery_AY", "basePrice_CZ_RetailBakery_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			]
		},

		{
			field: "group_kinoko", // Kinoko
			children: [
				getAgColumn(
					"discount_CZ_EshopKinoko_LY", // eShop sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_EshopKinoko_LY", "basePrice_CZ_EshopKinoko_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_EshopKinoko_AY", // eShop sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_EshopKinoko_AY", "basePrice_CZ_EshopKinoko_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_RetailKinoko_LY", // MO sleva vloni %
					"number", 85,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_RetailKinoko_LY", "basePrice_CZ_RetailKinoko_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_RetailKinoko_AY", // MO sleva letos %
					"number", 85,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_RetailKinoko_AY", "basePrice_CZ_RetailKinoko_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			]
		},

		{
			field: "group_sk", // SK
			children: [
				getAgColumn(
					"discount_SK_LY", // Celkem sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_LY", "basePrice_SK_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_AY", // Celkem sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_AY", "basePrice_SK_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Wholesale_LY", // VO sleva vloni %
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Wholesale_LY", "basePrice_SK_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Wholesale_AY", // VO sleva letos %
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Wholesale_AY", "basePrice_SK_Wholesale_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Eshop_LY", // eShop sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Eshop_LY", "basePrice_SK_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Eshop_AY", // eShop sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Eshop_AY", "basePrice_SK_Eshop_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Retail_LY", // Prodejny sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Retail_LY", "basePrice_SK_Retail_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_SK_Retail_AY", // Prodejny sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_SK_Retail_AY", "basePrice_SK_Retail_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			],
		},

		{
			field: "group_pl", // PL
			children: [
				getAgColumn(
					"discount_PL_LY", // Celkem sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_LY", "basePrice_PL_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_PL_AY", // Celkem sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_AY", "basePrice_PL_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_PL_Wholesale_LY", // VO sleva vloni %
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_Wholesale_LY", "basePrice_PL_Wholesale_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_PL_Wholesale_AY", // VO sleva letos %
					"number", 80,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_Wholesale_AY", "basePrice_PL_Wholesale_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_PL_Eshop_LY", // eShop sleva vloni %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_Eshop_LY", "basePrice_PL_Eshop_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_PL_Eshop_AY", // eShop sleva letos %
					"number", 90,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_PL_Eshop_AY", "basePrice_PL_Eshop_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			],
		},

		{
			field: "group_export", // Export
			children: [
				getAgColumn(
					"discount_CZ_Export_LY", // Export sleva vloni %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Export_LY", "basePrice_CZ_Export_LY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),

				getAgColumn(
					"discount_CZ_Export_AY", // Export sleva letos %
					"number", 70,
					false, false, false,
					["text-right"],
					{
						aggFunc: (params: IAggFuncParams) => {
							return getDiffFromBasePrice("sales_CZ_Export_AY", "basePrice_CZ_Export_AY", params)
						},
						valueFormatter: (params: ValueFormatterParams) => {
							return formatPercentage(params.value, 0);
						}
					}
				),
			]
		},
	]
}


export const SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations = {
	itemId: () => "KLP",
	itemName: () => "Název KLP",
	currency: m.routes_prodej_analyza_prodeju_table_column_currency,
	sales_LY: m.routes_prodej_analyza_prodeju_table_column_sales_ly,
	sales_AY: m.routes_prodej_analyza_prodeju_table_column_sales_ay,
	salesDiff: m.routes_prodej_analyza_prodeju_table_column_diff,
	group_cz: m.routes_prodej_analyza_prodeju_table_column_group_cz,
	sales_CZ_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_ly,
	sales_CZ_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_ay,
	sales_CZ_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_diff,
	sales_CZ_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_ly,
	sales_CZ_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_ay,
	sales_CZ_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_wholesale_diff,
	sales_CZ_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_ly,
	sales_CZ_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_ay,
	sales_CZ_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshop_diff,
	sales_CZ_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_ly,
	sales_CZ_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_ay,
	sales_CZ_Retail_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retail_diff,
	sales_CZ_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_ly,
	sales_CZ_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_ay,
	sales_CZ_RetailBakery_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailbakery_diff,
	sales_CZ_EshopKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_ly,
	sales_CZ_EshopKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_ay,
	sales_CZ_EshopKinoko_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_eshopkinoko_diff,
	sales_CZ_RetailKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_ly,
	sales_CZ_RetailKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_ay,
	sales_CZ_RetailKinoko_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_retailkinoko_diff,
	group_sk: m.routes_prodej_analyza_prodeju_table_column_group_sk,
	sales_SK_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ly,
	sales_SK_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ay,
	sales_SK_LY_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_ly_diff,
	sales_SK_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_ly,
	sales_SK_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_ay,
	sales_SK_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_wholesale_diff,
	sales_SK_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_ly,
	sales_SK_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_ay,
	sales_SK_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_eshop_diff,
	sales_SK_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_ly,
	sales_SK_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_ay,
	sales_SK_Retail_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_sk_retail_diff,
	group_pl: m.routes_prodej_analyza_prodeju_table_column_group_pl,
	sales_PL_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_ly,
	sales_PL_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_ay,
	sales_PL_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_diff,
	sales_PL_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_ly,
	sales_PL_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_ay,
	sales_PL_Wholesale_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_wholesale_diff,
	sales_PL_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_ly,
	sales_PL_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_ay,
	sales_PL_Eshop_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_pl_eshop_diff,
	group_export: m.routes_prodej_analyza_prodeju_table_column_group_export,
	sales_CZ_Export_LY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_ly,
	sales_CZ_Export_AY: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_ay,
	sales_CZ_Export_Diff: m.routes_prodej_analyza_prodeju_table_column_sales_cz_export_diff,
	group_zc: m.routes_prodej_analyza_prodeju_table_column_group_zc,
	basePrice_LY: m.routes_prodej_analyza_prodeju_table_column_baseprice_ly,
	basePrice_AY: m.routes_prodej_analyza_prodeju_table_column_baseprice_ay,
	basePrice_Diff: m.routes_prodej_analyza_prodeju_table_column_baseprice_diff,
	discount_LY: m.routes_prodej_analyza_prodeju_table_column_discount_ly,
	discount_AY: m.routes_prodej_analyza_prodeju_table_column_discount_ay,
	discount_CZ_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_ly,
	discount_CZ_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_ay,
	discount_CZ_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_wholesale_ly,
	discount_CZ_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_wholesale_ay,
	discount_CZ_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshop_ly,
	discount_CZ_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshop_ay,
	discount_CZ_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retail_ly,
	discount_CZ_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retail_ay,
	group_bakery: m.routes_prodej_analyza_prodeju_table_column_group_pekarny,
	discount_CZ_RetailBakery_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailbakery_ly,
	discount_CZ_RetailBakery_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailbakery_ay,
	group_kinoko: m.routes_prodej_analyza_prodeju_table_column_group_kinoko,
	discount_CZ_EshopKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshopkinoko_ly,
	discount_CZ_EshopKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_eshopkinoko_ay,
	discount_CZ_RetailKinoko_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailkinoko_ly,
	discount_CZ_RetailKinoko_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_retailkinoko_ay,
	discount_SK_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_ly,
	discount_SK_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_ay,
	discount_SK_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_wholesale_ly,
	discount_SK_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_wholesale_ay,
	discount_SK_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_eshop_ly,
	discount_SK_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_eshop_ay,
	discount_SK_Retail_LY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_retail_ly,
	discount_SK_Retail_AY: m.routes_prodej_analyza_prodeju_table_column_discount_sk_retail_ay,
	discount_PL_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_ly,
	discount_PL_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_ay,
	discount_PL_Wholesale_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_wholesale_ly,
	discount_PL_Wholesale_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_wholesale_ay,
	discount_PL_Eshop_LY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_eshop_ly,
	discount_PL_Eshop_AY: m.routes_prodej_analyza_prodeju_table_column_discount_pl_eshop_ay,
	discount_CZ_Export_LY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_export_ly,
	discount_CZ_Export_AY: m.routes_prodej_analyza_prodeju_table_column_discount_cz_export_ay,
}
