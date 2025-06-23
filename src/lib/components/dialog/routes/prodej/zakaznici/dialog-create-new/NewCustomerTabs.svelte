<script lang="ts">
	import {
		customerInvoiceAddressFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerInvoiceAddressFormDef";
	import {
		customerInvoiceSettingsFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerInvoiceSettingsFormDef";
	import {
		customerFurtherInformationFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerFurtherInformationFormDef";
	import {customerEdiFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerEdiFormDef";
	import {customerSettingsFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerSettingsFormDef";
	import {
		customerOrCustomerAddressContactFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerOrCustomerAddressContactFormDef";
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
	import AutoFormSimple from "$lib/components/form/AutoFormSimple.svelte";
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	interface Props {
	    formValues: Record<string, any>|undefined,
		showContacts?: boolean,
	}

	let {
	    formValues = $bindable(),
		showContacts,
	}: Props = $props();
</script>



{#if formValues}
	<Tabs.Root value="fakturacni-adresa" class="flex h-full w-full flex-col">
		<Tabs.List class="border w-fit border-slate-300">
			<Tabs.Trigger value="fakturacni-adresa">Fakturační adresa</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="nastaveni-fakturace">Nastavení fakturace</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="dalsi-udaje">Další údaje</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="edi">EDI</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="nastaveni">Nastavení</Tabs.Trigger>

			{#if showContacts}
				<TabSeparator />
				<Tabs.Trigger value="kontakt">Kontakty</Tabs.Trigger>
			{/if}
		</Tabs.List>

		<Tabs.Content value="fakturacni-adresa" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues  autoform={customerInvoiceAddressFormDef} />
		</Tabs.Content>

		<Tabs.Content value="nastaveni-fakturace" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerInvoiceSettingsFormDef} />
		</Tabs.Content>

		<Tabs.Content value="dalsi-udaje" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerFurtherInformationFormDef} />
		</Tabs.Content>

		<Tabs.Content value="edi" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerEdiFormDef} />
		</Tabs.Content>

		<Tabs.Content value="nastaveni" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerSettingsFormDef} />
		</Tabs.Content>

		<Tabs.Content value="kontakt" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerOrCustomerAddressContactFormDef} />
		</Tabs.Content>
	</Tabs.Root>
{:else}
	<!-- Optional: Show a loading state while customer data is being fetched -->
	<div class="flex items-center justify-center h-full">
		<p>Načítání dat zákazníka...</p>
	</div>
{/if}
