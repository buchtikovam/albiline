<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform";
	import type { CustomerContactType } from '$lib/types/page/customers';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

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



<Dialog.Root
	bind:open={dialogOpen}
>
	<Dialog.Content class="h-[70%] sm:h-auto w-[90%] sm:w-auto">
		<Dialog.Header>
			<Dialog.Title class="h-5">
				{ label }
			</Dialog.Title>
		</Dialog.Header>

		<div class="h-full overflow-auto">
			<AutoFormSimple
				bind:formValues={contact}
				autoform={formDef}
			/>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full bg-albi-500 font-bold text-background font-bolder"
				onclick={addContact}
			>
				Uložit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
