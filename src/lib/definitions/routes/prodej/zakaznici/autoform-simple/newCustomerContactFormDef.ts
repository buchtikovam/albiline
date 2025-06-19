import { z } from 'zod';
import * as m from '$lib/paraglide/messages.js'
import type { AutoFormSimpleType } from '$lib/types/components/form/autoform';


export const newCustomerContactFormDef: AutoFormSimpleType = [
	{
		rowType: "row",
		rowInputs: [
			{
				field: "name",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_name,
				type: "text",
				schema: z.string(),
			},
			{
				field: "surname",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_surname,
				type: "text",
				schema: z.string(),
			},
		],
	},

	{
		rowType: "row",
		rowInputs: [
			{
				field: "mobile",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_mobile,
				type: "text",
				schema: z.string(),
			},
			{
				field: "phone",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_phone,
				type: "text",
				schema: z.string(),
			},
		],
	},

	{
		rowType: "row",
		rowInputs: [
			{
				field: "email",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_email,
				type: "text",
				schema: z.string(),
			},
			{
				field: "note",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_note,
				type: "text",
				schema: z.string(),
			},
		],
	},

	{
		rowType: "checkbox",
		rowInputs: [
			{
				field: "isDefault",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_is_default,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "enabled",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_enabled,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "pdfInvoice",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_pdf_invoice,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "pdfDeliveryNote",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_pdf_delivery_note,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "csvDeliveryNote",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_csv_delivery_note,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "consignmentReturnInfo",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_consignment_return_info,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "consignmentInfo",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_consignment_info,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "carrierInfo",
				translation: m.routes_prodej_zakaznici_detail_contacts_input_carrier_info,
				type: "checkbox",
				schema: z.boolean(),
			},
		],
	},
]


