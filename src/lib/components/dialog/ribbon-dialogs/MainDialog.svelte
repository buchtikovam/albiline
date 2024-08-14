<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import type { RibbonDialogOptions } from '$lib/types/ribbon/ribbonDialogOptions';
	import MyFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/MyFiltersDialog.svelte';
	import SaveFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/SaveFiltersDialog.svelte';
	import SavePresetDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/SavePresetDialog.svelte';
	import MyPresetsDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/MyPresetsDialog.svelte';

	/*
		Rozcestník pro otvírání různých dialogů skrz ribbon tlačítka
	*/

	let currentDialog: RibbonDialogOptions | undefined = $openedDialogStore;

	openedDialogStore.subscribe((dialog) => {
		currentDialog = dialog	
		console.log(dialog);
		
	})
</script>



{#if currentDialog === "my-filters"}
	<MyFiltersDialog />
{/if}

{#if currentDialog === "save-filters"}
	<SaveFiltersDialog />
{/if}

{#if currentDialog === "my-presets"}
	<MyPresetsDialog />
{/if}

{#if currentDialog === "save-preset"}
	<SavePresetDialog />
{/if}
