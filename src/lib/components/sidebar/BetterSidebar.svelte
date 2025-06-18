<script lang="ts">
	import { openedSidebarItems, recentItems, sidebarCategory } from "$lib/runes/sidebar.svelte.js";
	import { allItems } from "$lib/definitions/components/sidebar/sidebar";
	import { apiServiceGETHandled } from "$lib/api/apiService.svelte";
	import { filterItemsCategory } from "$lib/utils/components/sidebar/filterItemsCategory";
	import { filterItemsSearch } from "$lib/utils/components/sidebar/filterItemsSearch";
	import deepcopy from "deepcopy";
	import type { SidebarItem } from "$lib/types/components/sidebar/sidebar";
	import SidebarCategorySwitcher from "$lib/components/sidebar/SidebarCategorySwitcher.svelte";
	import SidebarAvatar from "$lib/components/sidebar/SidebarAvatar.svelte";
	import SidebarInput from "$lib/components/sidebar/SidebarInput.svelte";
	import SidebarMain from "./SidebarMain.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";

	interface Props {
		onmousedown: (event: MouseEvent) => void;
		onclick: (event: MouseEvent) => void;
	}

	let {
		onmousedown,
		onclick,
	}: Props = $props();


	let sidebarItems: SidebarItem[] = $state([]);
	let searchTerm = $state("");


	function applyOpenedState(items: SidebarItem[], openedFields: string[]): void {
		for (const item of items) {
			if (openedFields.includes(item.field)) {
				item.open = true;
			}
			if (item.children && item.children.length > 0) {
				applyOpenedState(item.children, openedFields);
			}
		}
	}


	async function getFavoriteSidebarItems() {
		const response = await apiServiceGETHandled("userMenuFavorites");
		return response.data;
	}


	$effect(() => {
		(async () => {
			let processedItems = deepcopy(allItems);

			// Apply the persisted open state from sessionStorage.
			const openedFields = openedSidebarItems.value;
			if (openedFields.length > 0) {
				applyOpenedState(processedItems, openedFields);
			}

			// Filter by the selected category.
			const category = sidebarCategory.value;
			if (category === 'recent') {
				processedItems = filterItemsCategory(processedItems, recentItems.value);
			} else if (category === 'favorite') {
				processedItems = filterItemsCategory(processedItems, await getFavoriteSidebarItems());
			}

			// Filter by the search term.
			processedItems = filterItemsSearch(processedItems, searchTerm);
			sidebarItems = processedItems;
		})();
	});
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
			bind:sidebarItems={sidebarItems}
		/>
	</Sidebar.Content>

	<Sidebar.Footer class="bg-white">
		<SidebarAvatar />
	</Sidebar.Footer>

	<Sidebar.Rail
		{onmousedown}
		{onclick}
		class="hover:bg-albi-50"
	/>
</Sidebar.Root>
