<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import {createCleanCustomerAddress} from "$lib/api/routes/prodej/zakaznici/customerService.svelte.js";
	import type {CustomerAddressType} from '$lib/types/routes/prodej/zakaznici/customers';
	import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
	import {
		newCustomerAddressFormDef, newCustomerAddressOzFormDef, newCustomerAddressSettingsFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/autoform-simple/newCustomerAddressFormDef";


	interface Props {
		dialogOpen: boolean;
	}

	let {
		dialogOpen = $bindable(false),
	}: Props = $props();


	let customerAddress: CustomerAddressType = $state( {
		id: null,
		customerNodeCode: null,
		customerName: null,
		name: null,
		customerAddressCode: null,
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
		Nová doručovací adresa
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="flex flex-1 flex-col min-h-0 w-full">
		<Tabs.Root value="adresa" class="flex h-full w-full flex-col ">
			<Tabs.List class="border w-fit border-slate-300">
				<Tabs.Trigger value="adresa">
					Adresa
				</Tabs.Trigger>
				<TabSeparator/>

				<Tabs.Trigger value="nastaveni">
					Nastavení
				</Tabs.Trigger>
				<TabSeparator/>

				<Tabs.Trigger value="oblasti">
					OZ a oblasti
				</Tabs.Trigger>
				<TabSeparator/>

				<Tabs.Trigger value="ostatni">
					Ostatní
				</Tabs.Trigger>
			</Tabs.List>

			<Tabs.Content
				value="adresa"
				class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border"
			>
				<AutoFormSimple
					bind:formValues={customerAddress}
					autoform={newCustomerAddressFormDef}
				/>
			</Tabs.Content>

			<Tabs.Content
				value="nastaveni"
				class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border"
			>
				<AutoFormSimple
					bind:formValues={customerAddress}
					autoform={newCustomerAddressSettingsFormDef}
				/>
			</Tabs.Content>

			<Tabs.Content
				value="oblasti"
				class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border"
			>
				<AutoFormSimple
					bind:formValues={customerAddress}
					autoform={newCustomerAddressOzFormDef}
				/>
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<Dialog.Footer>
		<Button
			class="w-full bg-albi-500 text-background font-bolder"
		>
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}
