import type { PageLoad } from './$types';
import {currentPageKey} from "$lib/runes/table.svelte";
import {authDetails} from "$lib/runes/page.svelte";
import {getLocale} from "$lib/paraglide/runtime";
import type {PageMetaDataType} from "$lib/types/routes/pageSettings";

export const load: PageLoad = async (
	{ fetch }
): Promise<{ pageMetaData: PageMetaDataType }> => {
	let response = await fetch(
		`http://10.2.2.10/albiline.test/api/v1/page-metadata?pageCode=${currentPageKey.value}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Session-Key': authDetails.sessionKey || "",
				'Accept-Language' : getLocale(),
				'Page-Code' : currentPageKey.value,
			}
		}
	)

	return {
		pageMetaData: await response.json()
	}
};
