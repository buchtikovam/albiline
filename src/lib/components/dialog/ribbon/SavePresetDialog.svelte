<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import {filtersToSave, presetToSave} from "$lib/runes/table.svelte";
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import type {ColDef} from "ag-grid-enterprise";
	import type {StoredPreset, StoredPresets} from "$lib/types/components/table/presets";


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
		const strippedPreset: StoredPreset[] = presetToSave.value.map((preset: ColDef) => {
			return {
				field: preset.field,
				width: preset.width,
				hide: preset.hide || false,
				rowGroup: preset.rowGroup,
				rowGroupIndex: preset.rowGroupIndex,
				pivot: preset.pivot,
				pivotIndex: preset.pivotIndex,
				aggFunc: preset.aggFunc,
				pinned: preset.pinned,
				sort: preset.sort,
				sortIndex: preset.sortIndex,
			};
		});

		console.log(inputValue, JSON.stringify(strippedPreset, null, 1));
	}
</script>



<DialogWrapper
	bind:isOpen
	onChange={() => {
		isOpen = false;
		setTimeout(() => {
			openedRibbonDialog.value = "empty";
		}, 200)
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
