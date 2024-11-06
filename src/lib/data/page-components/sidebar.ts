import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';
import Hammer from 'lucide-svelte/icons/hammer';
import HandCoins from 'lucide-svelte/icons/hand-coins';

import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';

export const allItems: SidebarItem[] = [
	{
		field: 'pruvodni_list',
		href: '/pruvodni-list',
		open: false,
		hide: false,
		icon: TableProperties,
		children: [],
	},
	{
		field: 'sklad',
		href: '/sklad',
		open: false,
		hide: false,
		icon: Warehouse,
		children: [
			{
				field: 'hodinovka',
				href: '/sklad/hodinovka',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'prijem_a_vydej',
				href: '/sklad/prijem-a-vydej',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'stav_skladu',
				href: '/sklad/stav-skladu',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'zasilky',
				href: '/sklad/zasilky',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
		]
	},
	{
		field: 'vyroba',
		href: '/vyroba',
		open: false,
		hide: false,
		icon: Hammer,
		children: [
			{
				field: 'motivy',
				href: '/vyroba/motivy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'raznice',
				href: '/vyroba/raznice',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'obalky',
				href: '/vyroba/obalky',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'texty',
				href: '/vyroba/texty',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	},
	{
		field: 'prodej',
		href: '/prodej',
		open: false,
		hide: false,
		icon: HandCoins,
		children: [
			{
				field: 'zakaznici',
				href: '/prodej/zakaznici',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'zakaznici_sk',
				href: '/prodej/zakaznici-sk',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'prehledy',
				href: '/prodej/prehledy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				field: 'analyza_prodeju',
				href: '/prodej/analyza-prodeju',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	}
];
