// import { currentActiveTabRune, openedTabsRune } from '$lib/global-state/tabStore.svelte';
// import { recentItemsStore } from '$lib/global-state/sidebarStore';
import type { HeaderTab, SidebarItem } from '$lib/types/components/sidebar/sidebar';
import { editedTableData } from '$lib/runes-global/table.svelte';
// import { get } from 'svelte/store';
import { openedTabs } from '$lib/runes-global/navigation.svelte';
// import { editedTableDataStore } from '$lib/global-state/tableStore';


export function handleTabClick(item: SidebarItem, treeDepth: number): void {
	if (editedTableData.value.length === 0) {

		const tab: HeaderTab = {
			field: item.field,
			url: item.href,
			closingState: 'hidden',
			treeDepth: treeDepth
		};

		console.log(openedTabs.value);

		let containsObject: boolean = false;

		if (openedTabs.value.length > 0) {
			containsObject = openedTabs.value
				.some(obj => obj.field === tab.field);
		}

		if (!containsObject || openedTabs.value.length === 0) {
			openedTabs.value.push(tab);
		}

		// currentActiveTabRune.set(tab.url);

		// if (!get(recentItemsStore).includes(item.field)) {
		// 	recentItemsStore.update((data: string[]) => data.concat(item.field));
		// }
	}
}
