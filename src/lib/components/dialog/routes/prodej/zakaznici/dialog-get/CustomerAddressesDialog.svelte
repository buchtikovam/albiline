<script lang="ts">
	import {newCustomerAddressFormDef} from "$lib/definitions/routes/prodej/zakaznici/autoform-simple/newCustomerAddressFormDef";
	import {onNavigate} from "$app/navigation";
	import Plus from 'lucide-svelte/icons/plus';
	import type {CustomerAddressType} from "$lib/types/routes/prodej/zakaznici/customers";
	import type {GridOptions} from "ag-grid-enterprise";
	import NewCustomerAddressDialog from '$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerAddressDialog.svelte';
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/clientside-secondary/AgGridCSSecondaryWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from "$lib/components/ui/dialog";
	import {
		customerAddressHeaderTranslations
	} from "$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerAddressesAgGridDef.svelte";

	interface Props {
		gridOptionsCustom: GridOptions;
		rowData: CustomerAddressType[];
		open: boolean;
	}

	let {
		gridOptionsCustom,
		rowData,
		open = $bindable()
	}: Props = $props();

	let openNewAddressDialog: boolean = $state(false);


	function newCustomerAddressDialog() {
		open = false;
		openNewAddressDialog = true;
	}


	onNavigate(() => {
		openNewAddressDialog = false;
		open = false;
	})
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
		{m.routes_prodej_zakaznici_address_detail_ag_select_label()}

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
	<AgGridCSSecondaryWrapper
		rowData={rowData}
		gridOptionsCustom={gridOptionsCustom}
		fullHeight={true}
		headerTranslations={customerAddressHeaderTranslations}
	/>
{/snippet}


<NewCustomerAddressDialog
	bind:dialogOpen={openNewAddressDialog}
	formDef={newCustomerAddressFormDef}
/>

