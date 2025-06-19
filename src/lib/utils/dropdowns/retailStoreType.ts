import {apiServiceGETHandled, apiServicePostHandled} from "$lib/api/apiService.svelte";


interface RetailStoreType {
	retailStoreTypeId: number;
	retailStoreTypeName: string;
}


export async function getRetailStoreTypeName() {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/retailStoreType',
			{
				paramValue: [],
			},
			"retailStoreType"
		);

		const responseData = await response.data;
		return responseData.items.map((item: RetailStoreType) => item.retailStoreTypeName);
	} catch (error) {
		console.error('Error fetching retail store type name:', error);
		return [];
	}
}

export async function getRetailStoreTypeIdWithName() {
	try {
		const response = await apiServicePostHandled(
			'dropdowns/retailStoreType',
			{
				paramValue: [],
			},
			"retailStoreType"
		);

		const responseData = await response.data;
		return responseData.items.map((item: RetailStoreType) => item.retailStoreTypeId + " - " + item.retailStoreTypeName);
	} catch (error) {
		console.error('Error fetching retail store type name:', error);
		return [];
	}
}
