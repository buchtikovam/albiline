import { currentActiveTabStore, openedTabsStore, allowTabAdding } from '$lib/stores/tabStore';
import { recentItemsStore } from '$lib/stores/sidebarStore';
import type { SidebarItem, HeaderTab } from '$lib/types/components/sidebar/sidebar';
import { get } from 'svelte/store';
import { editedDataStore } from '$lib/stores/tableStore';


export function handleTabClick(item: SidebarItem, treeDepth: number): void {	
	if (get(editedDataStore).length === 0) {
		
		if (get(allowTabAdding)) {
			const tab: HeaderTab = {
				field: item.field,
				url: item.href,
				closingState: 'hidden',
				treeDepth: treeDepth
			};

			const containsObject: boolean = get(openedTabsStore)
				.some(obj => obj.field === tab.field);

			if (!containsObject) {
				openedTabsStore.update((data: HeaderTab[]) => data.concat(tab));
			}

			currentActiveTabStore.set(tab.url);

			if (!get(recentItemsStore).includes(item.field)) {
				recentItemsStore.update((data: string[]) => data.concat(item.field));
			}
		}	
	}
}
