import ShoppingBasket from 'lucide-svelte/icons/shopping-basket';
import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';
import Hammer from 'lucide-svelte/icons/hammer';
import HandCoins from 'lucide-svelte/icons/hand-coins';

import type { Item } from '$lib/types/sidebar';

export const allItems: Item[] = [
	{
		name: 'Průvodní list',
		value: 'pruvodni-list',
		href: '/pruvodni-list',
		open: false,
		hide: false,
		icon: TableProperties,
		children: [],
	},
	{
		name: 'Sklad',
		value: 'sklad',
		href: '',
		open: false,
		hide: false,
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/hodinovka',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/stav-skladu',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Zásilky',
				value: 'zasilky',
				href: '/zasilky',
				open: false,
				hide: false,
				icon: null,
				children: [
					{
						name: "zkouška",
						value: "zkouska",
						href: "/zkouska",
						open: false,
						hide: false,
						icon: null,
						children: [],
					},
				]
			},
		]
	},
	{
		name: 'Výroba',
		value: 'vyroba',
		href: '',
		open: false,
		hide: false,
		icon: Hammer,
		children: [
			{
				name: 'Motivy',
				value: 'motivy',
				href: '/motivy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Raznice',
				value: 'raznice',
				href: '/raznice',
				open: false,
				hide: false,
				icon: null,
				children: [
					{
						name: "test",
						value: "test",
						href: "/test",
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
				href: '/obalky',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Texty',
				value: 'texty',
				href: '/texty',
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
		href: '',
		open: false,
		hide: false,
		icon: HandCoins,
		children: [
			{
				name: 'Zákazníci',
				value: 'zakaznici',
				href: '/zakaznici',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Zákazníci SK',
				value: 'zakaznici-sk',
				href: '/zakaznici-sk',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Přehledy',
				value: 'prehledy',
				href: '/prehledy',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Analýza prodejů',
				value: 'analyza-prodeju',
				href: '/analyza-prodeju',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	}
];

export const recentItems: Item[] = [
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

export const favoriteItems: Item[] = [
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
		href: '/',
		open: false,
		hide: false,
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/hodinovka',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	},
	{
		name: 'Produkty',
		value: 'products',
		href: '/',
		open: false,
		hide: false,
		icon: ShoppingBasket,
		children: [
			{
				name: 'test',
				value: 'test',
				href: '/',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/',
				open: false,
				hide: false,
				icon: null,
				children: [],
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad',
				open: false,
				hide: false,
				icon: null,
				children: [],
			}
		]
	}
];

