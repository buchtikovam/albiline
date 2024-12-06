<script lang="ts">
		import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
		import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
		import * as Dialog from '$lib/components/ui/dialog';
		import { Button } from '$lib/components/ui/button';
		import { writable, type Writable } from 'svelte/store';
		import type { CustomerContactType } from '$lib/types/page/customers';

	interface Props {
		dialogOpen?: boolean;
		label?: string;
		formDef: AutoFormSimpleType;
		translationRoute: string;
		createdContacts?: Writable<CustomerContactType[]>;
	}

	let {
		dialogOpen = $bindable(false),
		label = "Nový kontakt",
		formDef,
		translationRoute,
		createdContacts = writable([])
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
				createdContacts.update((data) => [...data, contact]);

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
		closeOnOutsideClick={false}
>
		<Dialog.Content>
				<Dialog.Header>
						<Dialog.Title class="h-6 mb-2">
								{ label }
						</Dialog.Title>
				</Dialog.Header>

				<div class="mb-4 h-full">
						<AutoFormSimple
								addToEdited={false}
								bind:formValues={contact}
								translationRoute={translationRoute}
								autoform={formDef}
						/>
				</div>

				<Dialog.Footer>
						<Button
								class="w-full bg-albi-500 text-background font-bolder"
								on:click={addContact}
						>
								Uložit
						</Button>
				</Dialog.Footer>
		</Dialog.Content>
</Dialog.Root>
