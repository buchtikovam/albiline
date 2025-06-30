import type {GridOptions, ValueGetterParams} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';
import {getSumAggObj} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getSumAggObj";
import {
	totalGenericDivisionPercentageAggregator
} from "$lib/utils/components/ag-grid/agg-functions/aggregators/totalGenericDivisionPercentageAggregator";
import {
	getTotalGenericDivisionPercentageAggObj
} from "$lib/utils/components/ag-grid/agg-functions/agg-objects/getTotalGenericDivisionPercentageAggObj";
import type {CellClassParams} from "ag-grid-community";


export const SalesDocumentByCustomerorstoreAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	aggFuncs: {
		totalGenericDivisionPercentageAgg: totalGenericDivisionPercentageAggregator,
	},

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn( // Země
			"salesCountryCode", "text", 70,
			false, false, false, []
		),

		getAgColumn( // Měna
			"currency", "text", 70,
			false, false, false, []
		),

		getAgColumn( // Pův. měna
			"isOriginalCurrency", "boolean", 70,
			false, false, false, []
		),

		getAgColumn( // Číslo faktury
			"documentCode", "number", 110,
			false, false, false, []
		),

		getAgColumn( // Číslo zákazníka
			"customerNodeCode", "number", 100,
			false, false, false, []
		),

		getAgColumn( // Číslo prodejny
			"deliveryAddressCode", "number", 100,
			false, false, false, []
		),

		getAgColumn( // Zákazník
			"customerName", "text", 220,
			false, false, false, []
		),

		getAgColumn( // Prodejna
			"storeName", "text", 220,
			false, false, false, []
		),

		getAgColumn( // Ulice
			"street", "text", 200,
			false, false, false, []
		),

		getAgColumn( // Město
			"city", "text", 200,
			false, false, false, []
		),

		getAgColumn( // DUZP
			"deliveryDate", "date", 110,
			false, false, false, ["text-right"],
			{ aggFunc: () => null }
		),

		getAgColumn( // ZC
			"basePrice", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Cena bez DPH po slevě
			"sales", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Sleva
			"discount", "number", 70,
			false, false, false, ["text-right"],
			{
				valueGetter: (params: ValueGetterParams) => {
					// @ts-ignore
					if (params.data && !params.node.group) {
						return {
							dividend: params.data.sales,
							divisor: params.data.basePrice,
							originalValue: params.data.discount
						};
					}

					return null;
				},
				...getTotalGenericDivisionPercentageAggObj()
			}
		),

		getAgColumn( // Cena vč. DPH po slevě
			"salesWithVat", "number", 110,
			false, false, false, ["text-right"],
			{ ...getSumAggObj() }
		),

		getAgColumn( // Informace o úhradě
			"paymentInfo", "text", 140,
			false, false, false, [],
			{
				cellClassRules: {
					"text-amber-500": (params: CellClassParams) => params.value ?params.value.startsWith("Před") : false,
					"text-red-600": (params: CellClassParams) =>  params.value ? params.value.startsWith("Po") : false,
				}
			}
		),
	]
}


export const SalesDocumentByCustomerorstoreHeaderTranslations = {
	salesCountryCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_salesCountryCode,
	currency: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_currency,
	isOriginalCurrency: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_isOriginalCurrency,
	documentCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_documentCode,
	customerNodeCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_customerNodeCode,
	deliveryAddressCode: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_deliveryAddressCode,
	customerName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_customerName,
	storeName: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_storeName,
	street: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_street,
	city: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_city,
	deliveryDate: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_deliveryDate,
	basePrice: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_basePrice,
	sales: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_sales,
	discount: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_discount,
	salesWithVat: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_salesWithVat,
	paymentInfo: m.routes_prodej_analyza_prodeju_po_zakaznicich_a_fakturach_table_column_paymentInfo,
}
