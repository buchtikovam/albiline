import { agGridTables, pageKeys } from '$lib/runes/table.svelte';
import { recentItems } from '$lib/runes/sidebar.svelte';
import { openedTabs } from '$lib/runes/navigation.svelte';
import { pageStates } from '$lib/runes/page.svelte';


export function clearAllStates() {
	agGridTables.value = {};
	pageKeys.value = {
		value: [],
		index: 0,
	};
	recentItems.value = [];
	openedTabs.value = [];
	pageStates.value = {};
}
