<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
	import {
		newCustomerAddressFormDef,
		newCustomerAddressOstatniFormDef,
		newCustomerAddressOzFormDef,
		newCustomerAddressSettingsFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/autoform-simple/newCustomerAddressFormDef";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";


	interface Props {
		dialogOpen: boolean;
	}

	let {
		dialogOpen = $bindable(false),
	}: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let row = $derived(table.selectedRows[table.activeSelectedRowIndex])

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
			}
		}
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
		Nová doručovací adresa
	</Dialog.Title>

	{#if row}
		<Dialog.Description>
			pro zákazníka <b>{row.i_Name} ({row.customerNodeCode})</b>
		</Dialog.Description>
	{/if}
{/snippet}


{#snippet content()}
	<div class="flex flex-1 flex-col min-h-0 w-full -mt-1">
		<Tabs.Root
			value="adresa"
			class="flex h-full w-full flex-col"
		>
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

			<Tabs.Content
				value="ostatni"
				class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border"
			>
				<AutoFormSimple
					bind:formValues={customerAddress}
					autoform={newCustomerAddressOstatniFormDef}
				/>
			</Tabs.Content>
		</Tabs.Root>
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
