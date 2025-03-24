<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import {createCleanCustomerAddress} from "$lib/api/routes/customerService.svelte.js";
	import type {CustomerAddressType} from '$lib/types/routes/prodej/zakaznci/customers';
	import type {AutoFormSimpleType} from "$lib/types/components/form/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		dialogOpen: boolean;
		formDef: AutoFormSimpleType;
	}

	let {
		dialogOpen = $bindable(false),
		formDef,
	}: Props = $props();


	let address: CustomerAddressType = $state(createCleanCustomerAddress())


	function addAddress() {
		console.log(address);
	}
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	size="sm"
	fixedHeight={false}
	{header}
	{content}
/>

{#snippet header()}
	<Dialog.Title>
		{m.routes_prodej_zakaznici_address_detail_new_address_label()}
	</Dialog.Title>
{/snippet}

{#snippet content()}
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
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}

