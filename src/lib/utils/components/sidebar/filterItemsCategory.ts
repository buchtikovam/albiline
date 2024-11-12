import type { SidebarItem } from "$lib/types/components/sidebar/sidebar";

export function filterItemsCategory(items: SidebarItem[], itemsValues: string[]): SidebarItem[] {
	if (itemsValues.length === 0) {
		return [];
	}

	return items
		.filter((item: SidebarItem): boolean => {
			item.open = false;
			item.hide = !itemsValues.includes(item.field);
			item.children = filterItemsCategory(item.children, itemsValues);

			if (item.children.some((child) => !child.hide)) {
				item.hide = false;
			}

			return !item.hide;
		}
	);
}
