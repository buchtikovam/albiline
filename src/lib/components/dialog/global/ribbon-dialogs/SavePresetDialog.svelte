<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { savePresets } from '$lib/utils/components/ribbon/savePresets';

	/*
		Dialog pro uložení nové šablony,
		po vložení názvu se provede savePresets funkce
	*/

	let dialogOpen: boolean = false;
	let inputValue: string = "";


	function handleSavePresets(event: Event) {
		event.preventDefault();
		savePresets(inputValue, $page.url.pathname);

		setTimeout(() => {
			openedDialogStore.set(undefined)
		}, 250)

		dialogOpen = false
	}

 
	onMount(() => {
		dialogOpen = true;
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="!w-fit">
		<Dialog.Header>
			<Dialog.Title class="h-4 mb-4">
				Uložení šablony
			</Dialog.Title>
		</Dialog.Header>

		<form on:submit={handleSavePresets} class="p-0.5">
			<Label for="test" class="text-right">
				Název nové šablony
			</Label>

			<Input
				id="test"
				bind:value={inputValue}
				required
				class="w-[220px] "
			/>

			<Dialog.Footer>
				<Button
					type="submit"
					class="mt-4 w-full bg-albi-500 text-background font-bolder"
				>
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
