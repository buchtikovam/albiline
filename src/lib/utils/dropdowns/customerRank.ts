import {apiServiceGETHandled} from "$lib/api/apiService.svelte";


interface CustomerRank {
	customerRank: string;
	description: string;
}


export async function getCustomerRanks() {
	try {
		const response = await apiServiceGETHandled('dropdowns/customerRank');
		return response.data.items.map((item: CustomerRank) => item.customerRank);
	} catch (error) {
		console.error('Error fetching customer ranks:', error);
		return [];
	}
}
