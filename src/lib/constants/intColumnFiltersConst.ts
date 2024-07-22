import type { IntColumnFiltersConst } from '$lib/types/table/table-filters/intColumnFilter';
import { IntColumnFilterEnum } from '$lib/enums/column-filters/intColumnFilterEnum';
import Equal from 'lucide-svelte/icons/equal';
import ChevronLeft from 'lucide-svelte/icons/chevron-left';
import ChevronRight from 'lucide-svelte/icons/chevron-right';

export const intColumnFiltersConst: IntColumnFiltersConst = [
	{
		value: IntColumnFilterEnum.BIGGER_THAN,
		label: 'Větší než',
		icon: ChevronRight
	},
	{
		value: IntColumnFilterEnum.SMALLER_THAN,
		label: 'Menší než',
		icon: ChevronLeft
	},
	{
		value:  IntColumnFilterEnum.EQUALS,
		label: 'Rovná se',
		icon: Equal
	}
];
