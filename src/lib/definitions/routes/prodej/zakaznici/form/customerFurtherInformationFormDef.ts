import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";
import {dateRegex} from "$lib/regex/dateRegex";

export const customerFurtherInformationFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				field: "customerAlbiCode",
				type: "text",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_customer_albi_code,
				schema: z.string(),
			},
			{
				type: "number",
				field: "keyCustomerTypeId",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_key_customer_type_id,
				schema: z.number(),
			},
		]
	},
	{ // row 2
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "creditLimit",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_credit_limit,
				schema: z.number(),
			},
			{
				type: "number",
				field: "unpaidAmount",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_unpaid_amount,
				schema: z.number(),
			},
		],
	},
	{ // row 3
		rowType: "row",
		rowInputs: [
			{
				type: "date",
				field: "lastPaymentDate",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_last_payment_date,
				schema: z.string().regex(dateRegex, {
					message: "dd.mm.yyyy hh:mm:ss:ms"
				}),
			},
			{
				type: "text",
				field: "email",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_email,
				schema: z.string().email(),
			},
		]
	},
]
