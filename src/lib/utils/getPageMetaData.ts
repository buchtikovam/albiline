import {apiServiceGETHandled} from '$lib/api/apiService.svelte';
import type {PageMetaDataType} from '$lib/types/routes/pageSettings';
import {pageKeys} from "$lib/runes/table.svelte";


export async function getPageMetaData(): Promise<any> {
	const response = await apiServiceGETHandled(
		`page-metadata?pageCode=${pageKeys.value[pageKeys.index]}`
	)

	return response.data;
}
