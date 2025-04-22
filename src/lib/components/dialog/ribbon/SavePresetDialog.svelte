<script lang="ts">
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte.js";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import type {ColumnState} from "ag-grid-enterprise";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";
	import * as m from '$lib/paraglide/messages.js'


	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");
	let pageKey = $derived(currentPageKey.value);


	$effect(() => {
		isOpen = true;
	})


	async function savePreset() {
		const columnState: ColumnState[] = agGridTables.value[pageKey].presetToSave;

		const presetToSave = {
			pagePresetName: inputValue,
			pagePresetValue: columnState
		}

		const response = await apiServicePostHandled("userpresets", presetToSave);

		if (response.success) {
			isOpen = false;
			setTimeout(() => {
				openedRibbonDialog.value = "empty";
			}, 200)
		}
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
	title={m.components_ribbon_dialog_save_preset_label}
	label={m.components_ribbon_dialog_save_preset_input_label}
	saveButtonLabel={m.components_ribbon_dialog_save_preset_save_button}
/>
