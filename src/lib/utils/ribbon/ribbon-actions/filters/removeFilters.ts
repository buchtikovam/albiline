import { ribbonActionStore } from '$lib/stores/ribbonStore';
import { currentFiltersStore } from '$lib/stores/tableStore';
import type { StoredFilters } from '$lib/types/table/filter';
import { get } from 'svelte/store';


export function removeFilters() {
	ribbonActionStore.set(undefined)

	const currentFilters: StoredFilters = get(currentFiltersStore);

	Object.values(currentFilters).forEach((filter) => {
		filter.value = "";
		filter.colFilter = "default"
	})

	currentFiltersStore.set(currentFilters)
}
