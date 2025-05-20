import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';
import Hammer from 'lucide-svelte/icons/hammer';
import * as m from '$lib/paraglide/messages.js'
import HandCoins from 'lucide-svelte/icons/hand-coins';


import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';


export const allItems: SidebarItem[] = [
	{
		field: 'sklad',
		open: false,
		hide: false,
		disabled: false,
		translation: m.components_sidebar_item_sklad,
		icon: Warehouse,
		popoverOpen: false,
		children: [
			{
				field: 'stav_skladu',
				href: '/sklad/stav-skladu',
				open: false,
				hide: false,
				disabled: false,
				translation: m.components_sidebar_item_sklad_stav_skladu,
				icon: null,
				popoverOpen: false,
				children: [],
			},
		]
	},

	{
		field: 'prodej',
		open: false,
		hide: false,
		disabled: false,
		translation: m.components_sidebar_item_prodej,
		icon: HandCoins,
		popoverOpen: false,
		children: [
			{
				field: 'analyza-prodeju',
				open: false,
				hide: false,
				disabled: false,
				popoverOpen: false,
				translation: m.components_sidebar_item_prodej_analyza_prodeju,
				icon: null,
				children: [
					{
						field: 'analyza-prodeju-celkem',
						href: '/prodej/analyza-prodeju/celkem',
						open: false,
						hide: false,
						translation: () => "Celkem", // todo
						disabled: false,
						popoverOpen: false,
						icon: null,
						children: [],
					},
					{
						field: 'analyza-prodeju-prodeje-po-zakaznicich-a-prodejnach',
						href: '/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach',
						open: false,
						hide: false,
						translation: () => "Po zákaznících a prodejnách", // todo
						disabled: false,
						popoverOpen: false,
						icon: null,
						children: [],
					}
				],
			},

			{
				field: 'zakaznici',
				href: '/prodej/zakaznici',
				open: false,
				hide: false,
				disabled: false,
				popoverOpen: false,
				translation: m.components_sidebar_item_prodej_zakaznici,
				icon: null,
				children: [],
			},
		]
	}
];
