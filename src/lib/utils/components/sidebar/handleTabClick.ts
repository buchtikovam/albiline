import type { HeaderTab, SidebarItem } from '$lib/types/components/sidebar/sidebar';
import { editedTableData } from '$lib/runes/table.svelte';
import { openedTabs } from '$lib/runes/navigation.svelte';
import { recentItems } from '$lib/runes/sidebar.svelte';


export function handleTabClick(item: SidebarItem, treeDepth: number): void {
	if (editedTableData.value.length === 0) {
		const tab: HeaderTab = {
			field: item.field,
			url: item.href,
			closingState: 'hidden',
			treeDepth: treeDepth
		};

		console.log(tab);

		let containsObject: boolean = false;

		if (openedTabs.value.length > 0) {
			containsObject = openedTabs.value
				.some(obj => obj.field === tab.field);
		}

		if (!containsObject || openedTabs.value.length === 0) {
			openedTabs.value.push(tab);
		}

		if (!recentItems.value.includes(item.field)) {
			recentItems.value.push(item.field);
		}
	}
}
