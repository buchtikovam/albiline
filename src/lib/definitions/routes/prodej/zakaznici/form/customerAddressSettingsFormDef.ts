import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {getPaymentTypeWithName} from "$lib/utils/dropdowns/paymentTypeCode";
import {z} from "zod";
import {getCustomerRanksWithDescription} from "$lib/utils/dropdowns/customerRank";
import {getRetailStoreTypeIdWithName} from "$lib/utils/dropdowns/retailStoreType";



export const customerAddressSettingsFormDef: AutoFormSimpleType = [
	{ // row 1
		rowType: "row",
		rowInputs: [
			{
				type: "dropdown",
				field: "paymentTypeCode",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_payment_type_code,
				asyncDropdownOptions: getPaymentTypeWithName,
				schema: z.string(),
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
				asyncDropdownOptions: getCustomerRanksWithDescription,
				schema: z.string(),
			},
			{
				type: "dropdown",
				field: "retailStoreTypeId",
				translation: m.routes_prodej_zakaznici_address_detail_form_input_retail_store_type_id,
				asyncDropdownOptions: getRetailStoreTypeIdWithName,
				schema: z.string(),
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
