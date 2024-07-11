import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';


export type SidebarItem = {
	name: string;
	value: string
	href: string;
	open: boolean;
	hide: boolean;
	icon: null|ComponentType<Icon>;
	children: SidebarItem[],
}

export type HeaderTab = {
	name: string;
	url: string;
	closingState: string;
	treeDepth: number;
}
