<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import { filtersToSave } from "$lib/runes/table.svelte";
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import {apiServicePOST} from "$lib/api/apiService.svelte";
	import {responseDialogMessages} from "$lib/runes/page.svelte";


	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	async function saveFilters() {
		const saveObj = {
			filterName: inputValue,
			filters: filtersToSave.value
		}

		// console.log(JSON.stringify(saveObj, null, 1)) ;

		try {
			const resp = await apiServicePOST("userfilters", saveObj, "zakaznici");

			if (resp.ok) {
				isOpen = false;
				setTimeout(() => {
					openedRibbonDialog.value = "empty";
				}, 200)
			} else {
				let respData = await resp.json()
				responseDialogMessages.value = respData.messages
			}
		} catch (e) {
			console.error("Unexpexted error: ", e)
		}
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
