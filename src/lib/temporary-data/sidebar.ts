import ShoppingBasket from 'lucide-svelte/icons/shopping-basket';
import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';

import type { Item } from '$lib/types/sidebar';

export const allItems: Item[] = [
	{
		name: 'Průvodní list',
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
				href: '/hodinovka',
				parentValue: 'sklad',
				children: [
					{
						name: "test",
						value: "test",
						parentValue: 'hodinovka',
						grandParentValue: "sklad",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						parentValue: 'hodinovka',
						grandParentValue: "sklad",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						parentValue: 'hodinovka',
						grandParentValue: "sklad",
						href: "/test"
					}
				]
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				parentValue: 'sklad',
				href: '/'
			},
			{
				name: 'Pohyby',
				value: 'pohyby',
				parentValue: 'sklad',
				href: '/sklad',
				children: [
					{
						name: "test",
						value: "test",
						parentValue: 'pohyby',
						grandParentValue: "sklad",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						parentValue: 'pohyby',
						grandParentValue: "sklad",
						href: "/test"
					}
				]
			}
		]
	},
	{
		name: 'Produkty',
		value: 'produkty',
		href: '/',
		icon: ShoppingBasket,
		children: [
			{
				name: 'test',
				value: 'test',
				parentValue: 'produkty',
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				parentValue: 'produkty',
				href: '/'
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				parentValue: 'produkty',
				href: '/sklad'
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

