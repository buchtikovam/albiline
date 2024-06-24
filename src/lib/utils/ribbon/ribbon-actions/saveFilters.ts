import { currentFiltersStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import apiService from '$lib/api/apiService';
import type { FetchedFilter } from '$lib/types/filter';
import { customToast } from '$lib/utils/toast/customToast';


export async function saveFilters(inputValue: string, url: string): Promise<void> {
	const currentFilters = get(currentFiltersStore);

	const toSave: FetchedFilter = {
		pageOrigin: url,
		filterName: inputValue,
		filters: currentFilters
	}

	const response = await apiService(
		"filters",
		"POST",
		toSave
	)

	if (response.ok) {
		customToast("Success", "Filtry byly uloženy.")
	} else {
		customToast("Critical", "Nepodařilo se uložit filtry.")
	}
}
