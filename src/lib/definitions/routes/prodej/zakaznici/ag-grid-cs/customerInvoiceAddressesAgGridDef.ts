import type {ValueFormatterParams} from 'ag-grid-community';
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


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


export const customerInvoiceAddressCustomGridOptions: GridOptions = {
	columnDefs: [
		{
			field: "validFrom",
			cellDataType: "date",
			valueFormatter: (params: ValueFormatterParams) => {
				return new Date(params.value).toLocaleDateString(); // Format as desired
			},
			width: 120,
		},
		{
			field: "validTo",
			cellDataType: "date",
			valueFormatter: (params: ValueFormatterParams) => {
				return new Date(params.value).toLocaleDateString(); // Format as desired
			},
			width: 120,
		},
		{
			field: "ico",
			width: 90,
		},

		{
			field: "name",
			width: 240,
		},
		{
			field: "street",
			width: 200,
		},
		{
			field: "city",
			width: 200,
		},
		{
			field: "postalCode",
			width: 90,
		},
		{
			field: "countryCode",
			width: 90,
		},
	],
}
