<script lang="ts">
	import { customerInvoiceAddressesAgGridDef } from '$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerInvoiceAddressesAgGridDef';
	import { openedRibbonDialog } from '$lib/runes/ribbon.svelte.js';
	import { page } from '$app/state';
	import { apiServiceGET } from '$lib/api/apiService.svelte.js';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import type {GridOptions} from "ag-grid-enterprise";


	const activeRow = page.params.customerNodeCode;
	let dialogOpen: boolean = $state(true)
	let invoiceAddresses = $state([]);


	async function getInvoiceAddresses() {
		const res = await apiServiceGET(`customers/${activeRow}/invoice-addresses`);

		if (res.ok) {
			const resData = await res.json();
			invoiceAddresses = resData.items;
		}
	}


	$effect(() => {
		getInvoiceAddresses();
	})

	const customGridOptions: GridOptions = {
		columnDefs: customerInvoiceAddressesAgGridDef,
	}
</script>



<DialogWrapper
	isOpen={dialogOpen}
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
	<AgGridCSWrapper
		fullHeight={true}
		rowData={invoiceAddresses}
		gridOptionsCustom={customGridOptions}
	/>
{/snippet}
