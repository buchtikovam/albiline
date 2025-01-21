import { page } from '$app/stores';
import { apiServiceGET } from '$lib/api/apiService.svelte';
import { get } from 'svelte/store';
import type { PageMetaDataType } from '$lib/types/page/pageSettings';


export async function getPageMetaData(): Promise<PageMetaDataType> {
	const res = await apiServiceGET(
		`page-metadata?pageCode=${btoa(get(page).route.id || "/")}`
	)

	return await res.json()
}
