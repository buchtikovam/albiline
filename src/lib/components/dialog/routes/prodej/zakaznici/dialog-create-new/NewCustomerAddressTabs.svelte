<script lang="ts">
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
	import AutoFormSimple from "$lib/components/form/AutoFormSimple.svelte";
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import {
		customerAddressDetailFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressDetailFormDef";
	import {customerAddressOZFormDef} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressOZFormDef";
	import {
		customerAddressSettingsFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressSettingsFormDef";
	import {
		customerAddressOtherFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerAddressOtherFormDef";
	import {
		customerOrCustomerAddressContactFormDef
	} from "$lib/definitions/routes/prodej/zakaznici/form/customerOrCustomerAddressContactFormDef";

	interface Props {
		formValues: Record<string, any>|undefined,
	}

	let {
		formValues = $bindable()
	}: Props = $props();
</script>



{#if formValues}
	<Tabs.Root value="adresa" class="flex h-full w-full flex-col">
		<Tabs.List class="border w-fit border-slate-300">
			<Tabs.Trigger value="adresa">Adresa</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="oblasti">OZ a oblasti</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="nastaveni">Nastavení</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="ostatni">Ostatní</Tabs.Trigger>
			<TabSeparator />

			<Tabs.Trigger value="kontakt">Kontakt</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="adresa" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerAddressDetailFormDef} />
		</Tabs.Content>

		<Tabs.Content value="oblasti" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerAddressOZFormDef} />
		</Tabs.Content>

		<Tabs.Content value="nastaveni" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerAddressSettingsFormDef} />
		</Tabs.Content>

		<Tabs.Content value="ostatni" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerAddressOtherFormDef} />
		</Tabs.Content>

		<Tabs.Content value="kontakt" class="overflow-y-auto rounded-md bg-slate-50 p-4 pt-2 border">
			<AutoFormSimple bind:formValues autoform={customerOrCustomerAddressContactFormDef} />
		</Tabs.Content>
	</Tabs.Root>
{/if}
