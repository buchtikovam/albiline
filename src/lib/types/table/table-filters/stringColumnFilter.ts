import type { StringColumnFilterEnum } from '$lib/enums/column-filters/stringColumnFilterEnum';
import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type StringColumnFiltersConst = {
	value: StringColumnFilterEnum,
	label: string
	icon: ComponentType<Icon>
}[]

export type StringColumnFilter = {
	value: string,
	colFilter: StringColumnFilterEnum
}
