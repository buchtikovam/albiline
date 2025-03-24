<script lang="ts">
	import SidebarCategorySwitcher from "$lib/components/sidebar/better/SidebarCategorySwitcher.svelte";
	import SidebarAvatar from "$lib/components/sidebar/better/SidebarAvatar.svelte";
	import SidebarInput from "$lib/components/sidebar/better/SidebarInput.svelte";
	import SidebarMain from "$lib/components/sidebar/better/SidebarMain.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import type {SidebarItem} from "$lib/types/components/sidebar/sidebar";
	import deepcopy from "deepcopy";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";
	import {filterItemsSearch} from "$lib/utils/components/sidebar/filterItemsSearch";
	import {filterItemsCategory} from "$lib/utils/components/sidebar/filterItemsCategory";
	import {favoriteItems, recentItems, sidebarCategory} from "$lib/runes/sidebar.svelte";


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
			sidebarItems={filteredItems}
		/>
	</Sidebar.Content>


	<Sidebar.Footer class="bg-white">
		<SidebarAvatar />
	</Sidebar.Footer>
</Sidebar.Root>
