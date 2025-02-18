<script lang="ts">
	import { openedRibbonDialog, ribbonAction } from '$lib/runes/ribbon.svelte.js';
	import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';
	import SaveFiltersDialog from "$lib/components/dialog/ribbon/SaveFiltersDialog.svelte";
	import SavePresetDialog from "$lib/components/dialog/ribbon/SavePresetDialog.svelte";
	import MyFiltersDialog from "$lib/components/dialog/ribbon/MyFiltersDialog.svelte";

	// contains ribbon items that are generic for most tables.
	// Specific ribbon items are imported in +page.svelte/+layout.svelte

	let currentDialog: GlobalDialogOptions = $derived(openedRibbonDialog.value);
</script>




{#if currentDialog === "ribbon-my-filters"}
	<MyFiltersDialog />
{/if}


{#if currentDialog === "ribbon-save-filters"}
	<SaveFiltersDialog />
{/if}


<!--{#if currentDialog === "ribbon-my-presets"}-->
<!--	<MyPresetsDialog />-->
<!--{/if}-->


{#if currentDialog === "ribbon-save-preset"}
	<SavePresetDialog />
{/if}
