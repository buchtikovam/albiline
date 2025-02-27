<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import type {ColDef} from "ag-grid-enterprise";
	import type {StoredPreset} from "$lib/types/components/table/presets";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte.js";
	import {pageCode, responseDialogMessages} from "$lib/runes/page.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import {apiServicePOST} from "$lib/api/apiService.svelte";

	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	async function savePreset() {
		const strippedPreset: StoredPreset[] = serverSideTables[pageCode.value].presetToSave.map((preset: ColDef) => {
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

		const presetToSave = {
			pagePresetName: inputValue,
			pagePresetValue: strippedPreset
		}

		console.log(JSON.stringify(presetToSave, null, 1));

		try {
			const resp = await apiServicePOST("userpresets", presetToSave);

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
			console.error("Unexpected error: ", e)
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
