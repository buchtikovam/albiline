import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';
import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';


export type RibbonSeparator = {
	type: "separator"
}

export type RibbonItem = {
	type: RibbonTypeEnum,
	field: string,
	icon?: ComponentType<Icon>,
	action: RibbonActionEnum,
	hide: boolean,
	children?: RibbonSubItem[],
}

export type RibbonSubItem = {
	field: string,
	action: RibbonActionEnum,
}
