import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';

export type Item = {
	name: string;
	value: string
	href: string;
	open: boolean;
	hide: boolean;
	icon: null|ComponentType<Icon>;
	children: Item[],
}

export type Tab = {
	name: string;
	url: string;
	closingState: string;
	treeDepth: number;
}
