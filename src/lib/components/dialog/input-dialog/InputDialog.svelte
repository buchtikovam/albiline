<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import type { InputDialog, InputDialogItem } from '$lib/types/input-dialog/inputDialog';
	import { onMount } from 'svelte';
	import { customToast } from '$lib/utils/toast/customToast';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import InputStringNumber from '$lib/components/dialog/input-dialog/dialog-components/InputStringNumber.svelte';
	import DateRange from '$lib/components/dialog/input-dialog/dialog-components/DateRange.svelte';
	import RadioGroup from '$lib/components/dialog/input-dialog/dialog-components/RadioGroup.svelte';
	import CheckboxGroup from '$lib/components/dialog/input-dialog/dialog-components/CheckboxGroup.svelte';
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	/*
		Vstupní parametry pro získávání dat jednotlivých stránek.

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


	async function getInputDialogData() {
		let response = await import((`$lib/data/inputDialogs/${fileName}.ts`));
		dialogContent = response.params;
	}


	/*
		funkce do jednoho objektu namapuje item values ze všech komponent
		a kontroluje, zda byla všechna pole vyplněna (později validace přes Zod)
	*/
	function handleDialogSubmitButton(event: Event) {
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

			if (item.type === "radio-group") {
				inputDialogObjects[item.name] = item.checkedValue
			}

			if (item.type === "checkbox-group") {
				inputDialogObjects[item.name] = item.children
					.filter((child) => child.checked === true)
					.map((child) => child.id)
			}
		});

		if (Object.entries(inputDialogObjects).length === dialogContent.length) {
			dialogOpen = false;
		} else {
			customToast('Warning', 'Prosím vyplňte všechna pole');
		}
	}


	onMount(() => {
		getInputDialogData();
		dialogOpen = true;
	});
</script>



<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-fit overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				Vstupní parametry
			</Dialog.Title>
		</Dialog.Header>

		<form on:submit={handleDialogSubmitButton}>
			{#if dialogContent}
				<div class="flex flex-col gap-2.5 mb-4">
					{#each dialogContent as item}
						{#if item.type === "string" || item.type === "number"}
							<InputStringNumber
								item={item}
								bind:value={item.value}
							/>
						{/if}

						{#if item.type === "date"}
							<DatePicker
								label={item.label}
								bind:dateValue={item.value}
							/>
						{/if}

						{#if item.type === "date-range"}
							<DateRange
								item={item}
								bind:startDateValue={item.startDateValue}
								bind:endDateValue={item.endDateValue}
							/>
						{/if}

						{#if item.type === "checkbox-group"}
							<CheckboxGroup bind:items={item.children} />
						{/if}

						{#if item.type === "radio-group"}
							<RadioGroup bind:item={item}/>
						{/if}

					<!-- TODO: add preset buttons -->
					{/each}
				</div>
			{/if}

			<Dialog.Footer>
				<Button
					type="submit"
					class="w-full bg-albi-500 text-background font-bolder"
				>
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
