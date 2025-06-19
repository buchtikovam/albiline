import {apiServicePostHandled} from "$lib/api/apiService.svelte";


interface CustomerRank {
	customerRank: string;
	description: string;
}


export async function getCustomerRanks(): Promise<string[]> {

	try {
		const response = await apiServicePostHandled(
			'dropdowns/customerRank',
			{
				paramValue: [],
			},
			"customerRank"
		);

		const responseData = await response.data;
		return responseData.items.map((item: CustomerRank) => item.customerRank);
	} catch (error) {
		console.error('Error fetching customer ranks:', error);
		return [];
	}
}


export async function getCustomerRanksWithDescription(): Promise<string[]> {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/customerRank',
			{
				paramValue: [],
			},
			"customerRank"
		);

		const responseData = await response.data;
		return responseData.items.map((item: CustomerRank) => item.customerRank + " - " + item.description);
	} catch (error) {
		console.error('Error fetching customer ranks:', error);
		return [];
	}
}
