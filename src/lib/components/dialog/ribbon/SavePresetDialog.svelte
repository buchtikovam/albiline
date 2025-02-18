<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import { filtersToSave } from "$lib/runes/table.svelte";
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';


	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	function savePreset() {
		console.log(inputValue, filtersToSave.value)
	}
</script>



<DialogWrapper
	bind:isOpen
	onChange={() => {
		isOpen = false;
		openedRibbonDialog.value = "empty";
	}}
	{header}
	{content}
	fixedHeight={false}
	size="sm"
/>

{#snippet header()}
	<Dialog.Title>
		Uložit šablonu
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<form
		onsubmit={savePreset}
		class="p-0.5 pt-0 -mt-1"
	>
		<Label
			for="name"
			class="text-right"
		>
			Název
		</Label>

		<Input
			id="name"
			bind:value={inputValue}
			required
			class=""
		/>

		<Dialog.Footer>
			<Button
				type="submit"
				class="mt-6 w-full"
			>
				Potvrdit
			</Button>
		</Dialog.Footer>
	</form>
{/snippet}
