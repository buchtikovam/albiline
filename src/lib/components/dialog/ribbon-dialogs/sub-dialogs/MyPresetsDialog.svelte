<script lang="ts">
	import { page } from '$app/stores';
	import { selectedFilterStore, selectedPresetStore } from '$lib/stores/tableStore';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from "$lib/components/ui/skeleton/index.js";
	import type { FetchedPreset, Preset } from '$lib/types/table/presets';
	import { apiServiceDELETE, apiServicePUT } from '$lib/api/apiService';
	import { customToast } from '$lib/utils/customToast';
	import { writable, type Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import Pencil from 'lucide-svelte/icons/pencil';
	import X from 'lucide-svelte/icons/x';
	import WarningDialog from '$lib/components/dialog/warning-dialog/WarningDialog.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	/*
		Dialog zobrazující uložené šablony pro danou tabulku,
		možnost řazení, editace a mazání šablon
	*/

	let dialogOpen: boolean = false;
	let warningDialogOpen: boolean = false;	

	let currentPresetId: number;
	let presets: FetchedPreset[];
	let deleteConsent: Writable<boolean> = writable(false);

	let isEditing: boolean = false;
	let currentEditedId: number | undefined = undefined;


	async function fetchPresets() {
		try {
			// fetch only filters based on page name, avoid filtering on FE
			const response = await fetch('http://localhost:3000/presets');
			presets = await response.json();

			presets = presets?.filter((filter: FetchedPreset) => {
				return filter.pageOrigin === $page.url.pathname;
			});
		} catch (error) {
			console.error('Error fetching input-filters:', error);
			customToast("Warning", "Nepovedlo se fetchnout filtery.")
		}
	}


	// Drag and drop pro řazení filtrů
	let hovering: number | null;
	let start: number;

	function dragPreset(e: DragEvent, index: number) {
		if (e.dataTransfer) {
			e.dataTransfer.setData('text', String(index));
			start = index;
		}
	}

	function setHoveringPreset(index: number) {
		hovering = index;
	}

	function dropPreset(e: DragEvent, target: number | null) {
		if (e.dataTransfer && target !== null) {
			if (start < target) {
				presets.splice(target + 1, 0, presets[start]);
				presets.splice(start, 1);
			} else {
				presets.splice(target, 0, presets[start]);
				presets.splice(start + 1, 1);
			}
			hovering = null;
		}
	}


	// Smazání filtru po souhlasu ve warning dialogu
	async function deletePreset(filterId: number | undefined) {
		if (!filterId) return;

		try {
			const response = await apiServiceDELETE('presets', filterId);

			if (!response.ok) {
				customToast(
					'Critical',
					'Nastala chyba při mazání šablony.'
				);
			}
			// frontendové smazání filtru, aby se nemuselo znovu fetchovat
			presets = presets?.filter(filter => filter.id !== filterId);
			customToast(
				'Success',
				'Šablona byla úspěšně smazána'
			);
		} catch (error) {
			console.error('Error deleting filter:', error);
			customToast(
				'Critical',
				'Nastala chyba při mazání šablony.'
			);
		}
	}


	function loadPresetsInTable(presets: Preset[]) {
		selectedPresetStore.set(presets)
		
		ribbonActionStore.set(undefined);
		dialogOpen = false;
		setTimeout(() => {
			openedDialogStore.set(undefined);
		}, 250);
	}


	async function updatePreset(preset: FetchedPreset) {
		try {
			const response = await apiServicePUT(
				"presets",
				preset.id,
				preset
			)

			if (response.ok) {
				customToast('Success','Šablona byla úspěšně upravena.');
				isEditing = false;
			} else {
				customToast('Critical','Nastala chyba při editaci šablony.');
				isEditing = false;
			}

		} catch (error) {
			customToast('Critical','Nastala chyba při editaci šablony.');
			console.error('Error deleting preset:', error);
		}
	}


	// Nastavuje se ve warning dialogu. Pokud je true, zvolený filtr se smaže
	deleteConsent.subscribe((consent) => {
		if (consent) {
			deletePreset(currentPresetId);
		}

		deleteConsent.set(false);
	});


	onMount(() => {
		dialogOpen = true;
		fetchPresets()
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="!w-[400px]">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Moje šablony
			</Dialog.Title>
		</Dialog.Header>


		{#if presets !== undefined}
			{#if presets.length === 0}
				<p class="mt-2">
					Nemáte uložené žádné šablony.
				</p>
			{/if}

			<div>
				{#each presets as preset, index (preset.id)}
					<div
						role="listitem"
						class="flex justify-between items-center hover:bg-muted/70 rounded-md px-1"
					>
						{#if isEditing && currentEditedId === preset.id}
							<form
								on:submit={() => updatePreset(preset)}
								on:focusout={() => updatePreset(preset)}
								class="w-full">
								<Input
									class="w-fit h-7 m-1"
									bind:value={preset.presetName}
								/>
							</form>
						{:else}
							<button
								draggable="true"
								on:click={() => loadPresetsInTable(preset.presets)}
								on:dragstart={(e) => dragPreset(e, index)}
								on:dragover={() => setHoveringPreset(index)}
								on:dragend={(e) => dropPreset(e, hovering)}
								class="text-left text-sm w-full hover:text-primary px-0.5 py-2"
							>
								{preset.presetName}
							</button>
						{/if}

						<div class="flex gap-2 ml-4">
							<button
								on:click={() => {
									isEditing = !isEditing
									currentEditedId = preset.id
								}}
								class="size-5"
							>
								<Pencil class="size-4 text-albi-600 hover:text-albi-900" />
							</button>

							<button
								on:click={() => {
									warningDialogOpen = true
									if (preset.id) currentPresetId = preset.id
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
	bind:consent={deleteConsent}
	message="Opravdu chcete pokračovat?"
	desription="Tuhle akci nelze vrátit."
	buttonAllowLabel="Smazat šablonu"
	buttonDenyLabel="Zrušit"
/>
