<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import { filtersToSave } from "$lib/runes/table.svelte";
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		isOpen: boolean;
		inputValue: string;
		onChange: () => void;
		onSubmit: () => void;
		title: string,
		label: string,
	}

	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	function saveFilters() {
		console.log(inputValue, JSON.stringify(filtersToSave.value, null, 2));
	}
</script>



<DialogWrapper
	bind:isOpen
	onChange={() => {
		isOpen = false;
		setTimeout(() => {
			openedRibbonDialog.value = "empty";
		}, 200)	}}
	{header}
	{content}
	fixedHeight={false}
	size="sm"
/>


{#snippet header()}
	<Dialog.Title>
		Uložit filtry
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<form
		onsubmit={saveFilters}
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
