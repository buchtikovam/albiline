import { z } from 'zod';
import * as m from '$lib/paraglide/messages.js'
import type { AutoFormSimpleType } from '$lib/types/components/form/autoform';

export const newCustomerAddressFormDef: AutoFormSimpleType = [
	{
		rowType: "row",
		rowInputs: [
			{
				field: "name",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_name,
				schema: z.string().max(255),
			},
		],
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "companyName",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_company_name,
				schema: z.string().max(255),
			},
		],
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "street",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_street,
				schema: z.string().max(255),
			},

			{
				field: "city",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_city,
				schema: z.string().max(255),
			},
		],
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "postalCode",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_postal_code,
				schema: z.string().email().max(255),
			},
			{
				field: "countryCode",
				type: "text",
				translation: m.routes_prodej_zakaznici_address_detail_new_address_form_input_country_code,
				schema: z.string().max(255),
			},
		],
	},
]


