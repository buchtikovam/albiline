import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { RibbonType } from '$lib/enums/ribbonType';

export type Item = {
	type: RibbonType
	name?: string;
	icon?: ComponentType<Icon>
	action?: string;
	children?: SubItem[];
}

export type SubItem = {
	name: string,
	action: string;
}
