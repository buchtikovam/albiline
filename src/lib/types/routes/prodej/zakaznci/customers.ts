export type CustomerType = {
	customerNodeCode: number;
	customerAddressCode: number;
	customerName: number;
	name: string;
	companyName: string;
	street: string;
	city: string;
	postalCode: string;
	countryCode: string;
	ico: string;
	dic: string;
	icDph: string;
	paymentTypeCode: string;
	dueDays: number;
	invoiceCopies: number;
	deliveryNoteCopies: number;
	customerStoreCode: number;
	consignmentSaleEnabled: boolean;
	isReturnAllowed: boolean;
	useAssortedEanCodes: boolean;
	customerAlbiCode: number;
	keyCustomerTypeId: number;
	creditLimit: number;
	unpaidAmount: number;
	lastPaymentDate: Date;
	email: string;
	ediInboxEanCode: number;
	ediInboxEanCodeForInvoice: number;
	customerStoreEan: number;
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
}


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
	csvInvoice: boolean,
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
