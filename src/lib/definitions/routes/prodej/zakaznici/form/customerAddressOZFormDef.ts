import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";

export const customerAddressOZFormDef: AutoFormSimpleType = [
	{
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "dealerCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_dealer_code,
				schema: z.number(),
			},
			{
				type: "number",
				field: "areaCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_area_code,
				schema: z.number(),
			},
		]
	},
	{
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "areaId",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_area_id,
				schema: z.number(),
			},
			{
				type: "empty",
			},
		]
	},
]
