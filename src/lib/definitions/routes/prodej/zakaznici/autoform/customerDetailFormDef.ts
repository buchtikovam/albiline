import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import type { AutoFormType } from '$lib/types/components/form/autoform';
import Repeat from 'lucide-svelte/icons/repeat';
import * as m from '$lib/paraglide/messages.js'


export const customerDetailFormDef: AutoFormType = {
	left: [
		{
			id: uuidv4(),
			field: "section_fakturacni_adresa",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_fakturacni_adresa,
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			icon: Repeat,
			isOpen: true,
			rows: [
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
							dropdownOptions: ["CZ", "SK", "PL"],
							schema: z.enum(["CZ", "SK", "PL"]),
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
		},
		{
			id: uuidv4(),
			field: "section_nastaveni_fakturace",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_nastaveni_fakturace,
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "row",
					rowInputs: [
						{
							type: "dropdown",
							field: "paymentTypeCode",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_payment_type_code,
							dropdownOptions: ["V", "A", "B", "C"],
							schema: z.enum(["V", "A", "B", "C"]),
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
		}
	],
	right: [
		{
			id: uuidv4(),
			field: "section_dalsi_udaje",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_dalsi_udaje,
			isOpen: true,
			rows: [
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
							schema: z.date(),
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
		},

		{
			id: uuidv4(),
			field: "section_edi",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_edi,
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "row",
					rowInputs: [
						{
							type: "number",
							field: "ediInboxEanCode",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_edi_inbox_ean_code,
							schema: z.number(),
						},
						{
							type: "number",
							field: "ediInboxEanCodeForInvoice",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_edi_inbox_ean_code_for_invoice,
							schema: z.number(),
						},
					],
				},
				{ // row 2
					rowType: "row",
					rowInputs: [
						{
							type: "number",
							field: "customerStoreEan",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_customer_store_ean,
							schema: z.number(),
						},
						{
							type: "empty",
						},
					],
				},
				{ // row 3
					rowType: "checkbox",
					rowInputs: [
						{
							type: "checkbox",
							field: "sendDeliveryNodeViaEdi",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_delivery_note_via_edi,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "sendCreditNoteViaEdi",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_credit_note_via_edi,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "useDiacriticalMarksInEdiDocuments",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_use_diacritical_marks_in_edi_documents,
							schema: z.boolean(),
						},
						{
							type: "checkbox",
							field: "sendInvoiceViaEdi",
							translation: m.routes_prodej_zakaznici_customer_detail_form_input_send_invoice_via_edi,
							schema: z.boolean(),
						},
					]
				},
			]
		},
		{
			id: uuidv4(),
			field: "section_nastaveni",
			translation: m.routes_prodej_zakaznici_customer_detail_form_section_nastaveni,
			isOpen: true,
			rows: [
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
		}
	]
}
