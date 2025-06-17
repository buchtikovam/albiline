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
	import ArrowLeft from "lucide-svelte/icons/arrow-left";
	import ArrowRight from "lucide-svelte/icons/arrow-right";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";


	let isOpen = $state(false);
	let table = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let activeRow = $derived(table.selectedRows[table.activeSelectedRowIndex])

	let disableLeft = $state(false);
	let disableRight = $state(false);

	let openCreateCustomer = $state(false);
	let openCreateDeliveryAddress = $state(false);


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.NEW) {
			isOpen = true;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})


	$effect(() => {
		if (table) {
			table.activeSelectedRowIndex === 0
				? disableLeft = true
				: disableLeft = false;

			table.activeSelectedRowIndex >= table.selectedRows.length - 1
				? disableRight = true
				: disableRight = false;
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
	<div class="flex flex-col gap-4 ">
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

		<div class={`${activeRow ? "p-2 border border-slate-300 rounded-md bg-slate-50 md:w-[320px]" : ""}`}>
			<Tooltip.Root>
				<Tooltip.Trigger class="w-full">
					<Button
						class="w-full"
						disabled={table.selectedRows.length === 0}
						onclick={() => {
							openCreateDeliveryAddress = true;
							isOpen = false;
						}}
					>
						<MapPinHouse strokeWidth={3}/>
						Nová doručovací adresa
					</Button>
				</Tooltip.Trigger>

				{#if table.selectedRows.length === 0}
					<Tooltip.Content class="border-red-600 bg-red-50 text-red-950 ">
						<p>Nejdříve vyber řádek v tabulce</p>
					</Tooltip.Content>
				{/if}
			</Tooltip.Root>

			{#if activeRow}
				<div class="mt-2 flex flex-col">
					<div class="flex justify-between items-center">
						<p class="text-sm">pro zákazníka: </p>


						{#if table.selectedRows.length > 1}
							<div>
								<button
									class={(disableLeft ? "text-slate-300 " : "text-albi-500") + " size-5"}
									onclick={() => table.activeSelectedRowIndex--}
									disabled={disableLeft}

								>
									<ArrowLeft class="size-4"/>
								</button>

								<button
									class={(disableRight ? "text-slate-300 " : "text-albi-500") + " size-5"}
									onclick={() => table.activeSelectedRowIndex++}
									disabled={disableRight}
								>
									<ArrowRight class="size-4"/>
								</button>
							</div>
						{/if}
					</div>

					<p class="text-sm font-bold">
						{activeRow.i_Name} ({activeRow.customerNodeCode})
					</p>
				</div>
			{/if}

		</div>
	</div>
{/snippet}


<NewCustomerDialog bind:dialogOpen={openCreateCustomer} />
<NewCustomerAddressDialog bind:dialogOpen={openCreateDeliveryAddress} />

