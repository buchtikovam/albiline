import type { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
import type { Icon as IconType } from 'lucide-svelte';
import { RibbonTypeEnum } from '$lib/enums/ribbon/ribbonType';


export type RibbonSeparator = {
	type: "separator"
}

export type RibbonItem = {
	type: RibbonTypeEnum,
	field: string,
	icon?: typeof IconType,
	action: RibbonActionEnum,
	translation: () => string,
	hide: boolean,
	children?: RibbonSubItem[],
}

export type RibbonSubItem = {
	field: string,
	translation: () => string,
	action: RibbonActionEnum,
}
