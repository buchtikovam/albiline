import { z } from "zod";
import type { AutoFormType } from '$lib/types/components/form/autoform';
import { v4 as uuidv4 } from 'uuid';
import * as m from '$lib/paraglide/messages.js'


export const customerAddressDetailFormDef: AutoFormType = {
	left : [
		{
			id: uuidv4(),
			field: "section_addressDetail",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_address_detail,
			isOpen: true,
			rows: [
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
							dropdownOptions: ["CZ", "SK", "PL"],
							schema: z.enum(["CZ", "SK", "PL"]),
						},
					]
				}
			]
		},
		{
			id: uuidv4(),
			field: "section_oz",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_oz,
			isOpen: true,
			rows: [
				{ // row 5
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
				{ // row 6
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
		}
	],

	right : [
		{
			id: uuidv4(),
			field: "section_settings",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_settings,
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "row",
					rowInputs: [
						{
							type: "dropdown",
							field: "paymentTypeCode",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_payment_type_code,
							dropdownOptions: ["V", "A", "B", "C"],
							schema: z.enum(["V", "A", "B", "C"]),
						},
						{
							type: "number",
							field: "dueDays",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_due_days,
							schema: z.number(),
						},
					]
				},
				{ // row 2
					rowType: "row",
					rowInputs: [
						{
							type: "number",
							field: "invoiceCopies",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_invoice_copies,
							schema: z.number(),
						},
						{
							type: "number",
							field: "deliveryNoteCopies",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_delivery_note_copies,
							schema: z.number(),
						},
					]
				},
				{ // row 3
					rowType: "row",
					rowInputs: [
						{
							type: "dropdown",
							field: "customerRank",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_customer_rank,
							dropdownOptions: ["A", "B", "C", "D", "E", "F"],
							schema: z.enum(["A", "B", "C", "D", "E", "F"]),
						},
						{
							type: "dropdown",
							field: "retailStoreTypeId",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_retail_store_type_id,
							dropdownOptions: ["1", "2", "3", "4", "5"],
							schema: z.enum(["1", "2", "3", "4", "5"]),
						},
					]
				},
				{ // row 4
					rowType: "row",
					rowInputs: [
						{
							type: "number",
							field: "customerStoreCode",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_customer_store_code,
							schema: z.number(),
						},
						{
							type: "text",
							field: "customerStoreEan",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_customer_store_ean,
							schema: z.string(),
						},
					]
				},
				{ // row 5
					rowType: "row",
					rowInputs: [
						{
							type: "text",
							field: "packingNote",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_packing_note,
							schema: z.string(),
						},

					]
				},
				{ // row 6
					rowType: "checkbox",
					rowInputs: [
						{
							type: "checkbox",
							field: "consignmentSaleEnabled",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_consignment_sale_enabled,
							schema: z.string(),
						},
						{
							type: "checkbox",
							field: "isReturnAllowed",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_is_return_allowed,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "isForConsignmentReturn",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_is_for_consignment_return,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "useAssortedEanCodes",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_use_assorted_ean_codes,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "pickingBoxPacking",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_picking_box_packing,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "splitOrderByFood",
							translation: m.routes_prodej_zakaznici_address_detail_form_input_split_order_by_food,
							schema: z.boolean(),
						},
					]
				},
			]
		},
		{
			id: uuidv4(),
			field: "section_other",
			translation: m.routes_prodej_zakaznici_address_detail_form_section_other,
			isOpen: true,
			rows: [
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
		}
	]
}
