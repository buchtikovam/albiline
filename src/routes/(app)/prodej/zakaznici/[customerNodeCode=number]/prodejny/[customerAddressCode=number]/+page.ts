import {authDetails} from "$lib/runes/page.svelte";
import {languageTag} from "$lib/paraglide/runtime";
import type {CustomerAddressType, CustomerContactType} from "$lib/types/routes/prodej/zakaznci/customers";
import type {LoadEvent} from "@sveltejs/kit";
import type {PageLoad} from './$types';
import {currentPageKey} from "$lib/runes/table.svelte";


export const load: PageLoad = async (
	{params, fetch}: LoadEvent
): Promise<{
	item: CustomerAddressType;
	contacts: CustomerContactType[];
}> => {
	const res = await fetch(
		`http://10.2.2.10/albiline.test/api/v1/customers/${params.customerNodeCode}/addresses/${params.customerAddressCode}/`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Session-Key': authDetails.sessionKey || '',
				'Accept-Language': languageTag(),
				'Page-Code': currentPageKey.value,
			}
		}
	);

	if (res.ok) {
		const response = await res.json();

		return {
			item: response.item as CustomerAddressType,
			contacts: response.contacts as CustomerContactType[],
		};
	}

	throw new Error(
		`Could not load customer address: 
		nodeCode: ${params.customerNodeCode}, 
		addressCode: ${params.customerAddressCode}`
	);
};
