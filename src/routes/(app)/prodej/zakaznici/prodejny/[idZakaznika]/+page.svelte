<script lang="ts">
	import { customerAddressDetailFormDef } from '$lib/data/detail-pages/zakaznici/form-def/customerAddressFormDef';
	import {
		customerDetailContactsTableData,
		customerDetailContactsTableDef
	} from '$lib/data/detail-pages/zakaznici/table-def/customerDetailContactsTableDef';
	import {
		customerAddressSelectTableData,
		customerAddressSelectTableDef
	} from '$lib/data/detail-pages/zakaznici/table-def/customerAddressSelectTableDef';
	import { flipItems } from '$lib/utils/flipItems';
	import { writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Table from "$lib/components/ui/table";
	import DetailSelectTable from '$lib/components/table/DetailSelectTable.svelte';
	import { customerDetailFormDef } from '$lib/data/detail-pages/zakaznici/form-def/customerDetailFormDef';

	export let data: { response: CustomerData };

	let hasMultipleAdresses = true;
	let formValues = writable(data.response);

	let items = [
		{
			id: 0,
			type: "form",
			isLast: false,
		},
		{
			id: 1,
			type: "contacts",
			isLast: true,
		},
	];

	const flipDurationMs = 300;
</script>



<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	<Accordion.Root multiple value={["item-"]} class={(hasMultipleAdresses ? "block " : "hidden ") + "flex flex-col w-full"} >
		<Accordion.Item value="item-1" class="w-full mb-3">
			<div class="w-full rounded-lg">
				<Accordion.Trigger class="hover:underline-none text-left gap-1">
					<DetailPageLabel name="Prodejny zákazníka 123"/>
				</Accordion.Trigger>

				<Accordion.Content class="mt-2 rounded-lg">
					<DetailSelectTable tableDef={customerAddressSelectTableDef} tableData={customerAddressSelectTableData} activeRowId={1}/>
				</Accordion.Content>
			</div>
		</Accordion.Item>
	</Accordion.Root>

	{#each items as item (item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<AutoForm autoform={customerAddressDetailFormDef} bind:formValues/>
				</div>
			{/if}

			{#if item.type === "contacts"}
				<div class={item.isLast ? "" : "mb-4"}>
					<div class="flex justify-between">
						<div class="flex gap-2" >
							<SectionLabel name="Kontakty"/>

							<button id="contacts" on:click={() => items = flipItems(items)}>
								<ArrowUpDown class="size-4 text-albi-500"/>
							</button>
						</div>

						<button class="bg-albi-500 p-1 rounded">
							<Plus strokeWidth={2.5} class="size-4 text-white"/>
						</button>
					</div>

					<DetailTable
						tableDef={customerDetailContactsTableDef}
						tableData={customerDetailContactsTableData}
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
