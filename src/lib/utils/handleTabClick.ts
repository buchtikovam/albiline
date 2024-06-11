import type { Item, Tab } from '$lib/types/sidebar';
import { currentActiveTabStore, openedTabsStore, allowTabAdding } from '$lib/stores/tabStore';
import { recentItemsStore } from '$lib/stores/sidebarStore';
import { get } from 'svelte/store';

export function handleTabClick(item: Item, treeDepth: number): void {
	if (get(allowTabAdding)) {
		const tab: Tab = {
			name: item.name,
			url: item.href,
			closingState: 'hidden',
			treeDepth: treeDepth
		};

		const containsObject: boolean = get(openedTabsStore).some(obj => obj.name === tab.name);

		if (!containsObject) {
			openedTabsStore.update((data: Tab[]) => data.concat(tab));
		}

		currentActiveTabStore.set(tab.url);

		if (!get(recentItemsStore).includes(item.value)) {
			recentItemsStore.update((data: string[]) => data.concat(item.value));
		}
	}
}
