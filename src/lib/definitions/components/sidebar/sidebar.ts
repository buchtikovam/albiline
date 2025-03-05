import TableProperties from 'lucide-svelte/icons/table-properties';
import Warehouse from 'lucide-svelte/icons/warehouse';
import Hammer from 'lucide-svelte/icons/hammer';
import * as m from '$lib/paraglide/messages.js'
import HandCoins from 'lucide-svelte/icons/hand-coins';


import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';


export const allItems: SidebarItem[] = [
	{
		field: 'pruvodni_list',
		href: '/pruvodni-list',
		open: false,
		hide: false,
		disabled: false,
		translation: m.components_sidebar_item_pruvodni_list,
		icon: TableProperties,
		children: [],
	},
	{
		field: 'sklad',
		open: false,
		hide: false,
		disabled: false,
		translation: m.components_sidebar_item_sklad,
		icon: Warehouse,
		children: [
	// 		{
	// 			field: 'hodinovka',
	// 			href: '/sklad/hodinovka',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_sklad_hodinovka,
	// 			icon: null,
	// 			children: [],
	// 		},
	// 		{
	// 			field: 'prijem_a_vydej',
	// 			href: '/sklad/prijem-a-vydej',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_sklad_prijem_a_vydej,
	// 			icon: null,
	// 			children: [],
	// 		},
			{
				field: 'stav_skladu',
				href: '/sklad/stav-skladu',
				open: false,
				hide: false,
				disabled: false,
				translation: m.components_sidebar_item_sklad_stav_skladu,
				icon: null,
				children: [],
			},
	// 		{
	// 			field: 'zasilky',
	// 			href: '/sklad/zasilky',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_sklad_zasilky,
	// 			icon: null,
	// 			children: [],
	// 		},
		]
	},
	// {
	// 	field: 'vyroba',
	// 	open: false,
	// 	hide: false,
	// 	disabled: false,
	// 	translation: m.components_sidebar_item_vyroba,
	// 	icon: Hammer,
	// 	children: [
	// 		{
	// 			field: 'motivy',
	// 			href: '/vyroba/motivy',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_vyroba_motivy,
	// 			icon: null,
	// 			children: [],
	// 		},
	// 		{
	// 			field: 'raznice',
	// 			href: '/vyroba/raznice',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_vyroba_raznice,
	// 			icon: null,
	// 			children: [],
	// 		},
	// 		{
	// 			field: 'obalky',
	// 			href: '/vyroba/obalky',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_vyroba_obalky,
	// 			icon: null,
	// 			children: [],
	// 		},
	// 		{
	// 			field: 'texty',
	// 			href: '/vyroba/texty',
	// 			open: false,
	// 			hide: false,
	// 			disabled: false,
	// 			translation: m.components_sidebar_item_vyroba_texty,
	// 			icon: null,
	// 			children: [],
	// 		}
	// 	]
	// },
	{
		field: 'prodej',
		open: false,
		hide: false,
		disabled: false,
		translation: m.components_sidebar_item_prodej,
		icon: HandCoins,
		children: [
			{
				field: 'zakaznici',
				href: '/prodej/zakaznici',
				open: false,
				hide: false,
				disabled: false,
				translation: m.components_sidebar_item_prodej_zakaznici,
				icon: null,
				children: [],
			},
			// {
			// 	field: 'zakaznici_sk',
			// 	href: '/prodej/zakaznici-sk',
			// 	open: false,
			// 	hide: false,
			// 	disabled: false,
			// 	translation: m.components_sidebar_item_prodej_zakaznici_sk,
			// 	icon: null,
			// 	children: [],
			// },
			// {
			// 	field: 'prehledy',
			// 	href: '/prodej/prehledy',
			// 	open: false,
			// 	hide: false,
			// 	disabled: false,
			// 	translation: m.components_sidebar_item_prodej_prehledy,
			// 	icon: null,
			// 	children: [],
			// },
			// {
			// 	field: 'analyza_prodeju',
			// 	href: '/prodej/analyza-prodeju',
			// 	open: false,
			// 	hide: false,
			// 	disabled: false,
			// 	translation: m.components_sidebar_item_prodej_analyza_prodeju,
			// 	icon: null,
			// 	children: [],
			// }
		]
	}
];
