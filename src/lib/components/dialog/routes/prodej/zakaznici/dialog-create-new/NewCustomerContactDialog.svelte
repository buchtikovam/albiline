<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import {createCleanCustomerOrAddressContact} from "$lib/api/routes/prodej/zakaznici/customerService.svelte.js";
	import type {CustomerContactType} from '$lib/types/routes/prodej/zakaznici/customers';
	import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		dialogOpen: boolean;
		formDef: AutoFormSimpleType;
		createdContacts: CustomerContactType[];
		origin: "customer"|"address";
	}

	let {
		dialogOpen = $bindable(),
		formDef,
		createdContacts = $bindable(),
		origin,
	}: Props = $props();


	let contact: CustomerContactType = $state(createCleanCustomerOrAddressContact(createdContacts));
</script>



<DialogWrapper
	isOpen={dialogOpen}
	onChange={() => {
		setTimeout(() => {
			dialogOpen = false;
		})
	}}
	{header}
	{content}
	size="sm"
	fixedHeight={false}
/>


{#snippet header()}
	<Dialog.Title class="h-5">
		{ origin === "address"
			? m.routes_prodej_zakaznici_address_detail_new_contact_label()
			: m.routes_prodej_zakaznici_customer_detail_new_contact_label()
		}
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<AutoFormSimple
		bind:formValues={contact}
		autoform={formDef}
	/>

	<Dialog.Footer>
		<Button
			class="w-full bg-albi-500 font-bold text-background font-bolder"
			onclick={() => {
				createdContacts.push(contact);
				contact = createCleanCustomerOrAddressContact(createdContacts);
				dialogOpen = false;
			}}
		>
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}
