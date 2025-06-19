import {apiServicePostHandled} from "$lib/api/apiService.svelte";


interface PaymentTypeCode {
	paymentTypeCode: string;
	name: string;
}


export async function getPaymentTypeCode() {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/paymentType',
			{
				paramValue: [],
			},
			"paymentType"
		);

		const responseData = await response.data;
		return await responseData.items.map((item: PaymentTypeCode) => item.paymentTypeCode);
	} catch (error) {
		console.error('Error fetching payment type codes:', error);
		return [];
	}
}

export async function getPaymentTypeWithName() {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/paymentType',
			{
				paramValue: [],
			},
			"paymentType"
		);

		const responseData = await response.data;
		return responseData.items.map((item: PaymentTypeCode) => item.paymentTypeCode + " - " + item.name);
	} catch (error) {
		console.error('Error fetching payment type codes:', error);
		return [];
	}
}
