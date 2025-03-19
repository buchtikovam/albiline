import {apiServiceGETHandled} from "$lib/api/apiService.svelte";


interface PaymentTypeCode {
	paymentTypeCode: string;
	name: string;
}


export async function getPaymentTypeCode() {
	try {
		const response = await apiServiceGETHandled('dropdowns/paymentType');
		return response.data.items.map((item: PaymentTypeCode) => item.paymentTypeCode);
	} catch (error) {
		console.error('Error fetching payment type codes:', error);
		return [];
	}
}

export async function getPaymentTypeWithName() {
	try {
		const response = await apiServiceGETHandled('dropdowns/paymentType');
		return response.data.items.map((item: PaymentTypeCode) => item.paymentTypeCode + " - " + item.name);
	} catch (error) {
		console.error('Error fetching payment type codes:', error);
		return [];
	}
}
