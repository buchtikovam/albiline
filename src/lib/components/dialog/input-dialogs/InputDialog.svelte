<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import type { InputDialogItem } from '$lib/types/inputDialog';
	import InputString from '$lib/components/dialog/input-dialogs/Input.svelte';
	import { handleRibbonDialogClose } from '$lib/utils/ribbon/handleRibbonDialogClose';

	let dialogOpen: boolean = false;
	export let objects: any[];

	let pathLength = $page.url.pathname.split('/').length;
	let param = $page.url.pathname.split('/')[pathLength - 1];

	let params: InputDialogItem[];
	async function getParams() {
		let response = await import((`$lib/data/inputDialogs/${param}.ts`))
		params = response.params
	}

	function handleSubmit(event: Event) {
		event.preventDefault();

		objects = [];

		params.forEach((param: InputDialogItem) => {
			objects.push(param.value || param.date)
			console.log(param.value);
		})

		console.log("objects", objects);

		dialogOpen = false;
	}

	onMount(() => {
		dialogOpen = true;

		getParams();
	});

/*
	TODO: input ribbon-dialog: daterange, checkbox, radiobuttons
 */
</script>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="!w-[500px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6">
				Test dialog
			</Dialog.Title>
			<Dialog.Description>
				Prosím zadejte parametry.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit={handleSubmit}>
			<div class="flex flex-wrap justify-between gap-1 mb-7">
				{#if params}
					{#each params as param}
						{#if param.type === "string" || param.type === "number"}
							<InputString type={param.type} label={param.label} id={param.id} bind:value={param.value} />
						{/if}

						{#if param.type === "date"}
							<DatePicker label={param.label} bind:value={param.date} />
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
