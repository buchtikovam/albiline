import {authDetails} from '$lib/runes/page.svelte';
import {getLocale, localizeHref} from "$lib/paraglide/runtime";
import {redirect} from "@sveltejs/kit";
import type {PageLoad} from "./$types";



export const load: PageLoad = async ({ params, fetch}) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.customerNodeCode}`, {
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : getLocale(),
			'Page-Code' : "",
		}
	})


	if (res.ok) {
		const response = await res.json();
		const contacts = response.contacts;
		const item = response.item;

		if (contacts && item) {
			return {
				item: item,
				contacts: contacts
			};
		}
	}


	// error messages will come from api
	// add checks only for 404
	let errorMessages = [
		{
			title: "Upozornění",
			content: "Tento zákazník neexistuje",
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
