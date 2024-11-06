import Pencil from "lucide-svelte/icons/pencil";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import type { AutoFormNew } from '$lib/types/components/form/autoform/autoformNew';



export const customerDetailFormDef: AutoFormNew = {
	col1 : [
		{
			field: "section_fakturacni_adresa",
			id: uuidv4(),
			hasDialog: true,
			dialogId: "customer-detail-invoice-addresses",
			dialogIcon: Pencil,
			isOpen: true,
			rows: [
				{ // row 1
					rowType: "full",
					inputs: {
						"name": {
							type: "text",
							schema: z.string(),
						},
						"companyName": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"street": {
							type: "text",
							schema: z.string(),
						},
						"city": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"postalCode": {
							type: "text",
							schema: z.string(),
						},
						"countryCode": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 4
					rowType: "full",
					inputs: {
						"ico": {
							type: "text",
							schema: z.string(),
						},
						"dic": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 5
					rowType: "full",
					inputs: {
						"icDph": {
							type: "text",
							schema: z.string(),
						},
						"_icDph": {
							type: "empty",
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
							type: "text",
							schema: z.string(),
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
							type: "text",
							schema: z.string(),
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
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"creditLimit": {
							type: "text",
							schema: z.string(),
						},
						"unpaidAmount": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 3
					rowType: "full",
					inputs: {
						"lastPaymentDate": {
							type: "text",
							schema: z.string(),
						},
						"email": {
							type: "text",
							schema: z.string(),
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
							type: "text",
							schema: z.string(),
						},
						"ediInboxEanCodeForInvoice": {
							type: "text",
							schema: z.string(),
						},
					}
				},
				{ // row 2
					rowType: "full",
					inputs: {
						"customerStoreEan": {
							type: "text",
							schema: z.string(),
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
