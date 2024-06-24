<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { saveFilters } from '$lib/utils/ribbon/ribbon-actions/saveFilters';
	import { page } from '$app/stores';

	let dialogOpen: boolean = false;
	let inputValue: string = "";

	// TODO: style saveFilters

	function handleSubmit(event: Event) {
		event.preventDefault();

		dialogOpen = false

		saveFilters(inputValue, $page.url.pathname);

		setTimeout(() => {
			openedDialogStore.set(undefined)
			ribbonActionStore.set(undefined)
		}, 250)
	}

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen} >
	<Dialog.Content class="!w-fit ">
		<Dialog.Header>
			<Dialog.Title class="h-4">
				Uložení filtrů
			</Dialog.Title>
		</Dialog.Header>
		<form on:submit={handleSubmit}>
			<Label for="test" class="text-right">
				Název nové kolekce
			</Label>
			<Input
				id="test"
				bind:value={inputValue}
				required
				class="focus-visible:ring-0 w-[220px]"
			/>

			<Dialog.Footer>
				<Button type="submit" class="mt-4 w-full bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
