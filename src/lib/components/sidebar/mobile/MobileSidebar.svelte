<script lang="ts">
	import { sidebarCategory, favoriteItems, recentItems } from '$lib/runes/sidebar.svelte';
	import { allItems } from '$lib/definitions/components/sidebar/sidebar';
	import { Input } from '$lib/components/ui/input';
	import { filterItemsCategory } from '$lib/utils/components/sidebar/filterItemsCategory';
	import { filterItemsSearch } from '$lib/utils/components/sidebar/filterItemsSearch';
	import deepcopy from 'deepcopy';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import MobileSidebarItems from './MobileSidebarItems.svelte';
	import CategoryButton from '$lib/components/sidebar/SidebarCategoryTabs.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable() }: Props = $props();


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



<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="h-full block md:hidden border-none ">
		<div class="bg-none h-full flex flex-col bg-white items-center rounded-lg ">
			<div class="h-9">

				<CategoryButton color="primary" />
			</div>


			<div class="flex flex-col w-full h-full">
				<Input
					class="my-4 focus-visible:ring-0"
					placeholder="Filtrovat..."
					bind:value={searchTerm}
				/>

				<div class="h-full overflow-auto">
					<MobileSidebarItems
						{searchTerm}
						bind:filteredItems
						bind:isOpen
					/>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>


<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
