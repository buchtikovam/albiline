import type { SidebarItem } from "$lib/types/components/sidebar/sidebar";


export function getSidebarItemByField(items: SidebarItem[], field: string): SidebarItem|undefined {
	let firstFound: SidebarItem|undefined;


	items.map((item: SidebarItem) => {
		if (item.field.toLowerCase().includes(field.toLowerCase())) {
			firstFound = item;
		}

		if (!firstFound) {
			firstFound = getSidebarItemByField(item.children, field);
		}
	});

	return firstFound;
}
