import {invalidateAll} from "$app/navigation";
import {clearCache} from "$lib/cacheManager";
import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import {recentItems} from "$lib/runes/sidebar.svelte";
import {openedTabs} from "$lib/runes/navigation.svelte";


export async function triggerLogout() {
	const formData = new FormData(); // Create empty form data

	await clearCache();
	agGridTables.value = {};
	pageKeys.value = {
		value: [],
		index: 0,
	};
	recentItems.value = [];
	openedTabs.value = [];

	await fetch('/logout', {
		method: 'POST',
		body: formData, // Send empty form data
		credentials: 'include' // Keep this for cookies
	});

	await invalidateAll();
}
