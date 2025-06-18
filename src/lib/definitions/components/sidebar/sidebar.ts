import Warehouse from 'lucide-svelte/icons/warehouse';
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
				field: 'stav-skladu',
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
						field: 'analyza-prodeju-po-zakaznicich',
						href: '/prodej/analyza-prodeju/po-zakaznicich',
						open: false,
						hide: false,
						translation: () => "Po zákaznících", // todo
						disabled: false,
						popoverOpen: false,
						icon: null,
						children: [
							{
								field: 'analyza-prodeju-po-zakaznicich-a-liniich',
								href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich',
								open: false,
								hide: false,
								translation: () => "Po zákaznících a liniích", // todo
								disabled: false,
								popoverOpen: false,
								icon: null,
								children: [],
							},
							{
								field: 'analyza-prodeju-po-zakaznicich-a-klp',
								href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp',
								open: false,
								hide: false,
								translation: () => "Po zákaznících a KLP", // todo
								disabled: false,
								popoverOpen: false,
								icon: null,
								children: [],
							},
						],
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
						children: [
							{
								field: 'analyza-prodeju-po-zakaznicich-a-fakturach',
								href: '/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach',
								open: false,
								hide: false,
								translation: () => "Po zákaznících a fakturách", // todo
								disabled: false,
								popoverOpen: false,
								icon: null,
								children: [],
							},
						],
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
