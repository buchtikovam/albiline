<script lang="ts">
	import {favoriteItems, recentItems, sidebarCategory} from "$lib/runes/sidebar.svelte.js";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";
	import {filterItemsCategory} from "$lib/utils/components/sidebar/filterItemsCategory";
	import {filterItemsSearch} from "$lib/utils/components/sidebar/filterItemsSearch";
	import deepcopy from "deepcopy";
	import type {SidebarItem} from "$lib/types/components/sidebar/sidebar";
	import SidebarCategorySwitcher from "$lib/components/sidebar/SidebarCategorySwitcher.svelte";
	import SidebarAvatar from "$lib/components/sidebar/SidebarAvatar.svelte";
	import SidebarInput from "$lib/components/sidebar/SidebarInput.svelte";
	import SidebarMain from "$lib/components/sidebar/SidebarMain.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {SidebarRail} from "$lib/components/ui/sidebar/index.js";


	let filteredItems: SidebarItem[] = $state(deepcopy(allItems));
	let searchTerm = $state("");


	// vyhledávání přes input v sidebaru pomocí rekurzivního filtrování
	function search(
		searchTerm: string,
		category: "all"|"recent"|"favorite"
	): void {
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
</script>




<Sidebar.Root
	collapsible="icon"
	variant="floating"
>
	<Sidebar.Header class="bg-white ">
		<SidebarCategorySwitcher/>
		<SidebarInput bind:searchTerm />
	</Sidebar.Header>


	<Sidebar.Content class="bg-white">
		<SidebarMain
			bind:sidebarItems={filteredItems}
		/>
	</Sidebar.Content>


	<Sidebar.Footer class="bg-white">
		<SidebarAvatar />
	</Sidebar.Footer>

	<SidebarRail class="hover:bg-albi-50 my-2"/>
</Sidebar.Root>
