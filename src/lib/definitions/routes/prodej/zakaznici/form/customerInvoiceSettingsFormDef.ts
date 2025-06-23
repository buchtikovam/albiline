import * as m from "$lib/paraglide/messages";
import {getPaymentTypeWithName} from "$lib/utils/dropdowns/paymentTypeCode";
import {z} from "zod";
import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";

export const customerInvoiceSettingsFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				type: "dropdown",
				field: "paymentTypeCode",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_payment_type_code,
				asyncDropdownOptions: getPaymentTypeWithName,
				schema: z.string(),
			},
			{
				type: "number",
				field: "dueDays",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_due_days,
				schema: z.number()
			}
		]
	},

	{ // row 2
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "invoiceCopies",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_invoice_copies,
				schema: z.number()
			},
			{
				type: "number",
				field: "deliveryNoteCopies",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_delivery_note_copies,
				schema: z.number()
			},
		]
	},
	{ // row 3
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "customerStoreCode",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_customer_store_code,
				schema: z.number()
			},
			{
				type: "empty"
			},
		]
	},
	{ // row 4
		rowType: "checkbox",
		rowInputs: [
			{
				type: "checkbox",
				field: "consignmentSaleEnabled",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_consignment_sale_enabled,
				schema: z.boolean(),
			},
			{
				field: "isReturnAllowed",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_is_return_allowed,
				type: "checkbox",
				schema: z.boolean(),
			},
			{
				field: "useAssortedEanCodes",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_use_assorted_ean_codes,
				type: "checkbox",
				schema: z.boolean(),
			},
		]
	},
]
