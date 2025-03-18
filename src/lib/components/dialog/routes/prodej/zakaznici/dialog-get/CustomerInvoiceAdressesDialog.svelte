<script lang="ts">
	import {
		customerInvoiceAddressCustomGridOptions, customerInvoiceAddressHeaderTranslations,
	} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerInvoiceAddressesAgGridDef';
	import {openedRibbonDialog} from '$lib/runes/ribbon.svelte.js';
	import {apiGetCustomerInvoiceAddresses} from "$lib/api/routes/customerService.svelte.js";
	import {onMount} from "svelte";
	import type {CustomerInvoiceAddressType} from "$lib/types/routes/prodej/zakaznci/customers";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';


	let dialogOpen: boolean = $state(false)
	let invoiceAddresses: CustomerInvoiceAddressType[] = $state([]);


	onMount(async () => {
		dialogOpen = true;
		invoiceAddresses = await apiGetCustomerInvoiceAddresses();
	})
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	onChange={() => {
		setTimeout(() => {
			openedRibbonDialog.value = 'empty';
		}, 200)
	}}
	{header}
	{content}
	size="lg"
	fixedHeight={true}
/>


{#snippet header()}
	<Dialog.Title
		class="h-6"
	>
		{m.routes_prodej_zakaznici_customer_detail_invoice_address_selection()}
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<AgGridCSSecondaryWrapper
		fullHeight={true}
		rowData={invoiceAddresses}
		gridOptionsCustom={customerInvoiceAddressCustomGridOptions}
		headerTranslations={customerInvoiceAddressHeaderTranslations}
	/>
{/snippet}
