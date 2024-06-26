<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { FetchedFilter, StoredFilters } from '$lib/types/table/filter';
	import { page } from '$app/stores';
	import { currentFiltersStore } from '$lib/stores/tableStore';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';
	import WarningDialog from '$lib/components/dialog/warning-dialog/WarningDialog.svelte';
	import { handleRibbonDialogClose } from '$lib/utils/ribbon/handleRibbonDialogClose';
	import { writable, type Writable } from 'svelte/store';
	import { customToast } from '$lib/utils/toast/customToast';
	import { apiServiceDELETE } from '$lib/api/apiService';

	let dialogOpen: boolean = false;
	let warningDialogOpen: boolean = false;
	let currentFilterId: number;

	let filtersData: FetchedFilter[] | undefined = undefined;
	let deleteFilterConsent: Writable<boolean> = writable(false);


	(async function getFilters() {
		try {
			const response = await fetch('http://localhost:3000/filters');
			filtersData = await response.json();

			filtersData = filtersData?.filter((filter: FetchedFilter) => {
				return filter.pageOrigin === $page.url.pathname;
			});
		} catch (error) {
			console.error('Error fetching input-filters:', error);
		}
	})();

	function editFilter(filters: StoredFilters | null) {
		if (filters) {
			console.log('edit');
		}
		// TODO: make into editable when edit icon clicked, then update in json db

	}

	async function deleteFilter(filterId: number | undefined) {
		if (!filterId) {
			return;
		}

		try {
			console.log('Deleting filter...');

			const response = await apiServiceDELETE("filters", filterId);

			if (!response.ok) {
				customToast('Critical', 'Nastala chyba při mazání filtru.');
			}

			customToast('Success', 'Filtr byl úspěšně smazán');

			if (filtersData) {
				filtersData = filtersData.filter(filter => filter.id !== filterId);
			}
		} catch (error) {
			console.error('Error deleting filter:', error);
			customToast('Critical', 'Nastala chyba při mazání filtru.');
		}
	}


	function loadFilterInTable(filters: StoredFilters | null) {
		if (filters) {
			dialogOpen = false;
			currentFiltersStore.set(filters);
			openedDialogStore.set(undefined);
			ribbonActionStore.set(undefined);
		}
	}

	deleteFilterConsent.subscribe((consent) => {
		if (consent) {
			deleteFilter(currentFilterId);
		}

		deleteFilterConsent.set(false);
	});


	onMount(() => {
		dialogOpen = true;
	});
</script>

<!-- TODO: add order -->

<Dialog.Root bind:open={dialogOpen} onOpenChange={() => handleRibbonDialogClose()}>
	<Dialog.Content class="!min-w-[400px] !w-fit">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Moje filtry
			</Dialog.Title>
		</Dialog.Header>


		{#if filtersData !== undefined}
			<div>
				{#each filtersData as filter}
					<div class="flex justify-between items-center hover:bg-muted/70 rounded-md px-1">
						<button
							on:click={() => loadFilterInTable(filter.filters)}
							class="text-left text-sm w-full  hover:text-primary px-0.5 py-2"
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
								on:click={() => {
									warningDialogOpen = true
									if (filter.id) currentFilterId = filter.id
								}}
								class="size-5"
							>
								<X class="size-4 text-albi-600 hover:text-albi-900" />
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

<WarningDialog
	bind:open={warningDialogOpen}
	bind:consent={deleteFilterConsent}
	message="Opravdu chcete pokračovat?"
	desription="Tuhle akci nelze vrátit."
	buttonAllowLabel="Smazat filtr"
	buttonDenyLabel="Zrušit"
/>
