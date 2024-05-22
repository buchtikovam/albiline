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
		icon: TableProperties
	},
	{
		name: 'Sklad',
		value: 'sklad',
		href: '',
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/hodinovka',
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/stav-skladu',
			},
			{
				name: 'Zásilky',
				value: 'zasilky',
				href: '/zasilky',
				children: [
					{
						name: "zkouška",
						value: "zkouska",
						href: "/zkouska"
					},
				]
			},
		]
	},
	{
		name: 'Výroba',
		value: 'vyroba',
		href: '',
		icon: Hammer,
		children: [
			{
				name: 'Motivy',
				value: 'motivy',
				href: '/motivy'
			},
			{
				name: 'Raznice',
				value: 'raznice',
				href: '/raznice',
				children: [
					{
						name: "test",
						value: "test",
						href: "/test"
					},
				]
			},
			{
				name: 'Obálky',
				value: 'obalky',
				href: '/obalky'
			},
			{
				name: 'Texty',
				value: 'texty',
				href: '/texty'
			}
		]
	},
	{
		name: 'Prodej',
		value: 'prodej',
		href: '',
		icon: HandCoins,
		children: [
			{
				name: 'Zákazníci',
				value: 'zakaznici',
				href: '/zakaznici'
			},
			{
				name: 'Zákazníci SK',
				value: 'zakaznici-sk',
				href: '/zakaznici-sk'
			},
			{
				name: 'Přehledy',
				value: 'prehledy',
				href: '/prehledy'
			},
			{
				name: 'Analýza prodejů',
				value: 'analyza-prodeju',
				href: '/analyza-prodeju'
			}
		]
	}
];

export const recentItems: Item[] = [
	{
		name: 'Průvodní nedávný list',
		value: 'pruvodni-list',
		href: '/',
		icon: TableProperties
	},
];

export const favoriteItems: Item[] = [
	{
		name: 'Průvodní oblíbený list',
		value: 'pruvodni-list',
		href: '/',
		icon: TableProperties
	},
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/',
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				value: 'hodinovka',
				href: '/hodinovka'
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad'
			}
		]
	},
	{
		name: 'Produkty',
		value: 'products',
		href: '/',
		icon: ShoppingBasket,
		children: [
			{
				name: 'test',
				value: 'test',
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad'
			}
		]
	}
];

