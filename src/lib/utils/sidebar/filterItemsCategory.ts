import type { SidebarItem } from "$lib/types/sidebar/sidebar";

export function filterItemsCategory(items: SidebarItem[], itemsValues: string[]): SidebarItem[] {
	if (itemsValues.length === 0) {
		return [];
	}

	return items
		.filter((item: SidebarItem): boolean => {
			item.open = false;
			item.hide = itemsValues.includes(item.value) !== true;
			item.children = filterItemsCategory(item.children, itemsValues);
			if (item.children.some((child) => child.hide === false)) {
				item.hide = false;
			}

			return item.hide === false;
		}
	);
}