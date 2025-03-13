<script lang="ts">
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";
	import * as m from "$lib/paraglide/messages";


	let isOpen: boolean = $state(false);
	let inputValue: string = $state("");
	let pageKey = $derived(currentPageKey.value)


	$effect(() => {
		isOpen = true;
	})


	async function saveFilters() {
		const saveObj = {
			filterName: inputValue,
			filters: agGridTables.value[pageKey].filtersToSave
		}

		const response = await apiServicePostHandled("userfilters", saveObj);

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
	onSubmit={saveFilters}
	title={m.components_ribbon_dialog_save_filters_label}
	label={m.components_ribbon_dialog_save_filters_input_label}
	saveButtonLabel={m.components_ribbon_dialog_save_filters_save_button}
/>
