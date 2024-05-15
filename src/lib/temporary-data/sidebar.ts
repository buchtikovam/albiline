import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import ShoppingBasket from 'lucide-svelte/icons/shopping-basket';
import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';

type ChildItem = {
	name: string;
	value: string;
	href: string;
	children?: ChildItem[]
}

export type Item = {
	name: string;
	value: string
	href: string;
	icon: ComponentType<Icon>;
	children?: ChildItem[],
}


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
				children: [
					{
						name: "test",
						value: "test",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						href: "/test"
					}
				]
			},
			{
				name: 'Příjem a výdej',
				value: 'prijem-a-vydej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				value: 'stav-skladu',
				href: '/sklad',
				children: [
					{
						name: "test",
						value: "test",
						href: "/test"
					},
					{
						name: "test",
						value: "test",
						href: "/test"
					}
				]
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

