import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import type { Icon as IconType } from 'lucide-svelte';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';

export type RibbonType = (RibbonSeparatorType|RibbonItemType|RibbonItemType[])[]

export type RibbonSeparatorType = {
	type: "separator"
}

export type RibbonItemType = {
	type: RibbonTypeEnum,
	field: string,
	icon?: typeof IconType,
	action: RibbonActionEnum,
	translation: () => string,
	hide: boolean,
	children?: RibbonSubItemType[],
}

export type RibbonSubItemType = {
	field: string,
	translation: () => string,
	action: RibbonActionEnum,
}
