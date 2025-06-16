<script lang="ts">
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {Button} from "$lib/components/ui/button/index.js";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import MapPinHouse from "lucide-svelte/icons/map-pin-house";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import NewCustomerDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerDialog.svelte";
	import NewCustomerAddressDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerAddressDialog.svelte";


	let isOpen = $state(false);
	let openCreateCustomer = $state(false);
	let openCreateDeliveryAddress = $state(false);
	let table = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.NEW) {
			isOpen = true;
			console.log(table.selectedRows)
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})
</script>




<DialogWrapper
	bind:isOpen={isOpen}
	{header}
	{content}
	size="sm"
	fixedHeight={false}
/>

{#snippet header()}
	<Dialog.Title>
		Co si přeješ vytvořit?
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="flex flex-col gap-4 mt-2">
		<Button
			class="w-full"
			onclick={() => {
				openCreateCustomer = true;
				isOpen = false;
			}}
		>
			<UserPlus strokeWidth={3}/>
			Nový zákazník
		</Button>

		<Button
			class="w-full"
			onclick={() => {
				openCreateDeliveryAddress = true;
				isOpen = false;
			}}
		>
			<MapPinHouse strokeWidth={3}/>
			Nová prodejna
		</Button>
	</div>
{/snippet}


<NewCustomerDialog bind:dialogOpen={openCreateCustomer} />
<NewCustomerAddressDialog bind:dialogOpen={openCreateDeliveryAddress} />
