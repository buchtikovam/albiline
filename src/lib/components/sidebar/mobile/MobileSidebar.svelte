<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import CategoryButton from '$lib/components/sidebar/SidebarCategoryTabs.svelte';
	import { Input } from '$lib/components/ui/input';
	import { get } from 'svelte/store';
	import deepcopy from 'deepcopy';
	import { filterItemsSearch } from '$lib/utils/sidebar/filterItemsSearch';
	import { activeCategoryStore, favoriteItemsStore, recentItemsStore } from '$lib/stores/sidebarStore';
	import { filterItemsCategory } from '$lib/utils/sidebar/filterItemsCategory';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import { allItems } from '$lib/data/components/sidebar';
	import MobileSidebarItems from './MobileSidebarItems.svelte';
	import { buttonBorderSwitch } from '$lib/utils/sidebar/buttonBorderSwitch';
	import { onMount } from 'svelte';


	export let isOpen: boolean = false;

	let filteredItems: SidebarItem[] = deepcopy(allItems);
	let searchTerm = '';


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


	onMount(() => {
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
		})
	});
</script>



<Dialog.Root bind:open={isOpen}>
	<Dialog.Content class="h-full  bg-albi-50 p-2 border-none">
		<div class="bg-white h-full flex flex-col items-center rounded-lg p-4">
			<CategoryButton color="primary" />


			<div class="flex flex-col w-full h-full">
				<Input
					class="my-4 focus-visible:ring-0"
					placeholder="Filtrovat..."
					bind:value={searchTerm}
					on:input={() => search(searchTerm)}
				/>
	
				<div class="h-full overflow-auto">
					<MobileSidebarItems
						bind:searchTerm
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