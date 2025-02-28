import {page} from '$app/state';
import {apiServiceGETHandled} from '$lib/api/apiService.svelte';
import type {PageMetaDataType} from '$lib/types/routes/pageSettings';


export async function getPageMetaData(): Promise<PageMetaDataType> {
	const response = await apiServiceGETHandled(
		`page-metadata?pageCode=${btoa(page.route.id || "/")}`
	)

	return response.data;
}
