<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/detail-pages/zakaznici/form-def/customerDetailFormDef';
	import {
		customerDetailContactsTableData,
		customerDetailContactsTableDef
	} from '$lib/data/detail-pages/zakaznici/table-def/customerDetailContactsTableDef';
	import { writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import { flipItems } from '$lib/utils/flipItems';

	export let data: { response: CustomerData };

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
	]

	const flipDurationMs = 200;
</script>



<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<div class="mb-3">
		<DetailPageLabel name="Detail zákazníka 123"/>
	</div>

	{#each items as item (item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<AutoForm autoform={customerDetailFormDef} bind:formValues/>
				</div>
			{/if}

			{#if item.type === "contacts"}
				<div class={item.isLast ? "" : "mb-4"}>
					<div class="flex gap-2" >
						<SectionLabel name="Kontakty"/>

						<button id="contacts" on:click={() => items = flipItems(items)}>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button class="">
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
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
		width: 0;
		height: 0;
	}
</style>
