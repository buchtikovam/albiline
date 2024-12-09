<script lang="ts">
	import {
		recentItemsStore,
		favoriteItemsStore,
		sidebarCategory, sidebarOpen
	} from '$lib/runes-global/sidebar.svelte';
	import { get } from 'svelte/store';
	import { allItems } from '$lib/data/page-components/sidebar';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import { filterItemsSearch } from '$lib/utils/components/sidebar/filterItemsSearch';
	import { buttonBorderSwitch } from '$lib/utils/components/sidebar/buttonBorderSwitch';
	import { filterItemsCategory } from '$lib/utils/components/sidebar/filterItemsCategory';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import deepcopy from 'deepcopy';
	import CategoryButton from '$lib/components/sidebar/SidebarCategoryTabs.svelte';
	import SidebarCommand from '$lib/components/sidebar/SidebarCommand.svelte';
	// import SidebarClosed from './SidebarClosed.svelte';
	import SidebarOpen from './SidebarOpen.svelte';
	import * as m from "$lib/paraglide/messages.js"


	let isSidebarCommandOpen: boolean = $state(false);

	let recentItemValues: string[] = [];
	// recentItemsStore.subscribe(recentItems => {
	// 	recentItemValues = recentItems;
	// });


	let favoriteItemValues: string[] = [];
	favoriteItemsStore.subscribe(favoriteItems => {
		// znovu načtění itemů po odebrání položky z favorites
		// if (favoriteItemValues.length > favoriteItems.length) {
		// 	filteredItems = deepcopy(filterItemsSearch(
		// 		deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItems)),
		// 		searchTerm
		// 	));
		// }
		//
		// favoriteItemValues = favoriteItems;
	});	


	let filteredItems: SidebarItem[] = $state(deepcopy(allItems));
	let searchTerm = $state("");




	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(searchTerm: string): void {
		// const activeCategoryStoreData = get(activeCategoryStore);
		//
		// if (activeCategoryStoreData === '' || activeCategoryStoreData === 'all') {
		// 	filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
		//
		// 	console.log(filteredItems);
		// }
		//
		// if (activeCategoryStoreData === 'recent') {
		// 	filteredItems = deepcopy(filterItemsSearch(
		// 		deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
		// 		searchTerm
		// 	));
		// }
		//
		// if (activeCategoryStoreData === 'favorite') {
		// 	filteredItems = deepcopy(filterItemsSearch(
		// 		deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
		// 		searchTerm
		// 	));
		// }
	}


	// event listener pro otevření vyhledávání v dialogu po zmáčknutí CTRL+F, nastavení sidebaru podle aktivní kategorie
	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				isSidebarCommandOpen = !isSidebarCommandOpen;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		// activeCategoryStore.subscribe(data => {
		// 	if (data === '' || data === 'all') {
		// 		filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
		// 		buttonBorderSwitch();
		// 	}
		//
		// 	if (data === 'recent') {
		// 		filteredItems = deepcopy(filterItemsSearch(
		// 			deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
		// 			searchTerm
		// 		));
		// 		buttonBorderSwitch();
		// 	}
		//
		// 	if (data === 'favorite') {
		// 		filteredItems = deepcopy(filterItemsSearch(
		// 			deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
		// 			searchTerm
		// 		));
		// 		buttonBorderSwitch();
		// 	}
		// });
		}


	);


	const translations = $derived.by(() => {
		return {
			"pruvodni_list": m.components_sidebar_item_pruvodni_list(),
			"sklad": m.components_sidebar_item_sklad(),
			"hodinovka": m.components_sidebar_item_sklad_hodinovka(),
			"prijem_a_vydej": m.components_sidebar_item_sklad_prijem_a_vydej(),
			"stav_skladu": m.components_sidebar_item_sklad_stav_skladu(),
			"zasilky": m.components_sidebar_item_sklad_zasilky(),
			"vyroba": m.components_sidebar_item_vyroba(),
			"motivy": m.components_sidebar_item_vyroba_motivy(),
			"raznice": m.components_sidebar_item_vyroba_raznice(),
			"obalky": m.components_sidebar_item_vyroba_obalky(),
			"texty": m.components_sidebar_item_vyroba_texty(),
			"prodej": m.components_sidebar_item_prodej(),
			"zakaznici": m.components_sidebar_item_prodej_zakaznici(),
			"zakaznici_sk": m.components_sidebar_item_prodej_zakaznici_sk(),
			"prehledy": m.components_sidebar_item_prodej_prehledy(),
			"analyza_prodeju": m.components_sidebar_item_prodej_analyza_prodeju()
		}
	})
</script>



<div class={
	(sidebarOpen.value
		? 'w-[280px] p-4 '
		: 'w-fit p-2 ')
		+ 'flex flex-col h-full overflow-auto bg-white rounded-lg'
	}
>
	{#if sidebarOpen.value}
		<div class="flex justify-center text-sm mb-4">
			<CategoryButton color="secondary" />
		</div>

		<div class="flex-1 flex flex-col">
			<Input
				class="mb-4 focus-visible:ring-0"
				placeholder={m.components_sidebar_search_placeholder()}
				type="search"
				bind:value={searchTerm}
				oninput={() => search(searchTerm)}
			/>

			<SidebarOpen
				translations={translations}
				searchTerm={searchTerm}
				bind:filteredItems
				bind:isSidebarOpen={sidebarOpen.value}
			/>
		</div>
	{:else}
<!--		<SidebarClosed-->
<!--			bind:filteredItems-->
<!--			bind:isSidebarCommandOpen-->
<!--			bind:isSidebarOpen-->
<!--		/>-->
	{/if}
</div>

<!--<SidebarCommand items={allItems} bind:isSidebarCommandOpen />-->
