import type { IntColumnFilterEnum } from '$lib/enums/column-filters/intColumnFilterEnum';
import type { Icon } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export type IntColumnFiltersConst = {
	value: IntColumnFilterEnum,
	label: string
	icon: ComponentType<Icon>
}[]

export type IntColumnFilter = {
	value: number,
	colFilter: IntColumnFilterEnum
}
