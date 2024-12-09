import type { SidebarItem } from "$lib/types/components/sidebar/sidebar";
// import { _ } from 'svelte-i18n';
import { get } from 'svelte/store';


export function filterItemsSearch(items: SidebarItem[], searchTerm: string): SidebarItem[] {
	if (searchTerm === '') {
		return items;
	}

	return items.map((item: SidebarItem): SidebarItem => {
		item.open = false;
		item.hide = true;

		// if (get(_)('components.sidebar.' + item.field).toLowerCase().includes(searchTerm.toLowerCase())) {
		// 	item.open = true;
		// 	item.hide = false;
		// }

		item.children = filterItemsSearch(item.children, searchTerm);

		if (item.children.some((child) => !child.hide)) {
			item.open = true;
			item.hide = false;
		}

		return item;
	});
}
