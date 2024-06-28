<script lang="ts">
	import { page } from '$app/stores';
	import { currentFiltersStore } from '$lib/stores/tableStore';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { onMount } from 'svelte';
	import { handleRibbonDialogClose } from '$lib/utils/ribbon/handleRibbonDialogClose';
	import { writable, type Writable } from 'svelte/store';
	import { customToast } from '$lib/utils/toast/customToast';
	import { apiServiceDELETE } from '$lib/api/apiService';
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';
	import type { FetchedFilter, StoredFilters } from '$lib/types/table/filter';
	import WarningDialog from '$lib/components/dialog/warning-dialog/WarningDialog.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';

	let dialogOpen: boolean = false;
	let warningDialogOpen: boolean = false;
	let currentFilterId: number;

	let filtersData: FetchedFilter[] | undefined = undefined;
	let deleteFilterConsent: Writable<boolean> = writable(false);

	let isEditing: boolean = false;
	let editingFilterId: number | undefined = undefined;

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

	function editFilter(filter: FetchedFilter) {
		isEditing = !isEditing;
		editingFilterId = filter.id;

		// TODO: after edit, save in json db
	}

	function drag(e: DragEvent, index: number) {
		if (e.dataTransfer) {
			e.dataTransfer.setData('text', String(index));
			start = index;
		}
	}

	let hovering: number | null;
	let start: number;

	function drop(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			if (filtersData) {
				if (start < target) {
					filtersData.splice(target + 1, 0, filtersData[start]);
					filtersData.splice(start, 1);
					// 	TODO: save in local storage ?

				} else {
					filtersData.splice(target, 0, filtersData[start]);
					filtersData.splice(start + 1, 1);
				}
				hovering = null;
			}
		}
	}

	function setHovering(index: number) {
		hovering = index;
	}

	async function deleteFilter(filterId: number | undefined) {
		if (!filterId) {
			return;
		}

		try {
			console.log('Deleting filter...');

			const response = await apiServiceDELETE('filters', filterId);

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

<Dialog.Root bind:open={dialogOpen} onOpenChange={() => handleRibbonDialogClose()}>
	<Dialog.Content class="!min-w-[400px] !w-fit">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Moje filtry
			</Dialog.Title>
		</Dialog.Header>


		{#if filtersData !== undefined}
			<div>
				{#each filtersData as filter, index (filter.id)}
					<div
						role={isEditing && editingFilterId === filter.id ? 'region form' : null}
						draggable="true"
						on:focusout={() => {editingFilterId = undefined}}
						on:dragstart={(e) => drag(e, index)}
						on:dragover={() => setHovering(index)}
						on:dragend={(e) => drop(e, hovering)}
						class="flex justify-between items-center hover:bg-muted/70 rounded-md px-1 cursor-grab active:cursor-grabbing "
					>
						{#if isEditing && editingFilterId === filter.id}
							<form
								class="w-full p-1"
								on:submit|preventDefault={() => {editingFilterId = undefined}}
							>
								<Input
									class="w-full h-7 focus-visible:ring-0 px-1.5"
									bind:value={filter.filterName}
									on:focusout={() => {editingFilterId = undefined}}
								/>
							</form>
						{:else}
							<button
								on:click={() => loadFilterInTable(filter.filters)}
								class="text-left text-sm w-full hover:text-primary px-0.5 py-2"
							>
								{filter.filterName}
							</button>
						{/if}


						<div class="flex gap-2 ml-4">
							<button
								on:click={() => editFilter(filter)}
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
