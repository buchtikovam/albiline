<script lang="ts">
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/runes-global/tableStore';
	import { get, writable } from 'svelte/store';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import { customerInvoiceAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerInvoiceAddressesAgGridDef';
	import { apiServiceGET } from '$lib/api/apiService';

	const activeRow = get(selectedRowsStore)[get(activeSelectedRowIndexStore)]
	let dialogOpen: boolean = $state(false);
	let invoiceAddresses = $state(writable([]))

	async function getInvoiceAddresses() {
		const res = await apiServiceGET(`customers/${activeRow.customerNodeCode}/invoice-addresses`)

		if (res.ok) {
			console.log("fetch");
			const data = await res.json();
			invoiceAddresses.set(data.items);
		}
	}


	onMount(() => {
		getInvoiceAddresses();
		dialogOpen = true;
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content
		class="h-[94%] lg:h-[80%] lg:!w-[70%] max-w-[1400px] flex flex-col"
	>
		<Dialog.Header>
			<Dialog.Title
				class="h-6 mb-2"
			>
				Výběr fakturační adresy
			</Dialog.Title>
		</Dialog.Header>

		<AgGridCSDialogWrapper
			bind:rowData={invoiceAddresses}
			colDef={customerInvoiceAddressesAgGridDef}
		/>
	</Dialog.Content>
</Dialog.Root>
