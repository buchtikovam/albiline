<script lang="ts">
	import {
		sidebarCategory, sidebarOpen, recentItems, favoriteItems
	} from '$lib/runes/sidebar.svelte';
	import { allItems } from '$lib/data/page-components/sidebar';
	import { Input } from '$lib/components/ui/input';
	import { filterItemsSearch } from '$lib/utils/components/sidebar/filterItemsSearch';
	import { filterItemsCategory } from '$lib/utils/components/sidebar/filterItemsCategory';
	import deepcopy from 'deepcopy';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import CategoryButton from '$lib/components/sidebar/SidebarCategoryTabs.svelte';
	import SidebarOpen from './SidebarOpen.svelte';
	import * as m from "$lib/paraglide/messages.js"
	import SidebarCommand from '$lib/components/sidebar/SidebarCommand.svelte';
	import SidebarClosed from './SidebarClosed.svelte';
	import SidebarToggleButton from '$lib/components/sidebar/SidebarToggleButton.svelte';

	let isSidebarCommandOpen: boolean = $state(false);
	let filteredItems: SidebarItem[] = $state(deepcopy(allItems));
	let searchTerm = $state("");


	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(searchTerm: string, category: "all"|"recent"|"favorite"): void {
		if (category === 'all') {
			filteredItems = deepcopy(filterItemsSearch(deepcopy(allItems), searchTerm));
		}

		if (category === 'recent') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), recentItems.value)),
				searchTerm
			));
		}

		if (category === 'favorite') {
			filteredItems = deepcopy(filterItemsSearch(
				deepcopy(filterItemsCategory(deepcopy(allItems), favoriteItems.value)),
				searchTerm
			));
		}
	}

	$effect(() => {
		search(searchTerm, sidebarCategory.value);
	})


	// event listener pro otevření vyhledávání v dialogu po zmáčknutí CTRL+F, nastavení sidebaru podle aktivní kategorie
	$effect(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'd' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				isSidebarCommandOpen = !isSidebarCommandOpen;
			}
		}

		document.addEventListener('keydown', handleKeydown);
	});
</script>



<div
	class={
		(sidebarOpen.value
			? 'w-[280px] p-4 '
			: 'w-[60px] p-2 ')
			+ 'flex flex-col h-full overflow-auto bg-white rounded-lg transition-all duration-300'
	}
>
	{#if sidebarOpen.value}
		<div class="flex justify-center text-sm mb-4">
			<CategoryButton color="secondary" />
		</div>

		<div class="flex-1 flex flex-col">
			<Input
				class="mb-4 focus-visible:ring-0 border-border"
				placeholder={m.components_sidebar_search_placeholder()}
				type="search"
				bind:value={searchTerm}
			/>

			<SidebarOpen
				searchTerm={searchTerm}
				bind:filteredItems
			/>
		</div>
	{:else}
		<SidebarClosed
			bind:filteredItems
			bind:isSidebarCommandOpen
		/>
	{/if}
</div>



<SidebarCommand items={allItems} bind:isSidebarCommandOpen />

