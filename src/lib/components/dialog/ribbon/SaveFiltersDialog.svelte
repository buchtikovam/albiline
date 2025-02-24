<script lang="ts">
	import {pageKey, responseDialogMessages} from "$lib/runes/page.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {apiServicePOST} from "$lib/api/apiService.svelte";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";


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
			filters: serverSideTables[pageKey.value].filtersToSave
		}

		try {
			const resp = await apiServicePOST("userfilters", saveObj);

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
	title="Uložit filtry"
	label="Název"
	saveButtonLabel="Potvrdit"
/>
