<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { FetchedFilter, StoredFilters } from '$lib/types/filter';
	import { page } from '$app/stores';
	import { currentFiltersStore } from '$lib/stores/tableStore';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';

	// TODO: style my filters

	let filtersData: FetchedFilter[] | undefined = undefined;

	(async function getFilters() {
		try {
			const response = await fetch('http://localhost:3000/filters');
			filtersData = await response.json();

			filtersData = filtersData?.filter((filter: FetchedFilter) => {
				return filter.pageOrigin === $page.url.pathname;
			});
		} catch (error) {
			console.error('Error fetching filters:', error);
		}
	})();


	function editFilter(filters: StoredFilters|null) {
		if (filters) {
			console.log("edit");
		}
		// TODO: make into editable when edit icon clicked, then update in json db
	}

	function deleteFilter(filters: StoredFilters|null) {
		if (filters) {
			console.log("delete");
		}
		// 	TODO: delete filters on button click, but warn with a dialog first
	}

	function handleFilterClick(filters: StoredFilters|null) {
		if (filters) {
			currentFiltersStore.set(filters);
			dialogOpen = false;
			openedDialogStore.set(undefined);
			ribbonActionStore.set(undefined);
		}
	}

	let dialogOpen: boolean = false;

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!min-w-[400px] !w-fit">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-4">
				Moje filtry
			</Dialog.Title>
		</Dialog.Header>


		{#if filtersData !== undefined}
			<div >
			{#each filtersData as filter}
				<div class="flex justify-between gap-4 items-center">
					<button
						on:click={() => handleFilterClick(filter.filters)}
						class="text-left text-sm w-full rounded-md hover:bg-muted/70 hover:text-primary px-0.5 py-2"
					>
						{filter.filterName}
					</button>

					<div class="flex gap-2">
						<button
							on:click={() => editFilter(filter.filters)}
							class="size-5"
						>
							<Pencil class="size-4 text-albi-600 hover:text-albi-900" />
						</button>
						<button
							on:click={() => deleteFilter(filter.filters)}
							class="size-5"
						>
							<X class="!size-4 text-albi-600 hover:text-albi-900" />
						</button>
					</div>
				</div>
			{/each}
			</div>
		{:else}
			<p>Loading</p>
		{/if}
	</Dialog.Content>
</Dialog.Root>
