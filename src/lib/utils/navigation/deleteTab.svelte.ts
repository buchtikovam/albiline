import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
import { openedTabsRune } from '$lib/runes-global/navigation.svelte';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export function deleteTab(tab: HeaderTab) {
	console.log("remove tab");

	openedTabsRune.value.forEach((storedTab) => {
		if (storedTab.field === tab.field) {
			const index = openedTabsRune.value.indexOf(tab);
			openedTabsRune.value.splice(openedTabsRune.value.indexOf(tab), 1);

			// after tab was removed, redirect on available tab
			if (get(page).url.pathname === tab.url) {
				if (openedTabsRune.value.length === 0) {
					goto("/").then(r => r);
				}

				if (openedTabsRune.value[index]) { // was spliced, so no need to increment index
					goto(openedTabsRune.value[index].url).then(r => r);
				}

				if (openedTabsRune.value[index - 1]) {
					goto(openedTabsRune.value[index - 1].url).then(r => r);
				}
			}
		}
	});
}
