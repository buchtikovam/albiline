// import { currentActiveTabRune, openedTabsRune } from '$lib/global-state/tabStore.svelte';
// import { recentItemsStore } from '$lib/global-state/sidebarStore';
// import type { SidebarItem, HeaderTab } from '$lib/types/components/sidebar/sidebar';
// import { get } from 'svelte/store';
// import { editedTableDataStore } from '$lib/global-state/tableStore';

// item: SidebarItem, treeDepth: number
export function handleTabClick(): void {
	// if (get(editedTableDataStore).length === 0) {
	//
	// 	// if (get(allowTabAdding)) {
	// 		const tab: HeaderTab = {
	// 			field: item.field,
	// 			url: item.href,
	// 			closingState: 'hidden',
	// 			treeDepth: treeDepth
	// 		};
	//
	// 		const containsObject: boolean = get(openedTabsRune)
	// 			.some(obj => obj.field === tab.field);
	//
	// 		if (!containsObject) {
	// 			openedTabsRune.update((data: HeaderTab[]) => data.concat(tab));
	// 		}
	//
	// 		currentActiveTabRune.set(tab.url);
	//
	// 		if (!get(recentItemsStore).includes(item.field)) {
	// 			recentItemsStore.update((data: string[]) => data.concat(item.field));
	// 		}
	// 	}
	// // }
}
