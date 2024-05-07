import type { ComponentType } from 'svelte';
import type { Icon } from 'lucide-svelte';
import ShoppingBasket from 'lucide-svelte/icons/shopping-basket';
import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';

type SingleItem = {
	name: string;
	href: string;
	icon: ComponentType<Icon>;
}
type ChildItem = {
	name: string;
	href: string;
}
type ParentItem = {
	name: string;
	value: string;
	href: string;
	icon: ComponentType<Icon>;
	children: ChildItem[]
}

export const allSingleItems: SingleItem[] = [
	{
		name: 'Průvodní list',
		href: '/',
		icon: TableProperties
	}
];

export const recentSingleItems: SingleItem[] = [
	{
		name: 'Průvodní nedávný list',
		href: '/',
		icon: TableProperties
	}
];

export const favoriteSingleItems: SingleItem[] = [
	{
		name: 'Průvodní oblíbený list',
		href: '/',
		icon: TableProperties
	}
];

export const allParentItems: ParentItem[] = [
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/',
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				href: '/hodinovka'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
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
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				href: '/'
			}
		]
	}
];

export const recentParentItems: ParentItem[] = [
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/',
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				href: '/'
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
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				href: '/'
			}
		]
	}
];

export const favoriteParentItems: ParentItem[] = [
	{
		name: 'Sklad',
		value: 'sklad',
		href: '/',
		icon: Warehouse,
		children: [
			{
				name: 'Hodinovka',
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				href: '/'
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
				href: '/'
			},
			{
				name: 'Příjem a výdej',
				href: '/'
			},
			{
				name: 'Stav skladu',
				href: '/'
			}
		]
	}
];
