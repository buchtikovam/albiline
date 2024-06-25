<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { openedDialogStore, ribbonActionStore } from '$lib/stores/ribbonStore';
	import { handleRibbonDialogClose } from '$lib/utils/ribbon/handleRibbonDialogClose';

	let dialogOpen: boolean = false;

	function handleSubmit(event: Event) {
		event.preventDefault();
		dialogOpen = false
		openedDialogStore.set(undefined)
		ribbonActionStore.set(undefined)
	}

	onMount(() => {
		dialogOpen = true;
	});
</script>

<Dialog.Root bind:open={dialogOpen} onOpenChange={() => handleRibbonDialogClose()}>
	<Dialog.Content class="!w-[500px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6">
				Nový záznam
			</Dialog.Title>
			<Dialog.Description>
				Prosím zadejte parametry.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit={handleSubmit}>
			<Label for="test" class="text-right">
				test
			</Label>
			<Input
				id="test"
				required
				class="focus-visible:ring-0 w-[220px]"
			/>

			<Dialog.Footer>
				<Button type="submit" class="mt-6 w-full bg-albi-500 text-background font-bolder">
					Potvrdit
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
