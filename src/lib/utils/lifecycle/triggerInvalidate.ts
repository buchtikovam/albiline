import {invalidateAll} from "$app/navigation";
import {clearCache} from "$lib/cacheManager";
import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import {recentItems} from "$lib/runes/sidebar.svelte";
import {openedTabs} from "$lib/runes/navigation.svelte";
import {pageStates, responseDialogMessages} from "$lib/runes/page.svelte";
import {clearAllStates} from "$lib/utils/lifecycle/clearAllStates";
import {redirect} from "@sveltejs/kit";


export async function triggerInvalidate(){

	const formData = new FormData();

	await clearCache();

	clearAllStates();

	responseDialogMessages.value = [{
		title: "Kritická chyba",
		type: "Critical",
		content: "Přístup odepřen"
	}]

	await fetch('/invalidate', {
		method: 'POST',
		body: formData,
		credentials: 'include',
	});

	await invalidateAll();

	redirect(303, "/login")
}
