<script lang="ts">
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import NewItemDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/NewItemDialog.svelte';
	import type { RibbonDialog } from '$lib/types/ribbon/ribbonDialog';
	import MyFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/MyFiltersDialog.svelte';
	import MyPresetsDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/MyPresetsDialog.svelte';
	import SaveFiltersDialog from '$lib/components/dialog/ribbon-dialogs/sub-dialogs/SaveFiltersDialog.svelte';

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
