import { openedTabs } from '$lib/runes/navigation.svelte';
import { page } from '$app/state';
import { goto } from '$app/navigation';
import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';
import {localizeHref} from "$lib/paraglide/runtime";


export function deleteTab(tab: HeaderTab) {
	openedTabs.value.forEach((storedTab) => {
		if (storedTab.field === tab.field) {
			const index = openedTabs.value.indexOf(tab);
			openedTabs.value.splice(openedTabs.value.indexOf(tab), 1);

			// after tab was removed, redirect on available tab
			if (page.url.pathname === localizeHref(tab.url)) {


				if (openedTabs.value.length === 0) {
					goto(localizeHref("/"));
				}

				if (openedTabs.value[index]) { // was spliced, so no need to increment index
					goto(localizeHref(openedTabs.value[index].url));

				}

				if (openedTabs.value[index - 1]) {
					goto(localizeHref(openedTabs.value[index-1].url));
				}
			}
		}
	});
}
