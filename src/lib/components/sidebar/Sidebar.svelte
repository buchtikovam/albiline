<script lang="ts">
	import {
		sidebarOpenStore,
		recentItemsStore,
		favoriteItemsStore,
		activeCategoryStore
	} from '$lib/stores/sidebarStore';
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
	import SidebarClosed from './SidebarClosed.svelte';
	import SidebarOpen from './SidebarOpen.svelte';

	/*
		Resizable sidebar se třemi kategoriemi,
		tlačítky pro přepínání kategorií a inputem
	*/

	let isSidebarCommandOpen: boolean = false;
	let isSidebarOpen: boolean = true;
	sidebarOpenStore.subscribe(data => {
		isSidebarOpen = data; 
	});


	let recentItemValues: string[] = [];
	recentItemsStore.subscribe(recentItems => {
		recentItemValues = recentItems;
	});


	let favoriteItemValues: string[] = [];
	favoriteItemsStore.subscribe(favoriteItems => {
		// znovu načtění itemů po odebrání položky z favorites
		if (favoriteItemValues.length > favoriteItems.length) {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItems)),
				searchTerm
			));
		}

		favoriteItemValues = favoriteItems;
	});	


	let filteredItems: SidebarItem[] = deepcopy(allItems);
	let searchTerm = '';

	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(searchTerm: string): void {
		const activeCategoryStoreData = get(activeCategoryStore);

		if (activeCategoryStoreData === '' || activeCategoryStoreData === 'all') {
			filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
		}

		if (activeCategoryStoreData === 'recent') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
				searchTerm
			));
		}

		if (activeCategoryStoreData === 'favorite') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
				searchTerm
			));
		}
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

		activeCategoryStore.subscribe(data => {
			if (data === '' || data === 'all') {
				filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
				buttonBorderSwitch();
			}

			if (data === 'recent') {
				filteredItems = deepcopy(filterItemsSearch(
					deepcopy(filterItemsCategory(deepcopy(allItems), recentItemValues)),
					searchTerm
				));
				buttonBorderSwitch();
			}

			if (data === 'favorite') {
				filteredItems = deepcopy(filterItemsSearch(
					deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItemValues)),
					searchTerm
				));
				buttonBorderSwitch();
			}
		});
		}
	);


	onMount(() => {
		isSidebarOpen = get(sidebarOpenStore);
	})
</script>



<div class="
	{isSidebarOpen ? "w-[280px] p-4" : "w-fit p-2"}
	flex flex-col h-full overflow-auto bg-white rounded-lg "
>
	<!-- otevřený sidebar (buttons na překlikávání kategorií, input pole a stromová struktura sidebaru) -->
	{#if isSidebarOpen === true}
		<div class="flex justify-center text-sm mb-4">
			<CategoryButton color="secondary" />
		</div>

		<div class="flex-1 flex flex-col">
			<Input
				class="mb-4 focus-visible:ring-0"
				placeholder="Filtrovat..."
				bind:value={searchTerm}
				on:input={() => search(searchTerm)}
			/>

			<SidebarOpen
				bind:searchTerm
				bind:filteredItems
				bind:isSidebarOpen
			/>
		</div>
	{:else}
		<!-- zavřený sidebar (ikony s tooltipem a popoverem) -->
		<SidebarClosed 
			bind:filteredItems
			bind:isSidebarCommandOpen
			bind:isSidebarOpen
		/>
	{/if}
</div>

<!-- hledání v sidebaru pomocí dialogu -->
<SidebarCommand items={allItems} bind:isSidebarCommandOpen />
