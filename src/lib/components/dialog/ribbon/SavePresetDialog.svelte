<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import type {ColDef} from "ag-grid-enterprise";
	import type {StoredPreset} from "$lib/types/components/table/presets";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte.js";
	import {pageKey} from "$lib/runes/page.svelte";


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
		const strippedPreset: StoredPreset[] = serverSideTables[pageKey.value].presetToSave.map((preset: ColDef) => {
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



<SaveWithLabelDialog
	bind:isOpen
	bind:inputValue
	onChange={() => {
		isOpen = false;
		setTimeout(() => {
			openedRibbonDialog.value = "empty";
		}, 200)
	}}
	onSubmit={savePreset}
	title="Uložit filtry"
	label="Název"
	saveButtonLabel="Potvrdit"
/>
