import {apiServiceGETHandled} from "$lib/api/apiService.svelte";


interface RetailStoreType {
	retailStoreTypeId: number;
	retailStoreTypeName: string;
}


export async function getRetailStoreTypeName() {
	try {
		const response = await apiServiceGETHandled('dropdowns/retailStoreType');
		return response.data.items.map((item: RetailStoreType) => item.retailStoreTypeName);
	} catch (error) {
		console.error('Error fetching retail store type name:', error);
		return [];
	}
}
