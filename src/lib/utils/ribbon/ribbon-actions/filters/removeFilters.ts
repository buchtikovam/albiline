import { ribbonActionStore } from '$lib/stores/ribbonStore';

export function removeFilters() {
	ribbonActionStore.set(undefined)

// 	TODO: fix remove filters
}
