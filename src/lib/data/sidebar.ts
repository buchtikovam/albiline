import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';
import Hammer from 'lucide-svelte/icons/hammer';
import HandCoins from 'lucide-svelte/icons/hand-coins';

import type { SidebarItem } from '$lib/types/sidebar/sidebar';

export const allItems: SidebarItem[] = [
	{
		name: 'Průvodní list',
		value: 'pruvodni-list',
		href: '/pruvodni-list/',
		open: false,
		hide: false,
		icon: TableProperties,
		children: [],
	},
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/sklad',
		open: false,
		hide: false,
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/sklad/hodinovka',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/sklad/prijem-a-vydej',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad/stav-skladu',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Zásilky',
				value: 'zasilky',
				href: '/sklad/zasilky',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
		]
	},
	{
		name: 'Výroba',
		value: 'vyroba',
		href: '/vyroba',
		open: false,
		hide: false,
		icon: Hammer,
		children: [
			{
				name: 'Motivy',
				value: 'motivy',
				href: '/vyroba/motivy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Raznice',
				value: 'raznice',
				href: '/vyroba/raznice',
				open: false,
				hide: false,
				icon: null,
				children: [
					{
						name: "test",
						value: "test",
						href: "/vyroba/raznice/test",
						open: false,
						hide: false,
						icon: null,
						children: [],
					},
				]
			},
			{
				name: 'Obálky',
				value: 'obalky',
				href: '/vyroba/obalky',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Texty',
				value: 'texty',
				href: '/vyroba/texty',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	},
	{
		name: 'Prodej',
		value: 'prodej',
		href: '/prodej',
		open: false,
		hide: false,
		icon: HandCoins,
		children: [
			{
				name: 'Zákazníci',
				value: 'zakaznici',
				href: '/prodej/zakaznici',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Zákazníci SK',
				value: 'zakaznici-sk',
				href: '/prodej/zakaznici-sk',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Přehledy',
				value: 'prehledy',
				href: '/prodej/prehledy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Analýza prodejů',
				value: 'analyza-prodeju',
				href: '/prodej/analyza-prodeju',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	}
];

export const recentItems: SidebarItem[] = [
	{
		name: 'Průvodní nedávný list',
		value: 'pruvodni-list',
		href: '/',
		open: false,
		hide: false,
		icon: TableProperties,
		children: [],
	},
];

export const favoriteItems: SidebarItem[] = [
	{
		name: 'Průvodní oblíbený list',
		value: 'pruvodni-list',
		href: '/',
		open: false,
		hide: false,
		icon: TableProperties,
		children: [],
	},
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/sklad',
		open: false,
		hide: false,
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/sklad/hodinovka',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/sklad/prijem-a-vydej',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad/stav-skladu',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	}
];

