import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
import { openedTabs } from '$lib/runes/navigation.svelte';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export function deleteTab(tab: HeaderTab) {
	console.log("remove tab");

	openedTabs.value.forEach((storedTab) => {
		if (storedTab.field === tab.field) {
			const index = openedTabs.value.indexOf(tab);
			openedTabs.value.splice(openedTabs.value.indexOf(tab), 1);

			// after tab was removed, redirect on available tab
			if (get(page).url.pathname === tab.url) {
				if (openedTabs.value.length === 0) {
					goto("/").then(r => r);
				}

				if (openedTabs.value[index]) { // was spliced, so no need to increment index
					goto(openedTabs.value[index].url).then(r => r);
				}

				if (openedTabs.value[index - 1]) {
					goto(openedTabs.value[index - 1].url).then(r => r);
				}
			}
		}
	});
}
