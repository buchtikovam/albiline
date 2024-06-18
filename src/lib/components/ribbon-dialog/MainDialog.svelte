<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import NewItemDialog from '$lib/components/ribbon-dialog/sub-dialogs/NewItemDialog.svelte';
	import type { RibbonDialog } from '$lib/types/ribbonDialog';
	import MyFiltersDialog from '$lib/components/ribbon-dialog/sub-dialogs/MyFiltersDialog.svelte';
	import MyPresetsDialog from '$lib/components/ribbon-dialog/sub-dialogs/MyPresetsDialog.svelte';
	import SaveFiltersDialog from '$lib/components/ribbon-dialog/sub-dialogs/SaveFiltersDialog.svelte';

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
