export type CustomerTypeWithNullables = {
	customerNodeCode: number | null;
	customerAddressCode: number | null;
	customerName: number | null;
	name: string | null;
	companyName: string | null;
	street: string | null;
	city: string | null;
	postalCode: string | null;
	countryCode: string | null;
	ico: string | null;
	dic: string | null;
	icDph: string | null;
	paymentTypeCode: string | null;
	dueDays: number | null;
	invoiceCopies: number | null;
	deliveryNoteCopies: number | null;
	customerStoreCode: number | null;
	consignmentSaleEnabled: boolean;
	isReturnAllowed: boolean;
	useAssortedEanCodes: boolean;
	customerAlbiCode: number | null;
	keyCustomerTypeId: number | null;
	creditLimit: number | null;
	unpaidAmount: number | null;
	lastPaymentDate: Date | null;
	email: string | null;
	ediInboxEanCode: number | null;
	ediInboxEanCodeForInvoice: number | null;
	customerStoreEan: number | null;
	sendDeliveryNoteViaEdi: boolean;
	sendInvoiceViaEdi: boolean;
	sendCreditNoteViaEdi: boolean;
	useDiacriticalMarksInEdiDocuments: boolean;
	consignmentOutputCheck: boolean;
	isChargedWithoutVat: boolean;
	claimNotificationDisabled: boolean;
	isBadPayer: boolean;
	tradeLicenseReceived: boolean;
	printPricesOnDeliveryNote: boolean;
	allwaysAllowOrdering: boolean;
	b2BeshopEnabled: boolean;
	isApproved: boolean;
	sendInvoiceAfterApproval: boolean;
	invoiceConfirmationNotRequired: boolean;
	isBlocked: boolean;
	contractReceived: boolean;
};


export type CustomerDetailSaveObjectType = {
	insert: CustomerContactType[],
	update: Record<string, any>[],
	delete: Record<string, any>[],
}


export type CustomerAddressDetailSaveObjectType = {
	insert: CustomerContactType[],
	update: Record<string, any>[],
	delete: Record<string, any>[],
}

export type CustomerAddressType = {
	id: number|null,
	customerNodeCode: number|null,
	customerName: string|null,
	name: string|null,
	customerAddressCode: string|null,
	companyName: string|null,
	street: string|null,
	city: string|null,
	postalCode: string|null,
	countryCode: string|null,
	note: string|null,
	paymentTypeCode: string|null,
	dueDays: number|null,
	invoiceCopies: number|null,
	deliveryNoteCopies: number|null,
	customerRank: string|null,
	retailStoreTypeId: string|null,
	customerStoreCode: string|null,
	customerStoreEan: string|null,
	packingNote: string|null,
	consignmentSaleEnabled: boolean,
	isReturnAllowed: boolean,
	isForConsignmentReturn: boolean,
	useAssortedEanCodes: boolean,
	pickingBoxPacking: boolean,
	splitOrderByFood: boolean,
	dealerCode: string|null,
	areaCode: string|null,
	areaId: string|null
}


export type CustomerContactType = {
	createdRowId?: number,
	customerPersonCode: number|null,
	isDefault: boolean,
	enabled: boolean,
	name: string|null,
	surname: string|null,
	mobile: string|null,
	phone: string|null,
	email: string|null,
	note: string|null,
	pdfInvoice: boolean,
	pdfDeliveryNote: boolean,
	csvDeliveryNote: boolean,
	consignmentReturnInfo: boolean,
	consignmentInfo: boolean,
	carrierInfo: boolean
}


export type CustomerInvoiceAddressType = {
	validFrom: string;
	validTo: string;
	ico: string;
	name: string;
	street: string;
	city: string;
	postalCode: string;
	countryCode: string;
}
