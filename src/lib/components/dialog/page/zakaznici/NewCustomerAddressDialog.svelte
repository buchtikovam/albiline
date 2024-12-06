<script lang="ts">
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import type { CustomerAddressType, CustomerContactType } from '$lib/types/page/customers';

	interface Props {
		dialogOpen?: boolean;
		label?: string;
		formDef: AutoFormSimpleType;
		translationRoute: string;
	}

	let {
		dialogOpen = $bindable(false),
		label = "Nový kontakt",
		formDef,
		translationRoute
	}: Props = $props();

	let address: CustomerAddressType = $state({
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
	})

	function addAddress() {
		console.log(address);
	}

</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				{ label }
			</Dialog.Title>
		</Dialog.Header>

		<div class="mb-4 h-full">
			<AutoFormSimple
				addToEdited={false}
				bind:formValues={address}
				translationRoute={translationRoute}
				autoform={formDef}
			/>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full bg-albi-500 text-background font-bolder"
				on:click={addAddress}
			>
				Uložit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
