import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
import type { RibbonAction } from '$lib/enums/ribbonAction';


export type RibbonItem = {
	type: RibbonTypeEnum
	name?: string;
	icon?: ComponentType<Icon>
	action?: RibbonAction;
	children?: RibbonSubItem[];
}

export type RibbonSubItem = {
	name: string,
	action: RibbonAction;
}
