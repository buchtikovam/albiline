<script lang="ts">
	import {newCustomerStepperItems} from "$lib/definitions/routes/prodej/zakaznici/stepper/newCustomerStepperItems";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {Button} from '$lib/components/ui/button';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import Stepper from "$lib/components/stepper/Stepper.svelte";
	import NewCustomerTabs
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerTabs.svelte";
	import NewCustomerAddressTabs
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerAddressTabs.svelte";

	interface Props {
		dialogOpen: boolean;
	}

	let {
		dialogOpen = $bindable(false),
	}: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let row = $derived(table.selectedRows[table.activeSelectedRowIndex]);
	let stepperItems = $state(newCustomerStepperItems);

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

	let customer = $state({
		customerNodeCode: null,
		customerAddressCode: null,
		customerName: null,
		name: null,
		companyName: null,
		street: null,
		city: null,
		postalCode: null,
		countryCode: null,
		ico: null,
		dic: null,
		icDph: null,
		paymentTypeCode: null,
		dueDays: null,
		invoiceCopies: null,
		deliveryNoteCopies: null,
		customerStoreCode: null,
		consignmentSaleEnabled: false,
		isReturnAllowed: false,
		useAssortedEanCodes: false,
		customerAlbiCode: null,
		keyCustomerTypeId: null,
		creditLimit: null,
		unpaidAmount: null,
		lastPaymentDate: null,
		email: null,
		ediInboxEanCode: null,
		ediInboxEanCodeForInvoice: null,
		customerStoreEan: null,
		sendDeliveryNoteViaEdi: false,
		sendInvoiceViaEdi: false,
		sendCreditNoteViaEdi: false,
		useDiacriticalMarksInEdiDocuments: false,
		consignmentOutputCheck: false,
		isChargedWithoutVat: false,
		claimNotificationDisabled: false,
		isBadPayer: false,
		tradeLicenseReceived: false,
		printPricesOnDeliveryNote: false,
		allwaysAllowOrdering: false,
		b2BeshopEnabled: false,
		isApproved: false,
		sendInvoiceAfterApproval: false,
		invoiceConfirmationNotRequired: false,
		isBlocked: false,
		contractReceived: false,
	})
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	size="md"
	fixedHeight={true}
	{header}
	{content}
/>

{#snippet header()}
	<Dialog.Title>
		Nový zákazník
	</Dialog.Title>

	<Dialog.Description class="pt-1">
		<Stepper bind:stepperItems />
	</Dialog.Description>
{/snippet}

{#snippet content()}
	<div class="flex flex-1 flex-col min-h-0 w-full -mt-1">
		{#if stepperItems[0].isActive}
			<NewCustomerTabs bind:formValues={customer} showContacts={true} />
		{/if}

		{#if stepperItems[1].isActive}
			<NewCustomerAddressTabs bind:formValues={customerAddress} />
		{/if}
	</div>


	<Dialog.Footer>
		<Button
			class="w-full"
		>
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}

