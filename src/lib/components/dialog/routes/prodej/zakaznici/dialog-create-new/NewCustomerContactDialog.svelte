<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform";
	import type { CustomerContactType } from '$lib/types/routes/prodej/zakaznci/customers';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";

	interface Props {
		dialogOpen: boolean;
		label: string;
		formDef: AutoFormSimpleType;
		createdContacts: CustomerContactType[];
	}

	let {
		dialogOpen = $bindable(),
		label,
		formDef,
		createdContacts = $bindable()
	}: Props = $props();


	let contact: CustomerContactType = $state({
		createdRowId: createdContacts.length, // only for frontend, irrelevant for backend
		customerPersonCode: null,
		isDefault: false,
		enabled: false,
		name: null,
		surname: null,
		mobile: null,
		phone: null,
		email: null,
		note: null,
		pdfInvoice: false,
		pdfDeliveryNote: false,
		csvInvoice: false,
		csvDeliveryNote: false,
		consignmentReturnInfo: false,
		consignmentInfo: false,
		carrierInfo: false
	})


	function addContact() {
		createdContacts.push(contact);

		contact = {
			createdRowId: createdContacts.length,
			customerPersonCode: null,
			isDefault: false,
			enabled: false,
			name: null,
			surname: null,
			mobile: null,
			phone: null,
			email: null,
			note: null,
			pdfInvoice: false,
			pdfDeliveryNote: false,
			csvInvoice: false,
			csvDeliveryNote: false,
			consignmentReturnInfo: false,
			consignmentInfo: false,
			carrierInfo: false
		}

		dialogOpen = false;
	}
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
	<Dialog.Title class="h-6 sm:h-auto">
		{ label }
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
			onclick={addContact}
		>
			Uložit
		</Button>
	</Dialog.Footer>
{/snippet}
