import type { PageLoad } from './$types';
import {pageKeys} from "$lib/runes/table.svelte";
import {authDetails} from "$lib/runes/page.svelte";
import {getLocale} from "$lib/paraglide/runtime";
import type {PageMetaDataType} from "$lib/types/routes/pageSettings";

export const load: PageLoad = async (
	{ fetch }
): Promise<{ pageMetaData: PageMetaDataType }> => {
	const pageKey = pageKeys.value.value[pageKeys.value.index];

	let response = await fetch(
		`http://10.2.2.10/albiline.test/api/v1/page-metadata?pageCode=${pageKey}`,
		{
			headers: {
				'Content-Type': 'application/json',
				'Session-Key': authDetails.sessionKey || "",
				'Accept-Language' : getLocale(),
				'Page-Code' : pageKey,
			}
		}
	)
	return {
		pageMetaData: await response.json()
	}
};
