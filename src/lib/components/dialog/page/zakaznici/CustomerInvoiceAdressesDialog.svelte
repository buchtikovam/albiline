<script lang="ts">
	import { activeSelectedRowIndex, storedSelectedRows } from '$lib/runes/table.svelte';
	import { customerInvoiceAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerInvoiceAddressesAgGridDef';
	import { apiServiceGET } from '$lib/api/apiService';
	import { onMount } from 'svelte';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import * as Dialog from '$lib/components/ui/dialog';


	interface Props {
		dialogOpen: boolean;
		invoiceAddresses: any[]
	}

	let { dialogOpen = $bindable(), invoiceAddresses }: Props = $props();


	const activeRow = storedSelectedRows.value[activeSelectedRowIndex.value]

	async function getInvoiceAddresses() {
		const res = await apiServiceGET(`customers/${activeRow.customerNodeCode}/invoice-addresses`)

		if (res.ok) {
			const data = await res.json();
			invoiceAddresses = data.items;
		}
	}

	onMount(() => {
		getInvoiceAddresses();
		dialogOpen = true;
	});
</script>



<Dialog.Root
	bind:open={dialogOpen}
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
			rowData={invoiceAddresses}
			colDef={customerInvoiceAddressesAgGridDef}
		/>
	</Dialog.Content>
</Dialog.Root>
