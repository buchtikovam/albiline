import type { PageMetaDataType } from '$lib/types/page/pageSettings';
import { apiServiceGET } from '$lib/api/apiService';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export async function getPageMetaData(): Promise<PageMetaDataType> {
	const res = await apiServiceGET(`page-metadata?pageCode=${btoa(get(page).route.id || "/")}`)
	return await res.json()
}
