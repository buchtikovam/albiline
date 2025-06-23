import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";

export const customerEdiFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "ediInboxEanCode",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_edi_inbox_ean_code,
				schema: z.number(),
			},
			{
				type: "number",
				field: "ediInboxEanCodeForInvoice",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_edi_inbox_ean_code_for_invoice,
				schema: z.number(),
			},
		],
	},
	{ // row 2
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "customerStoreEan",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_customer_store_ean,
				schema: z.number(),
			},
			{
				type: "empty",
			},
		],
	},
	{ // row 3
		rowType: "checkbox",
		rowInputs: [
			{
				type: "checkbox",
				field: "sendDeliveryNodeViaEdi",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_delivery_note_via_edi,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "sendCreditNoteViaEdi",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_credit_note_via_edi,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "useDiacriticalMarksInEdiDocuments",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_use_diacritical_marks_in_edi_documents,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "sendInvoiceViaEdi",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_invoice_via_edi,
				schema: z.boolean(),
			},
		]
	},
]
