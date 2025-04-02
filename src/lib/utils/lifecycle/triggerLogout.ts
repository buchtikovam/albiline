import {invalidateAll} from "$app/navigation";
import {clearCache} from "$lib/cacheManager";
import {agGridTables} from "$lib/runes/table.svelte";


export async function triggerLogout() {
	const formData = new FormData(); // Create empty form data

	await clearCache();
	agGridTables.value = {};


	await fetch('/logout', {
		method: 'POST',
		body: formData, // Send empty form data
		credentials: 'include' // Keep this for cookies
	});

	await invalidateAll();
}
