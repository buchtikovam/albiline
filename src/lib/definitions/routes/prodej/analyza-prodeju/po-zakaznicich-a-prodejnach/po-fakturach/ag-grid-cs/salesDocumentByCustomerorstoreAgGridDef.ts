import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js';
import { getAgColumn } from '$lib/utils/components/ag-grid/getAgColumn.svelte';


export const SalesDocumentByCustomerorstoreAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		// Země
		getAgColumn("salesCountryCode", "text", 100, false, false, false, []),
		// Měna
		getAgColumn("currency", "text", 100, false, false, false, []),
		// Pův. měna
		getAgColumn("isOriginalCurrency", "boolean", 120, false, false, false, []),
		// Číslo faktury
		getAgColumn("documentCode", "number", 150, false, false, false, []),
		// Číslo zákazníka
		getAgColumn("customerNodeCode", "number", 150, false, false, false, []),
		// Číslo prodejny
		getAgColumn("deliveryAddressCode", "number", 150, false, false, false, []),
		// Zákazník
		getAgColumn("customerName", "text", 200, false, false, false, []),
		// Prodejna
		getAgColumn("storeName", "text", 200, false, false, false, []),
		// Ulice
		getAgColumn("street", "text", 200, false, false, false, []),
		// Město
		getAgColumn("city", "text", 150, false, false, false, []),
		// DUZP
		getAgColumn("deliveryDate", "date", 120, false, false, false, []),
		// ZC
		getAgColumn("basePrice", "number", 150, false, false, false, []),
		// Cena bez DPH po slevě
		getAgColumn("sales", "number", 200, false, false, false, []),
		// Sleva
		getAgColumn("discount", "number", 120, false, false, false, []),
		// Cena vč. DPH po slevě
		getAgColumn("salesWithVat", "number", 200, false, false, false, []),
		// Informace o úhradě
		getAgColumn("paymentInfo", "text", 200, false, false, false, []),
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
