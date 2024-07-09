<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import type { RibbonDialog } from '$lib/types/ribbon/ribbonDialog';
	import NewItemDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/todo-NewItemDialog.svelte';
	import MyFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/MyFiltersDialog.svelte';
	import MyPresetsDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/todo-MyPresetsDialog.svelte';
	import SaveFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/SaveFiltersDialog.svelte';

	/*
		Rozcestník pro otvírání různých dialogů skrz ribbon tlačítka
	*/

	let currentDialog: RibbonDialog | undefined = undefined;

	openedDialogStore.subscribe((dialog) => {
		currentDialog = dialog
	})
</script>



{#if currentDialog === "new"}
	<NewItemDialog />
{/if}

{#if currentDialog === "my-filters"}
	<MyFiltersDialog />
{/if}

{#if currentDialog === "my-presets"}
	<MyPresetsDialog />
{/if}

{#if currentDialog === "save-filters"}
	<SaveFiltersDialog />
{/if}
