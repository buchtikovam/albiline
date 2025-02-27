import { page } from '$app/state';
import { apiServiceGET } from '$lib/api/apiService.svelte';
import { get } from 'svelte/store';
import type { PageMetaDataType } from '$lib/types/routes/pageSettings';


export async function getPageMetaData(): Promise<PageMetaDataType> {
	const res = await apiServiceGET(
		`page-metadata?pageCode=${btoa(page.route.id || "/")}`
	)

	return await res.json()
}
