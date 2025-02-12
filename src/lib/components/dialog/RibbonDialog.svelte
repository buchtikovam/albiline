<script lang="ts">
	import CustomerDetailInvoiceAdressesDialog from '$lib/components/dialog/routes/prodej/zakaznici/dialog-get/CustomerInvoiceAdressesDialog.svelte';
	import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';
	import {openedDialog, ribbonAction} from '$lib/runes/ribbon.svelte.js';
	import MyFiltersDialog from "$lib/components/dialog/ribbon/MyFiltersDialog.svelte";
	// import SaveFiltersDialog from '$lib/components/dialog/global/ribbon-dialogs/SaveFiltersDialog.svelte';
	// import SavePresetDialog from '$lib/components/dialog/global/ribbon-dialogs/SavePresetDialog.svelte';
	// import MyPresetsDialog from '$lib/components/dialog/global/ribbon-dialogs/MyPresetsDialog.svelte';


	let currentDialog: GlobalDialogOptions = $derived(openedDialog.value);

	$inspect(currentDialog)
	$inspect(ribbonAction.value)
</script>


{#if currentDialog === "ribbon-my-filters"}
	<MyFiltersDialog />
{/if}

<!--{#if currentDialog === "ribbon-save-filters"}-->
<!--	<SaveFiltersDialog />-->
<!--{/if}-->

<!--{#if currentDialog === "ribbon-my-presets"}-->
<!--	<MyPresetsDialog />-->
<!--{/if}-->

<!--{#if currentDialog === "ribbon-save-preset"}-->
<!--	<SavePresetDialog />-->
<!--{/if}-->
