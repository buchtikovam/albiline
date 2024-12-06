<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';
	import { saveFilters } from '$lib/utils/components/ribbon/saveFilters';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	/*
		Dialog pro uložení nového filtru,
		po vložení názvu se provede saveFilters funkce
	*/

	let dialogOpen: boolean = $state(false);
	let inputValue: string = $state("");

	
	function handleSaveFilters(event: Event) {
		event.preventDefault();
		saveFilters(inputValue, $page.url.pathname);

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
				Uložení filtrů
			</Dialog.Title>
		</Dialog.Header>

		<form onsubmit={handleSaveFilters} class="p-0.5">
			<Label for="test" class="text-right">
				Název nové kolekce
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
