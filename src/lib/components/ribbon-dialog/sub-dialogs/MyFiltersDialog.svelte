<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { FetchedFilter, StoredFilters } from '$lib/types/filter';
	import { page } from '$app/stores';
	import { currentFiltersStore } from '$lib/stores/tableStore';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { Button } from '$lib/components/ui/button';

	let filtersData: FetchedFilter[] | undefined = undefined;

	// TODO: style myFilters

	(async function getFilters() {
		try {
			const response = await fetch('http://localhost:3000/filters');
			filtersData = await response.json();
			console.log(filtersData);

			filtersData = filtersData?.filter((filter: FetchedFilter) => {
				return filter.pageOrigin === $page.url.pathname;
			});
		} catch (error) {
			console.error('Error fetching filters:', error);
		}
	})();


	function handleClick(filters: StoredFilters) {
		currentFiltersStore.set(filters);
		dialogOpen = false;
		openedDialogStore.set(undefined);
		ribbonActionStore.set(undefined);
	}

	let dialogOpen: boolean = false;

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!min-w-[300px] !w-fit">
		<Dialog.Header>
			<Dialog.Title class="h-6">
				Moje filtry
			</Dialog.Title>
		</Dialog.Header>

		{#if filtersData !== undefined}
			{#each filtersData as filter}
				<Button variant="outline" on:click={() => handleClick(filter.filters)}>
					{filter.filterName}
				</Button>
			{/each}

		{:else}
			<p>Loading</p>
		{/if}

<!--		<Button type="submit" class="mt-6 w-full bg-albi-500 text-background font-bolder">-->
<!--			Potvrdit-->
<!--		</Button>-->
	</Dialog.Content>
</Dialog.Root>
