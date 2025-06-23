import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";
import {getDeliveryCountryCodesWithName} from "$lib/utils/dropdowns/countryCodes";

export const customerAddressDetailFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				type: "text",
				field: "name",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_name,
				schema: z.string(),
			},
		]
	},
	{ // row 2
		rowType: "row",
		rowInputs: [
			{
				type: "number",
				field: "customerAddressCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_customer_address_code,
				schema: z.number(),
			},
			{
				type: "text",
				field: "companyName",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_company_name,
				schema: z.string(),
			},
		]
	},
	{ // row 3
		rowType: "row",
		rowInputs: [
			{
				type: "text",
				field: "street",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_street,
				schema: z.string(),
			},
			{
				type: "text",
				field: "city",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_city,
				schema: z.string(),
			},
		]
	},
	{ // row 4
		rowType: "row",
		rowInputs: [
			{
				type: "text",
				field: "postalCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_postal_code,
				schema: z.string(),
			},
			{
				type: "dropdown",
				field: "countryCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_country_code,
				schema: z.string(),
				asyncDropdownOptions: getDeliveryCountryCodesWithName,
			},
		]
	}
]
