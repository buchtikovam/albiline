import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.customerNodeCode}`)

	if (res.ok) {
		const response = await res.json();
		const contacts = response.contacts;
		const item = response.item;

		if (contacts && item) {
			return {
				response: {
					item: item,
					contacts: contacts
				},
				state: {
					status: "success",
					message: ""
				}
			};
		}
	}

	return {
		response: {
			item: {
				customerNodeCode: null,
				name: "",
				companyName: "",
				street: "",
				city: "",
				postalCode: "",
				countryCode: "",
				ico: "",
				dic: "",
				icDph: "",
				paymentTypeCode: "",
				dueDays: null,
				invoiceCopies: null,
				deliveryNoteCopies: null,
				customerStoreCode: null,
				consignmentSaleEnabled: false,
				isReturnAllowed: false,
				useAssortedEanCodes: false,
				customerAlbiCode: null,
				keyCustomerTypeId: null,
				creditLimit: null,
				unpaidAmount: null,
				lastPaymentDate: null,
				email: "",
				ediInboxEanCode: null,
				ediInboxEanCodeForInvoice: null,
				customerStoreEan: null,
				sendDeliveryNoteViaEdi: false,
				sendInvoiceViaEdi: false,
				sendCreditNoteViaEdi: false,
				useDiacriticalMarksInEdiDocuments: false,
				consignmentOutputCheck: false,
				isChargedWithoutVat: false,
				claimNotificationDisabled: false,
				isBadPayer: false,
				tradeLicenseReceived: false,
				printPricesOnDeliveryNote: false,
				allwaysAllowOrdering: false,
				b2BeshopEnabled: false,
				isApproved: false,
				sendInvoiceAfterApproval: false,
				invoiceConfirmationNotRequired: false,
				isBlocked: false,
				contractReceived: false
			},
			contacts: [],
		},
		state: {
			status: "fail",
			message: "not-found"
		}
	};
};
