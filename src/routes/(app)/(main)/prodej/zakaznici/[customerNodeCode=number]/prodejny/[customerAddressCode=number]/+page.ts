import {pageKeys} from "$lib/runes/table.svelte";
import {authDetails} from "$lib/runes/page.svelte";
import {getLocale, localizeHref} from "$lib/paraglide/runtime";
import {type LoadEvent, redirect} from "@sveltejs/kit";
import type {CustomerAddressType, CustomerContactType} from "$lib/types/routes/prodej/zakaznici/customers";
import type {PageLoad} from './$types';



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
				'Accept-Language': getLocale(),
				'Page-Code': pageKeys.value,
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

	// error messages will come from api
	// add checks only for 404
	let errorMessages = [
		{
			title: "Upozornění",
			content: "Tato prodejna neexistuje",
			type: "Critical",
		}
	]

	throw redirect(
		303,
		localizeHref(
			"/prodej/zakaznici?error=" +
			encodeURIComponent(JSON.stringify(errorMessages))
		)
	)
};
