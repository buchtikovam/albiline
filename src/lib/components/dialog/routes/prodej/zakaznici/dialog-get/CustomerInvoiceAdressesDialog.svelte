<script lang="ts">
	import { customerInvoiceAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerInvoiceAddressesAgGridDef';
	import { openedDialog } from '$lib/runes/ribbon.svelte.js';
	import { page } from '$app/stores';
	import { apiServiceGET } from '$lib/api/apiService.svelte.js';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";


	let dialogOpen: boolean = $state(true)
	let invoiceAddresses = $state();
	const activeRow = $page.params.customerNodeCode;


	async function getInvoiceAddresses() {
		const res = await apiServiceGET(`customers/${activeRow}/invoice-addresses`);

		if (res.ok) {
			const data = await res.json();
			invoiceAddresses = data.items;
		}
	}


	$effect(() => {
		getInvoiceAddresses();
	});


	$effect(() => {
		if (!dialogOpen) {
			setTimeout(() => {
				openedDialog.value = 'empty';
			}, 200)
		}
	})
</script>



<DialogWrapper
	isOpen={dialogOpen}
	{header}
	{content}
	size="lg"
	fixedHeight={true}
/>


{#snippet header()}
	<Dialog.Title
		class="h-6"
	>
		Výběr fakturační adresy
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<AgGridCSDialogWrapper
		colDef={customerInvoiceAddressesAgGridDef}
		rowData={invoiceAddresses}
	/>
{/snippet}
