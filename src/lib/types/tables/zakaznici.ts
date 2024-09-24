export type CustomerData = {
	item: {
		customerAddressCode: number, //
		customerNodeCode: number,
		addressType: string,
		name: string, //
		street: string, //
		city: string, //
		postalCode: number, //
		countryCode: string, //
		companyName: string|null, //
		enabled: number,
		consignmentSaleEnabled: boolean|null,
		paymentTypeCode: string,
		dueDays: number,
		invoiceCopies: number,
		deliveryNoteCopies: number,
		customerRank: string,
		retailStoreTypeId: number,
		dealerCode: number,
		isReturnAllowed: boolean|null,
		customerStoreCode: string,
		customerStoreEan: string|null,
		dateCreated: Date,
		note: null,
		firstOrderDate: Date,
		lastOrderDate: Date,
		areaId: number,
		merchandiserCode: string|null,
		description: string|null,
		responsiblePerson: string,
		lastChangeUserCode: string,
		lastChangeDateTime: Date,
		useAssortedEanCodes: string|null,
		sendInvoiceViaEmail: boolean|null,
		emailForInvoicing: string|null,
		sendDeliveryNoteViaEmail: boolean|null,
		emailForDeliveryNotes: string|null,
		sendShippingNotificationViaEmail: boolean|null,
		sendReturnsShippingNotificationViaEmail: boolean|null,
		emailForShippingNotifications: string|null,
		i_ID: number,
		i_CustomerAddressCode: number,
		i_CustomerNodeCode: number,
		i_AddressType: string,
		i_Name: string, //
		i_Street: string, //
		i_City: string, //
		i_PostalCode: string, //
		i_CountryCode: string, //
		i_CompanyName: string|null,
		i_Enabled: boolean|number,
		i_ConsignmentSaleEnabled: boolean|null,
		i_PaymentTypeCode: string,
		i_DueDays: number,
		i_ICO: string|null, //
		i_DIC: string|null, //
		i_IcDph: string|null, //
		i_CustomerStoreCode: string,
		i_CustomerStoreEan: string|null,
		isBadPayer: number,
		om: number,
		nodeEmail: string,
		retailStoreTypeName: number,
		pickingBoxPacking: number,
		packingNote: string|null,
		isForConsignmentReturn: boolean|null,
		splitOrderByFood: number,
		b2BeshopEnabled: boolean|null
	}
}
