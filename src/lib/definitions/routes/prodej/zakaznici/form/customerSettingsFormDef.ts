import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
import * as m from "$lib/paraglide/messages";
import {z} from "zod";

export const customerSettingsFormDef: AutoFormSimpleType = [
	{ // row 3
		rowType: "checkbox",
		rowInputs: [
			{
				type: "checkbox",
				field: "consignmentOuputCheck",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_consignment_output_check,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "printPricesOnDeliveryNote",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_print_prices_on_delivery_note,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "sendInvoiceAfterApproval",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_invoice_after_approval,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "isChargedWithoutVat",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_is_charged_without_vat,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "alwaysAllowOrdering",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_always_allow_ordering,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "invoiceConfirmationNotRequired",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_invoice_confirmation_not_required,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "claimNotificationDisabled",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_claim_notification_disabled,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "b2BeshopEnabled",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_b2b_eshop_enabled,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "isBlocked",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_is_blocked,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "isBadPayer",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_is_bad_payer,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "isApproved",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_is_approved,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "contractRecieved",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_contract_recieved,
				schema: z.boolean(),
			},
			{
				type: "checkbox",
				field: "tradeLicenceRecieved",
				translation: m.routes_prodej_zakaznici_customer_detail_form_input_trade_licence_recieved,
				schema: z.boolean(),
			},
		],
	},

]
