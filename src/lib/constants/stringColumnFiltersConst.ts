import ArrowRightFromLine from 'lucide-svelte/icons/arrow-right-from-line';
import ArrowLeftFromLine from 'lucide-svelte/icons/arrow-left-from-line';
import ArrowLeftRight from 'lucide-svelte/icons/arrow-left-right';
import type { StringColumnFiltersConst } from '$lib/types/table/table-filters/stringColumnFilter';
import { StringColumnFilterEnum } from '$lib/enums/column-filters/stringColumnFilterEnum';

export const stringColumnFiltersConst: StringColumnFiltersConst = [
	{
		value: StringColumnFilterEnum.STARTS_WITH,
		label: 'Začíná na',
		icon: ArrowRightFromLine
	},
	{
		value: StringColumnFilterEnum.ENDS_WITH,
		label: 'Končí na',
		icon: ArrowLeftFromLine
	},
	{
		value: StringColumnFilterEnum.CONTAINS,
		label: 'Obsahuje',
		icon: ArrowLeftRight
	}
];
