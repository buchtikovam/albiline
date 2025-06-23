<script lang="ts">
	import {
		newCustomerAddressStepperItems
	} from '$lib/definitions/routes/prodej/zakaznici/stepper/newCustomerAddressStepperItems';
	import { agGridTables, pageKeys } from '$lib/runes/table.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { AgGridTableType } from '$lib/types/components/table/table';
	import DialogWrapper from '$lib/components/dialog/DialogWrapper.svelte';
	import Stepper from '$lib/components/stepper/Stepper.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import {apiGetCustomer} from '$lib/api/routes/prodej/zakaznici/customerService.svelte';
	import type { CustomerType } from '$lib/types/routes/prodej/zakaznici/customers';
	import NewCustomerTabs
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerTabs.svelte";
	import NewCustomerAddressTabs
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerAddressTabs.svelte";

	interface Props {
		dialogOpen: boolean;
	}

	let { dialogOpen = $bindable(false) }: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let row = $derived(table.selectedRows[table.activeSelectedRowIndex]);
	let stepperItems = $state(newCustomerAddressStepperItems);

	let customer: CustomerType | undefined = $state();
	let customerAddress = $state({
		name: null,
		companyName: null,
		street: null,
		city: null,
		postalCode: null,
		countryCode: null,
		note: null,
		paymentTypeCode: null,
		dueDays: null,
		invoiceCopies: null,
		deliveryNoteCopies: null,
		customerRank: null,
		retailStoreTypeId: null,
		customerStoreCode: null,
		customerStoreEan: null,
		packingNote: null,
		consignmentSaleEnabled: false,
		isReturnAllowed: false,
		isForConsignmentReturn: false,
		useAssortedEanCodes: false,
		pickingBoxPacking: false,
		splitOrderByFood: false,
		dealerCode: null,
		areaCode: null,
		areaId: null
	});


	// Effect to reset the form state whenever the dialog opens
	$effect(() => {
		if (dialogOpen) {
			customerAddress = {
				name: null,
				companyName: null,
				street: null,
				city: null,
				postalCode: null,
				countryCode: null,
				note: null,
				paymentTypeCode: null,
				dueDays: null,
				invoiceCopies: null,
				deliveryNoteCopies: null,
				customerRank: null,
				retailStoreTypeId: null,
				customerStoreCode: null,
				customerStoreEan: null,
				packingNote: null,
				consignmentSaleEnabled: false,
				isReturnAllowed: false,
				isForConsignmentReturn: false,
				useAssortedEanCodes: false,
				pickingBoxPacking: false,
				splitOrderByFood: false,
				dealerCode: null,
				areaCode: null,
				areaId: null
			};
			customer = undefined; // Clear previous customer data
		}
	});


	// Effect to fetch customer data when the dialog is open and a row is selected
	$effect(() => {
		if (!dialogOpen || !row?.customerNodeCode) {
			return;
		}

		(async () => {
			try {
				const fetchedCustomer = await apiGetCustomer(row.customerNodeCode);
				customer = fetchedCustomer.item;
			} catch (error) {
				console.error('Failed to fetch customer:', error);
				customer = undefined;
			}
		})();
	});
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	size="md"
	fixedHeight={true}
	{header}
	{content}
/>



{#snippet header()}
	<Dialog.Title>Nová doručovací adresa</Dialog.Title>

	{#if row}
		<Dialog.Description class="pt-1">
			<Stepper bind:stepperItems />
		</Dialog.Description>
	{/if}
{/snippet}



{#snippet content()}
	<div class="flex flex-1 flex-col min-h-0 w-full -mt-1">
		{#if stepperItems[0].isActive}
			<NewCustomerTabs bind:formValues={customer} />
		{/if}

		{#if stepperItems[1].isActive}
			<NewCustomerAddressTabs bind:formValues={customerAddress} />
		{/if}
	</div>

	<Dialog.Footer>
		<Button
			class="w-full bg-albi-500 text-background font-bolder"
			onclick={() => console.log(JSON.stringify(customerAddress, null, 1))}
		>
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}
