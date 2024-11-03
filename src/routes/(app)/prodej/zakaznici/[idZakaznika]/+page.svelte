<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerDetailFormDef';
	import {
		customerDetailContactsTableData,
		customerDetailContactsTableDef
	} from '$lib/data/table-def/zakaznici/customerDetailContactsTableDef';
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
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import { _ } from 'svelte-i18n'
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';

	export let data: { response: CustomerData };

	let translationRoute = "routes.prodej.zakaznici.customer_detail";

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
	let openDialog: boolean = false;
</script>



<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<div class="mb-3">
		<DetailPageLabel
			name={`${ $_(translationRoute + '.label') } 123`}
		/>
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

						<button on:click={() => openDialog = true}>
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

<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openDialog}
	label="Nový kontakt zákazníka"
	translationRoute={translationRoute}
/>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
</style>
