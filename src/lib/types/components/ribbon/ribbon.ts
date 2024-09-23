import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';


export type RibbonItem = {
	type: RibbonTypeEnum,
	name?: string,
	icon?: ComponentType<Icon>,
	action?: RibbonActionEnum,
	children?: RibbonSubItem[],
	done?: boolean,
}

export type RibbonSubItem = {
	name: string,
	action: RibbonActionEnum,
	done?: boolean,
}
