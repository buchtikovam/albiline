import { ribbonActionStore } from '$lib/stores/ribbonStore';
import { currentColumnFiltersStore } from '$lib/stores/tableStore';
import type { ColumnFilters } from '$lib/types/components/table/columnFilter';
import { get } from 'svelte/store';


export function removeFilters() {
	ribbonActionStore.set(undefined)

	const currentFilters: ColumnFilters = get(currentColumnFiltersStore)

	Object.values(currentFilters).forEach((filter) => {
		filter.value = "";
		filter.colFilter = "default"
	})

	currentColumnFiltersStore.set(currentFilters)
}
