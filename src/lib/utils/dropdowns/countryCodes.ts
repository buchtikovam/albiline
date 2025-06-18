import {apiServiceGETHandled, apiServicePostHandled} from "$lib/api/apiService.svelte";


interface CountryCode {
	countryId: number;
	countryName: string;
	countryCode: string;
}


export async function getDeliveryCountryCodes(): Promise<string[]> {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/deliveryCountryCodes',
			{
				paramValue: [].toString(),
			},
			"deliveryCountryCodes"
		);

		return [];
		// return response.data.items.map((item: CountryCode) => item.countryCode);
	} catch (error) {
		console.error('Error fetching delivery country codes:', error);
		return [];
	}
}



export async function getDeliveryCountryCodesWithName(): Promise<string[]> {
	try {
		const response = await apiServiceGETHandled('dropdowns/deliveryCountryCodes');
		return response.data.items.map((item: CountryCode) => item.countryCode + " - " + item.countryName );
	} catch (error) {
		console.error('Error fetching delivery country codes:', error);
		return [];
	}
}



export async function getInvoiceCountryCodes(): Promise<string[]> {
	try {
		const response = await apiServiceGETHandled('dropdowns/invoiceCountryCodes');
		return response.data.items.map((item: CountryCode) => item.countryCode);
	} catch (error) {
		console.error('Error fetching invoice country codes:', error);
		return [];
	}
}


export async function getInvoiceCountryCodesWithName(): Promise<string[]> {
	try {
		const response = await apiServiceGETHandled('dropdowns/invoiceCountryCodes');
		return response.data.items.map((item: CountryCode) => item.countryCode + " - " + item.countryName );
	} catch (error) {
		console.error('Error fetching delivery country codes:', error);
		return [];
	}
}
