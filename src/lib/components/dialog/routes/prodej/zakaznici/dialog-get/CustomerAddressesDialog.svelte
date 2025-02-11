<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import NewCustomerAddressDialog from '$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerAddressDialog.svelte';
	import AgGridCSDialogWrapper from '$lib/components/ag-grid/AgGridCSDialogWrapper.svelte';
	import * as Dialog from "$lib/components/ui/dialog";
	import {newCustomerAddressFormDef} from "$lib/data/autoform/zakaznici/newCustomerAddressFormDef";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";

	interface Props {
		colDef: any;
		rowData: any[];
		open: boolean;
	}

	let {
		colDef,
		rowData,
		open = $bindable()
	}: Props = $props();

	let openNewAddressDialog: boolean = $state(false);

	function newCustomerAddressDialog() {
		open = false;
		openNewAddressDialog = true;
	}
</script>




<DialogWrapper
	bind:isOpen={open}
	size="lg"
	fixedHeight={true}
	{header}
	{content}
/>


{#snippet header()}
	<Dialog.Title class="flex items-center gap-2">
		Výběr prodejny

		<button
			onclick={newCustomerAddressDialog}
		>
			<Plus
				strokeWidth={2.5}
				class="text-albi-500 size-5 hover:text-albi-700"
			/>
		</button>
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<AgGridCSDialogWrapper
		rowData={rowData}
		colDef={colDef}
	/>
{/snippet}


<NewCustomerAddressDialog
	bind:dialogOpen={openNewAddressDialog}
	label="Nová prodejna"
	formDef={newCustomerAddressFormDef}
/>

