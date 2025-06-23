import type {
	CustomerAddressDetailSaveObjectType,
	CustomerAddressType,
	CustomerContactType,
	CustomerDetailSaveObjectType,
	CustomerInvoiceAddressType, CustomerType
} from "$lib/types/routes/prodej/zakaznici/customers";
import {apiServiceGETHandled} from "$lib/api/apiService.svelte.js";
import {page} from "$app/state";


// async
export function apiSaveCustomerDetail(customerDetailObj: CustomerDetailSaveObjectType) {
	console.log(JSON.stringify(customerDetailObj, null, 1));
}



// async
export function apiSaveCustomerAddressDetail(customerAddressObj: CustomerAddressDetailSaveObjectType) {
	console.log(JSON.stringify(customerAddressObj, null, 1));
}



export async function apiGetCustomerInvoiceAddresses(): Promise<CustomerInvoiceAddressType[]> {
	const response = await apiServiceGETHandled(`customers/${page.params.customerNodeCode}/invoice-addresses`);

	if (response.success) {
		return response.data.items as CustomerInvoiceAddressType[];
	}

	throw new Error('Failed to fetch customer invoice addresses');
}



export async function apiGetCustomerAddresses(): Promise<CustomerAddressType[]> {
	const response = await apiServiceGETHandled(`customers/${page.params.customerNodeCode}/addresses`)

	if (response.success) {
		return response.data.items as CustomerAddressType[];
	}

	throw new Error('Failed to fetch customer addresses');
}


export async function apiGetCustomer(customerNodeCode: number): Promise<any> {
	const response = await apiServiceGETHandled(`customers/${customerNodeCode}`);

	if (response.success) {
		return response.data ;
	}

	throw new Error('Failed to fetch customer');
}



export function createCleanCustomerOrAddressContact(
	createdContacts: CustomerContactType[]
): CustomerContactType {
	return {
		createdRowId: createdContacts.length,
		customerPersonCode: null,
		isDefault: false,
		enabled: false,
		name: null,
		surname: null,
		mobile: null,
		phone: null,
		email: null,
		note: null,
		pdfInvoice: false,
		pdfDeliveryNote: false,
		csvDeliveryNote: false,
		consignmentReturnInfo: false,
		consignmentInfo: false,
		carrierInfo: false
	};
}
