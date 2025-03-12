import type { PageLoad } from "./$types";
import {authDetails} from "$lib/runes/page.svelte";
import {languageTag} from "$lib/paraglide/runtime";

// export const prerender = false;

export const load: PageLoad = async ({ params, fetch}) => {
	const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${params.customerNodeCode}`, {
		headers: {
			'Content-Type': 'application/json',
			'Session-Key': authDetails.sessionKey || "",
			'Accept-Language' : languageTag(),
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

	return {
		item: getObject(),
		contacts: [],
	};
};


function getObject() {
	return {
		id: null,
		customerNodeCode: "",
		customerName: "",
		name: "",
		dic: "",
		customerAlbiCode: null,
		icDph: "",
		email: "",
		customerAddressCode: null,
		companyName: null,
		street: "",
		city: "",
		postalCode: "",
		countryCode: "",
		note: null,
		paymentTypeCode: "",
		dueDays: null,
		invoiceCopies: null,
		deliveryNoteCopies: null,
		customerRank: "",
		retailStoreTypeId: null,
		customerStoreCode: null,
		customerStoreEan: "",
		packingNote: null,
		consignmentSaleEnabled: false,
		isReturnAllowed: false,
		isForConsignmentReturn: false,
		useAssortedEanCodes: false,
		pickingBoxPacking: false,
		splitOrderByFood: false,
		dealerCode: null,
		areaCode: null,
		areaId: null
	}
}
