<script lang="ts">
	import { customerAddressDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerAddressFormDef';
	import {
		customerDetailContactsTableDef
	} from '$lib/data/table-def/zakaznici/customerDetailContactsTableDef';
	import {
		customerAddressSelectTableData,
		customerAddressSelectTableDef
	} from '$lib/data/table-def/zakaznici/customerAddressSelectTableDef';
	import { _ } from 'svelte-i18n'
	import { flipItems } from '$lib/utils/flipItems';
	import { get, writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import DetailSelectTable from '$lib/components/table/DetailSelectTable.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Table from "$lib/components/ui/table";
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import { goto } from '$app/navigation';
	import { customToast } from '$lib/utils/customToast';
	import { redirect } from '@sveltejs/kit';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { getContext, setContext } from 'svelte';

	export let data: {
		response: {
			item: any;
			contacts: any;
		};
		state: {
			status: "success" | "fail";
			message: string;
		};
	};

	let hasMultipleAdresses = true;

	console.log(data);

	let addressItem = data.response.item;
	let formValues = writable(addressItem);
	let addressContacts = data.response.contacts
	let contactValues = writable(addressContacts)

	setContext("loadStatus", data.state.status);

	if (data.state.message === "not-found") {
		customToast(
			"InfoToast",
			"Vyberte prodejnu ze seznamu"
		);
	}

	if (data.state.message === "no-address") {
		customToast(
			"Warning",
			"Tahle prodejna neexistuje. Vyberte prosím jinou"
		);
	}

	formValues.subscribe((data) => {
		console.log("fv",data);
	})

	contactValues.subscribe((data) => {
		console.log(data);
	})

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
	let openDialog: boolean = false;
	let translationRoute = "routes.prodej.zakaznici.address_detail";
</script>



<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	<Accordion.Root multiple value={["item-"]} class={(hasMultipleAdresses ? "block " : "hidden ") + "flex flex-col w-full"} >
		<Accordion.Item value="item-1" class="w-full mb-3">
			<div class="w-full rounded-lg">
				<Accordion.Trigger class="hover:underline-none text-left gap-1">
					{#if getContext("loadStatus") === "success"}
						<DetailPageLabel
							label={$_(translationRoute + ".header", { values: { customerName: $formValues.customerName, customerNodeCode: $formValues.customerNodeCode} })}
						/>
					{:else}
						<DetailPageLabel
							label={$_(translationRoute + ".header_err")}
						/>
					{/if}
				</Accordion.Trigger>

				<Accordion.Content class="mt-2 mb-2 rounded-lg">
					<DetailSelectTable
						tableDef={customerAddressSelectTableDef}
						tableData={customerAddressSelectTableData}
						activeRowId={1}
					/>
				</Accordion.Content>
			</div>
		</Accordion.Item>
	</Accordion.Root>


	{#each items as item (item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<AutoForm
						formDef={customerAddressDetailFormDef}
						translationRoute={translationRoute + ".autoform."}
						allowCrossColumnDND={true}
						bind:formValues
					/>
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
							<Plus strokeWidth={2.5} class="text-albi-500 size-4"/>
						</button>
					</div>

					<DetailTable
						translationRoute="routes.prodej.zakaznici"
						tableDef={customerDetailContactsTableDef}
						bind:tableData={contactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>


<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openDialog}
	label="Nový kontakt prodejny"
	translationRoute={"routes.prodej.zakaznici.customer_and_address_contact"}
/>



<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
