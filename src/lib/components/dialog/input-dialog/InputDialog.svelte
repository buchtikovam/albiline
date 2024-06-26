<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import InputStringNumber
		from '$lib/components/dialog/input-dialog/input-dialog-components/InputStringNumber.svelte';
	import InputDialogDateRange
		from '$lib/components/dialog/input-dialog/input-dialog-components/DateRange.svelte';
	import type { InputDialog, InputDialogItem } from '$lib/types/inputDialog';
	import { customToast } from '$lib/utils/toast/customToast';

	/*
	Vstupní parametry pro správné načtení jednotlivých stránek.

	Komponent očekává, že se v $lib/data/inputDialogs nachází soubor, který se jmenuje stejně
	jako poslední část routy stránky (později se předělá na fetch z db) a v tomto souboru má být
	nadefinovaný obsah input dialogu v podobě objektu.

	Po vyplnění všech inputů +page.svelte získává data
	*/

	export let inputDialogObjects: Record<string, any>;

	let dialogOpen: boolean = false;
	let dialogContent: InputDialog;

	let pathLength = $page.url.pathname.split('/').length;
	let fileName = $page.url.pathname.split('/')[pathLength - 1];


	async function getParams() {
		let response = await import((`$lib/data/inputDialogs/${fileName}.ts`));
		dialogContent = response.params;
	}


	function handleSubmit(event: Event) {
		event.preventDefault();

		inputDialogObjects = {};

		dialogContent.forEach((item: InputDialogItem) => {
			if (item.type === 'string' || item.type === 'number' || item.type === 'date') {
				if (item.value) {
					inputDialogObjects[item.name] = item.value;
				}
			}

			if (item.type === 'date-range') {
				if (item.startDateValue && item.endDateValue) {
					inputDialogObjects[item.name] = {
						startDateValue: item.startDateValue,
						endDateValue: item.endDateValue
					};
				}
			}
		});

		if (Object.entries(inputDialogObjects).length === dialogContent.length) {
			dialogOpen = false;
		} else {
			customToast('Warning', 'Prosím vyplňte všechna pole');
		}
	}

	onMount(() => {
		dialogOpen = true;
		getParams();
	});

	// TODO: input dialog: checkbox

	// TODO: input dialog: radiobuttons

	// TODO: input dialog: set of date preset buttons

</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-[500px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>

		<form on:submit={handleSubmit}>
			<div class="flex flex-wrap justify-between gap-2.5 mb-4">
				{#if dialogContent}
					{#each dialogContent as item}
						{#if item.type === "string" || item.type === "number"}
							<InputStringNumber item={item} bind:value={item.value} />
						{/if}

						{#if item.type === "date"}
							<DatePicker label={item.label} bind:value={item.value} />
						{/if}

						{#if item.type === "date-range"}
							<InputDialogDateRange item={item} bind:startDateValue={item.startDateValue}
												  bind:endDateValue={item.endDateValue} />
						{/if}
					{/each}
				{/if}

			</div>

			<Dialog.Footer>
				<Button type="submit" class="w-full bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
