import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import type { AutoFormType } from '$lib/types/components/form/autoform/autoform';
import Repeat from 'lucide-svelte/icons/repeat';

export const customerDetailFormDef: AutoFormType = {
	col1 : [
		{
			field: "section_fakturacni_adresa",
			id: uuidv4(),
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			dialogIcon: Repeat,
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"name": {
							type: "text",
							schema: z.string().min(1).max(255),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"street": {
							type: "text",
							schema: z.string().max(255),
						},
						"city": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"postalCode": {
							type: "text",
							schema: z.string().max(10), // regex for postal code
						},
						"countryCode": {
							type: "dropdown",
							dropdownOptions: ["CZ", "SK", "PL"],
							schema: z.enum(["CZ", "SK", "PL"]),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"ico": {
							type: "number",
							schema: z.number().min(8).max(8),
						},
						"dic": {
							type: "text",
							schema: z.string().min(8).max(10),
						},
					}
				},
				{ // row 5
					rowType: "full",
					inputs: {
						"icDph": {
							type: "text",
							schema: z.string().min(8).max(10),
						},
						"companyName": {
							type: "text",
							schema: z.string().max(255),
						},
					}
				}
			]
		},

		{
			field: "section_nastaveni_fakturace",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"paymentTypeCode": {
							type: "dropdown",
							dropdownOptions: ["V", "A", "B", "C"],
							schema: z.enum(["V", "A", "B", "C"]),
						},
						"dueDays": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"invoiceCopies": {
							type: "number",
							schema: z.number(),
						},
						"deliveryNoteCopies": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"customerStoreCode": {
							type: "number",
							schema: z.number(),
						},
						"_customerStoreCode": {
							type: "empty",
						},
					}
				},
				{ // row 4
					rowType: "checkbox",
					inputs: {
						"consignmentSaleEnabled": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isReturnAllowed": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"useAssortedEanCodes": {
							type: "checkbox",
							schema: z.boolean(),
						},
					}
				},
			]
		}
	],

	col2 : [
		{
			field: "section_dalsi_udaje",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"customerAlbiCode": {
							type: "text",
							schema: z.string(),
						},
						"keyCustomerTypeId": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"creditLimit": {
							type: "number",
							schema: z.number(),
						},
						"unpaidAmount": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"lastPaymentDate": {
							type: "date",
							schema: z.date(),
						},
						"email": {
							type: "text",
							schema: z.string().email(),
						},
					}
				},
			]
		},
		{
			field: "section_edi",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"ediInboxEanCode": {
							type: "number",
							schema: z.number(),
						},
						"ediInboxEanCodeForInvoice": {
							type: "number",
							schema: z.number(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"customerStoreEan": {
							type: "number",
							schema: z.number(),
						},
						"_customerStoreEan": {
							type: "empty",
						},
					}
				},
				{ // row 3
					rowType: "checkbox",
					inputs: {
						"sendDeliveryNodeViaEdi": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"sendCreditNoteViaEdi": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"useDiacriticalMarksInEdiDocuments": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"sendInvoiceViaEdi": {
							type: "checkbox",
							schema: z.boolean(),
						},
					}
				},
			]
		},
		{
			field: "section_nastaveni",
			id: uuidv4(),
			isOpen: true,
			rows: [
				{ // row 3
					rowType: "checkbox",
					inputs: {
						"consignmentOuputCheck": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"printPricesOnDeliveryNote": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"sendInvoiceAfterApproval": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isChargedWithoutVat": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"alwaysAllowOrdering": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"invoiceConfirmationNotRequired": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"claimNotificationDisabled": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"b2BeshopEnabled": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isBlocked": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isBadPlayer": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"isApproved": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"contractRecieved": {
							type: "checkbox",
							schema: z.boolean(),
						},
						"tradeLicenceRecieved": {
							type: "checkbox",
							schema: z.boolean(),
						},
					}
				},
			]
		}
	],
}
