import { currentFiltersStore } from '$lib/stores/tableStore';
import { ribbonActionStore } from '$lib/stores/ribbonStore';

export function removeFilters() {
	currentFiltersStore.set(undefined)
	ribbonActionStore.set(undefined)


}
