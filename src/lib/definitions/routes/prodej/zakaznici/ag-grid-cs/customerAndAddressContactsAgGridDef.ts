import type {ColDef} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


export const customerAndAddressContactsHeaderTranslations = {
	name: m.routes_prodej_zakaznici_detail_contacts_input_name,
	surname: m.routes_prodej_zakaznici_detail_contacts_input_surname,
	mobile: m.routes_prodej_zakaznici_detail_contacts_input_mobile,
	phone: m.routes_prodej_zakaznici_detail_contacts_input_phone,
	email: m.routes_prodej_zakaznici_detail_contacts_input_email,
	note: m.routes_prodej_zakaznici_detail_contacts_input_note,
	isDefault: m.routes_prodej_zakaznici_detail_contacts_input_is_default,
	enabled: m.routes_prodej_zakaznici_detail_contacts_input_enabled,
	pdfInvoice: m.routes_prodej_zakaznici_detail_contacts_input_pdf_invoice,
	pdfDeliveryNote: m.routes_prodej_zakaznici_detail_contacts_input_pdf_delivery_note,
	csvInvoice: m.routes_prodej_zakaznici_detail_contacts_input_csv_invoice,
	csvDeliveryNote: m.routes_prodej_zakaznici_detail_contacts_input_csv_delivery_note,
	consignmentReturnInfo: m.routes_prodej_zakaznici_detail_contacts_input_consignment_return_info,
	consignmentInfo: m.routes_prodej_zakaznici_detail_contacts_input_consignment_info,
	carrierInfo: m.routes_prodej_zakaznici_detail_contacts_input_carrier_info,
}


export const customerAndAddressContactsAgGridDef: ColDef<any, any>[] = [
	{
		field: "isDefault",
		cellDataType: "boolean",
		width: 64,
	},
	{
		field: "enabled",
		cellDataType: "boolean",
		width: 56,
	},
	{
		field: "name",
		cellDataType: "text",
		width: 120,
	},
	{
		field: "surname",
		cellDataType: "text",
		width: 170,
	},
	{
		field: "mobile",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "phone",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "email",
		cellDataType: "text",
		width: 200,
	},
	{
		field: "note",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "pdfInvoice",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "pdfDeliveryNote",
		cellDataType: "boolean",
		width: 84,
	},
	{
		field: "csvInvoice",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "csvDeliveryNote",
		cellDataType: "boolean",
		width: 84,
	},
	{
		field: "consignmentReturnInfo",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "consignmentInfo",
		cellDataType: "boolean",
		width: 94,
	},
	{
		field: "carrierInfo",
		cellDataType: "boolean",
		width: 82,
	},
]
