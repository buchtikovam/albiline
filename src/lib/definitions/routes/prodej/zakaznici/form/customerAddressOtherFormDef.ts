import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";

export const customerAddressOtherFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				type: "text",
				field: "note",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_note,
				schema: z.string(),
			},
		]
	},
]
