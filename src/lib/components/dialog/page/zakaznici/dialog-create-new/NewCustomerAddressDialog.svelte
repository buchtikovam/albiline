<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { CustomerAddressType } from '$lib/types/page/customers';
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		dialogOpen: boolean;
		label: string;
		formDef: AutoFormSimpleType;
	}

	let {
		dialogOpen = $bindable(false),
		label,
		formDef,
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
>
	<Dialog.Content class="h-auto w-[90%] sm:w-auto">
		<Dialog.Header>
			<Dialog.Title>
				{ label }
			</Dialog.Title>
		</Dialog.Header>

		<div class="h-full">
			<AutoFormSimple
				bind:formValues={address}
				autoform={formDef}
			/>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full bg-albi-500 text-background font-bolder"
				onclick={addAddress}
			>
				Uložit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
