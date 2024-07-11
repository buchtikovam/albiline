import { currentActiveTabStore, openedTabsStore, allowTabAdding } from '$lib/stores/tabStore';
import { recentItemsStore } from '$lib/stores/sidebarStore';
import type { SidebarItem, HeaderTab } from '$lib/types/sidebar/sidebar';
import { get } from 'svelte/store';


export function handleTabClick(item: SidebarItem, treeDepth: number): void {
	if (get(allowTabAdding)) {
		const tab: HeaderTab = {
			name: item.name,
			url: item.href,
			closingState: 'hidden',
			treeDepth: treeDepth
		};

		const containsObject: boolean = get(openedTabsStore)
			.some(obj => obj.name === tab.name);

		if (!containsObject) {
			openedTabsStore.update((data: HeaderTab[]) => data.concat(tab));
		}

		currentActiveTabStore.set(tab.url);

		if (!get(recentItemsStore).includes(item.value)) {
			recentItemsStore.update((data: string[]) => data.concat(item.value));
		}
	}
}
