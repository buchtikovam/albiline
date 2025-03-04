import type { SidebarItem } from "$lib/types/components/sidebar/sidebar";


export function filterItemsSearch(items: SidebarItem[], searchTerm: string): SidebarItem[] {
	if (searchTerm === '') {
		return items;
	}

	return items.map((item: SidebarItem): SidebarItem => {
		item.open = false;
		item.hide = true


		if (
			item.translation().toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.field.toLowerCase().includes(searchTerm.toLowerCase())
		) {
			item.open = true;
			item.hide = false;
		}

		item.children = filterItemsSearch(item.children, searchTerm);

		if (item.children.some((child) => !child.hide)) {
			item.open = true;
			item.hide = false;
		}

		return item;
	});
}
