import ArrowRightFromLine from 'lucide-svelte/icons/arrow-right-from-line';
import ArrowLeftFromLine from 'lucide-svelte/icons/arrow-left-from-line';
import ArrowLeftRight from 'lucide-svelte/icons/arrow-left-right';

export const stringColumnFiltersConst = [
	{
		value: 'starts-with',
		label: 'Začíná na',
		icon: ArrowRightFromLine
	},
	{
		value: 'ends-with',
		label: 'Končí na',
		icon: ArrowLeftFromLine
	},
	{
		value: 'contains',
		label: 'Obsahuje',
		icon: ArrowLeftRight
	}
];
