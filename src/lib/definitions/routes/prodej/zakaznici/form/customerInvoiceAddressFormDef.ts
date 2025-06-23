import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";
import {getInvoiceCountryCodesWithName} from "$lib/utils/dropdowns/countryCodes";

export const customerInvoiceAddressFormDef: AutoFormSimpleType = [
	{
		rowType: "row",
		rowInputs: [
			{
				field: "name",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_name,
				type: "text",
				schema: z.string(),
			},
		]
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "street",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_street,
				type: "text",
				schema: z.string(),
			},
			{
				field: "city",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_city,
				type: "text",
				schema: z.string(),
			},
		]
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "postalCode",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_postal_code,
				type: "text",
				schema: z.string(),
			},
			{
				field: "countryCode",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_country_code,
				type: "dropdown",
				asyncDropdownOptions: getInvoiceCountryCodesWithName,
				schema: z.string(),
			},
		]
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "ico",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_ico,
				type: "number",
				schema: z.number(),
			},
			{
				field: "dic",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_dic,
				type: "text",
				schema: z.string(),
			},
		]
	},
	{
		rowType: "row",
		rowInputs: [
			{
				field: "icDph",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_icdph,
				type: "text",
				schema: z.string(),
			},
			{
				field: "companyName",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_company_name,
				type: "text",
				schema: z.string(),
			},
		]
	}
]
