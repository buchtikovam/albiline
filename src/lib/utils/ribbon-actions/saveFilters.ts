import { currentFiltersStore, editedDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { toastStore } from '$lib/stores/toastStore';
import apiService from '$lib/api/apiService';
import type { FetchedFilter } from '$lib/types/filter';


export async function saveFilters(inputValue: string, url: string): Promise<void> {
	const currentFilters = get(currentFiltersStore);


	const toSave: FetchedFilter = {
		pageOrigin: url,
		filterName: inputValue,
		filters: currentFilters || {}
	}

	const response = await apiService(
		"filters",
		"POST",
		toSave
	)

	if (!response.ok) {
		toastStore.set([
			{
				type: 'Critical',
				content: 'Nepodařilo se uložit filtry'
			}
		]);
	} else {
		toastStore.set([
			{
				type: 'Success',
				content: 'Filtry byly úspěšně uloženy'
			}
		]);
		editedDataStore.set([]);
	}
}
