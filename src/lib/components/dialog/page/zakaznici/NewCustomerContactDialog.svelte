<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import type { CustomerContactType } from '$lib/types/page/customers';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		dialogOpen: boolean;
		label: string;
		formDef: AutoFormSimpleType;
		translationRoute: string;
		createdContacts?: CustomerContactType[];
	}

	let {
		dialogOpen = $bindable(),
		label,
		formDef,
		translationRoute,
		createdContacts = $bindable()
	}: Props = $props();

		let contact: CustomerContactType = $state({
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
			// createdContacts.update((data) => [...data, contact]);

			contact = {
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
	<Dialog.Content
		interactOutsideBehavior="ignore"
	>
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
					{ label }
			</Dialog.Title>
		</Dialog.Header>

		<div class="mb-4 h-full">
<!--			<AutoFormSimple-->
<!--				addToEdited={false}-->
<!--				bind:formValues={contact}-->
<!--				translationRoute={translationRoute}-->
<!--				autoform={formDef}-->
<!--			/>-->
		</div>

		<Dialog.Footer>
			<Button
				class="w-full bg-albi-500 text-background font-bolder"
				onclick={addContact}
			>
				Uložit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
