<script lang="ts">
	import CustomerDetailInvoiceAdressesDialog from './detail-dialogs/CustomerDetailInvoiceAdressesDialog.svelte';
	import { openedDialogStore } from '$lib/stores/ribbonStore';
	import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';
	import MyFiltersDialog from '$lib/components/dialog/global/ribbon-dialogs/MyFiltersDialog.svelte';
	import SaveFiltersDialog from '$lib/components/dialog/global/ribbon-dialogs/SaveFiltersDialog.svelte';
	import SavePresetDialog from '$lib/components/dialog/global/ribbon-dialogs/SavePresetDialog.svelte';
	import MyPresetsDialog from '$lib/components/dialog/global/ribbon-dialogs/MyPresetsDialog.svelte';

	/*
		Rozcestník pro otvírání různých dialogů skrz ribbon tlačítka
	*/

	let currentDialog: GlobalDialogOptions | undefined = $openedDialogStore;

	openedDialogStore.subscribe((dialog) => {
		console.log(dialog);
		currentDialog = dialog
	})
</script>



{#if currentDialog === "customer-detail-invoice-addresses"}
	<CustomerDetailInvoiceAdressesDialog />
{/if}


<!-- RIBBON DIALOGY -->

{#if currentDialog === "ribbon-my-filters"}
	<MyFiltersDialog />
{/if}

{#if currentDialog === "ribbon-save-filters"}
	<SaveFiltersDialog />
{/if}

{#if currentDialog === "ribbon-my-presets"}
	<MyPresetsDialog />
{/if}

{#if currentDialog === "ribbon-save-preset"}
	<SavePresetDialog />
{/if}
