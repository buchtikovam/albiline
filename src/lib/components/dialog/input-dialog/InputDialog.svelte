<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import InputStringNumber from '$lib/components/dialog/input-dialog/dialog-components/InputStringNumber.svelte';
	import DateRange from '$lib/components/dialog/input-dialog/dialog-components/DateRange.svelte';
	import type { InputDialog, InputDialogItem } from '$lib/types/input-dialog/inputDialog';
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import CheckboxGroup from '$lib/components/dialog/input-dialog/dialog-components/CheckboxGroup.svelte';
	import RadioGroup from '$lib/components/dialog/input-dialog/dialog-components/RadioGroup.svelte';

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
				console.log(item.startDateValue);
				console.log(item.endDateValue);

				if (item.startDateValue && item.endDateValue) {
					inputDialogObjects[item.name] = {
						startDateValue: item.startDateValue,
						endDateValue: item.endDateValue
					};

					dialogOpen = false
				}
			}
		});

		// if (Object.entries(inputDialogObjects).length === dialogContent.length) {
		// 	dialogOpen = false;
		// } else {
		// 	customToast('Warning', 'Prosím vyplňte všechna pole');
		// }
	}

	onMount(() => {
		dialogOpen = true;
		getParams();
	});
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-[400px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>

		<form on:submit={handleSubmit}>
			{#if dialogContent}
				<div class="flex flex-wrap justify-between gap-2.5 mb-4">

					{#each dialogContent as item}
						{#if item.type === "string" || item.type === "number"}
							<InputStringNumber item={item} bind:value={item.value} />
						{/if}

						{#if item.type === "date"}
							<DatePicker label={item.label} bind:dateValue={item.value} />
						{/if}

						{#if item.type === "date-range"}
							<DateRange
								item={item}
								bind:startDateValue={item.startDateValue}
								bind:endDateValue={item.endDateValue}
							/>
						{/if}

						{#if item.type === "checkbox-group"}
							<CheckboxGroup items={item.children}/>
						{/if}

						{#if item.type === "radio-group"}
							<RadioGroup item={item}/>
						{/if}
					{/each}
				</div>
			{/if}


			<Dialog.Footer>
				<Button type="submit" class="w-full bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
