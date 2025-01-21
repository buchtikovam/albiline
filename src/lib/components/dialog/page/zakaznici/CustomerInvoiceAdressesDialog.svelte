<script lang="ts">
	import { customerInvoiceAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerInvoiceAddressesAgGridDef';
	import { openedDialog } from '$lib/runes/ribbon.svelte';
	import { page } from '$app/stores';
	import { apiServiceGET } from '$lib/api/apiService.svelte';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import * as Dialog from '$lib/components/ui/dialog';


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



<Dialog.Root
	bind:open={dialogOpen}
>
	<Dialog.Content
		class="h-[70%] w-[90%] md:w-[700px] lg:w-[900px] xl:w-[1200px] max-w-[1200px] flex flex-col"
	>
		<Dialog.Header>
			<Dialog.Title
				class="h-6"
			>
				Výběr fakturační adresy
			</Dialog.Title>
		</Dialog.Header>

		<AgGridCSDialogWrapper
			colDef={customerInvoiceAddressesAgGridDef}
			rowData={invoiceAddresses}
		/>
	</Dialog.Content>
</Dialog.Root>
