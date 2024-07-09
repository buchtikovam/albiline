import { ribbonActionStore } from '$lib/stores/ribbonStore';
import { currentFiltersStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import type { StoredFilters } from '$lib/types/table/filter';

export function removeFilters() {
	ribbonActionStore.set(undefined)

	const currentFilters: StoredFilters | null = get(currentFiltersStore);

	if (currentFilters) {
		Object.values(currentFilters).forEach((filter) => {
			filter.value = "";
			filter.colFilter = "default"
		})

		currentFiltersStore.set(currentFilters)
	}
}
