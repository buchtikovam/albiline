import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { RibbonType } from '$lib/enums/ribbonType';
import type { Action } from '$lib/enums/action';

export type Item = {
	type: RibbonType
	name?: string;
	icon?: ComponentType<Icon>
	action?: Action;
	children?: SubItem[];
}

export type SubItem = {
	name: string,
	action: Action;
}
