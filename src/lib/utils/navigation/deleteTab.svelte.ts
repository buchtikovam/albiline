import { openedTabs } from '$lib/runes/navigation.svelte';
import { page } from '$app/state';
import { i18n } from '$lib/i18n';
import { goto } from '$app/navigation';
import type { HeaderTab } from '$lib/types/components/sidebar/sidebar';


export function deleteTab(tab: HeaderTab) {
	openedTabs.value.forEach((storedTab) => {
		if (storedTab.field === tab.field) {
			const index = openedTabs.value.indexOf(tab);
			openedTabs.value.splice(openedTabs.value.indexOf(tab), 1);

			// after tab was removed, redirect on available tab
			if (page.url.pathname === i18n.resolveRoute(tab.url)) {


				if (openedTabs.value.length === 0) {
					goto(i18n.resolveRoute("/")).then((r) => r);
				}

				if (openedTabs.value[index]) { // was spliced, so no need to increment index
					goto(i18n.resolveRoute(openedTabs.value[index].url)).then((r) => r);
				}

				if (openedTabs.value[index - 1]) {
					goto(i18n.resolveRoute(openedTabs.value[index - 1].url)).then((r) => r);
				}
			}
		}
	});
}
