import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn";
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'



export const customerInvoiceAddressCustomGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"validFrom", // Platnost od
			"date", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"validTo", // Platnost do
			"date", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"ico", // IČO
			"text", 90,
			false, false, false,
			[]
		),

		getAgColumn(
			"name", // Jméno
			"text", 240,
			false, false, false,
			[]
		),

		getAgColumn(
			"street", // Ulice
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"city", // Město
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"postalCode", // PSČ
			"text", 90,
			false, false, false,
			[]
		),

		getAgColumn(
			"countryCode", // Země // todo: enum
			"text", 90,
			false, false, false,
			[]
		),
	],
}



export const customerInvoiceAddressHeaderTranslations = {
	validFrom: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_valid_from,
	validTo: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_valid_to,
	ico: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_ico,
	name: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_name,
	street: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_street,
	city: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_city,
	postalCode: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_postal_code,
	countryCode: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_country_code,
}
