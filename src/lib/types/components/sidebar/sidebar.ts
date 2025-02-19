import type { Icon as IconType } from 'lucide-svelte';


export type SidebarItem = {
	field: string;
	href?: string;
	open: boolean;
	hide: boolean;
	disabled: boolean
	translation: () => string;
	icon: null|typeof IconType;
	children: SidebarItem[];
}

export type HeaderTab = {
	field: string;
	url: string;
	label: string;
	closingState: string;
	treeDepth: number;
}
