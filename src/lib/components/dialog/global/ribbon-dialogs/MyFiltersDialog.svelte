<script lang="ts">
	import { page } from '$app/stores';
	import { selectedFilterStore } from '$lib/runes-global/table.svelte';
	import { openedDialogStore, ribbonActionStore } from '$lib/runes-global/ribbonStore';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
	import type { FetchedFilter, ColumnFilters } from '$lib/types/components/table/columnFilter';
	// import { apiServiceDELETE, apiServicePUT } from '$lib/api/apiService';
	import { customToast } from '$lib/utils/customToast';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';
	import WarningDialog from '$lib/components/dialog/warning/WarningDialog.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	/*
		Dialog zobrazující uložené column filtry pro danou tabulku,
		možnost řazení, editace a mazání filtrů
	*/

	let dialogOpen: boolean = $state(false);
	let warningDialogOpen: boolean = $state(false);	

	let currentFilterId: number = $state();
	let filters: FetchedFilter[] = $state();
	let deleteFilterConsent: Writable<boolean> = $state(writable(false));

	let isEditing: boolean = $state(false);
	let currentEditedId: number | undefined = $state(undefined);


	async function fetchFilters() {
		try {
			// fetch only filters based on page name, avoid filtering on FE
			const response = await fetch('http://localhost:3000/filters');
			filters = await response.json();

			filters = filters?.filter((filter: FetchedFilter) => {
				return filter.pageOrigin === $page.url.pathname;
			});
		} catch (error) {
			console.error('Error fetching input-filters:', error);
			customToast("Warning", "Nepovedlo se fetchnout filtery.")
		}
	}


	// Drag and drop pro řazení filtrů
	let hovering: number | null = $state();
	let start: number;

	function dragFilter(e: DragEvent, index: number) {
		if (e.dataTransfer) {
			e.dataTransfer.setData('text', String(index));
			start = index;
		}
	}

	function setHoveringFilter(index: number) {
		hovering = index;
	}

	function dropFilter(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			if (start < target) {
				filters.splice(target + 1, 0, filters[start]);
				filters.splice(start, 1);
			} else {
				filters.splice(target, 0, filters[start]);
				filters.splice(start + 1, 1);
			}
			hovering = null;
		}
	}


	// Smazání filtru po souhlasu ve warning dialogu
	async function deleteFilter(filterId: number | undefined) {
		if (!filterId) return;

		console.log("delete filter");
		//
		// try {
		// 	const response = await apiServiceDELETE('filters', filterId);
		//
		// 	if (!response.ok) {
		// 		customToast(
		// 			'Critical',
		// 			'Nastala chyba při mazání filtru.'
		// 		);
		// 	}
		// 	// frontendové smazání filtru, aby se nemuselo znovu fetchovat
		// 	filters = filters?.filter(filter => filter.id !== filterId);
		// 	customToast(
		// 		'Success',
		// 		'Filtr byl úspěšně smazán'
		// 	);
		// } catch (error) {
		// 	console.error('Error deleting filter:', error);
		// 	customToast(
		// 		'Critical',
		// 		'Nastala chyba při mazání filtru.'
		// 	);
		// }
	}


	function loadFiltersInTable(filters: ColumnFilters) {
		selectedFilterStore.set(filters)
		ribbonActionStore.set(undefined);
		dialogOpen = false;
		setTimeout(() => {
			openedDialogStore.set(undefined);
		}, 250);
	}


	async function updateFilter(filter: FetchedFilter) {
		console.log("update filter");

		// try {
		// 	const response = await apiServicePUT(
		// 		"filters",
		// 		filter.id,
		// 		filter
		// 	)
		//
		// 	if (response.ok) {
		// 		customToast('Success','Filtr byl úspěšně upraven.');
		// 		isEditing = false;
		// 	} else {
		// 		customToast('Critical','Nastala chyba při editaci filtru.');
		// 		isEditing = false;
		// 	}
		//
		// } catch (error) {
		// 	customToast('Critical','Nastala chyba při editaci filtru.');
		// 	console.error('Error deleting filter:', error);
		// }
	}


	// Nastavuje se ve warning dialogu. Pokud je true, zvolený filtr se smaže
	deleteFilterConsent.subscribe((consent) => {
		if (consent) {
			deleteFilter(currentFilterId);
		}

		deleteFilterConsent.set(false);
	});


	onMount(() => {
		dialogOpen = true;
		fetchFilters()
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="!w-[400px]">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Moje filtry
			</Dialog.Title>
		</Dialog.Header>


		{#if filters !== undefined}
			{#if filters.length === 0}
				<p class="mt-2">
					Nemáte uložené žádné filtry.
				</p>
			{/if}

			<div>
				{#each filters as filter, index (filter.id)}
					<div
						role="listitem"
						class="flex justify-between items-center hover:bg-muted/70 rounded-md px-1"
					>
						{#if isEditing && currentEditedId === filter.id}
							<form
								onsubmit={() => updateFilter(filter)}
								onfocusout={() => updateFilter(filter)}
								class="w-full">
								<Input
									class="w-fit h-7 m-1"
									bind:value={filter.filterName}
								/>
							</form>
						{:else}
							<button
								draggable="true"
								onclick={() => loadFiltersInTable(filter.filters)}
								ondragstart={(e) => dragFilter(e, index)}
								ondragover={() => setHoveringFilter(index)}
								ondragend={(e) => dropFilter(e, hovering)}
								class="text-left text-sm w-full hover:text-primary px-0.5 py-2"
							>
								{filter.filterName}
							</button>
						{/if}

						<div class="flex gap-2 ml-4">
							<button
								onclick={() => {
									isEditing = !isEditing
									currentEditedId = filter.id
								}}
								class="size-5"
							>
								<Pencil class="size-4 text-albi-600 hover:text-albi-900" />
							</button>

							<button
								onclick={() => {
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
			<!-- Placeholdery během toho, co se filtry fetchují.
			Ukáže se jen při pomalém internetu -->
			<div class="space-y-3 mt-2">
				<Skeleton class="h-4 w-[250px]" />
				<Skeleton class="h-4 w-[180px]" />
				<Skeleton class="h-4 w-[220px]" />
			</div>
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
