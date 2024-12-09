import type { Icon as IconType } from 'lucide-svelte';


export type SidebarItem = {
	field: string;
	href: string;
	open: boolean;
	hide: boolean;
	icon: null|typeof IconType;
	children: SidebarItem[];
}

export type HeaderTab = {
	field: string;
	url: string;
	closingState: string;
	treeDepth: number;
}
