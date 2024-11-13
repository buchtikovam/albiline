<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerDetailFormDef';
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import {
		customerDetailContactsTableDef
	} from '$lib/data/table-def/zakaznici/customerDetailContactsTableDef';
	import { _ } from 'svelte-i18n'
	import { flipItems } from '$lib/utils/flipItems';
	import { writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { customToast } from '$lib/utils/customToast';
	import { disableInputs } from '$lib/stores/pageStore';

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
	disableInputs.set(data.state.status === "fail")

	let translationRoute = "routes.prodej.zakaznici.customer_detail";

	let customerItems = data.response.item;
	let customerContacts = data.response.contacts;

	let formValues = writable(customerItems);
	let contactValues = writable(customerContacts)

	if (data.state.message === "not-found") {
		setTimeout(() => {
			customToast(
				"InfoToast",
				"Vyberte zákazníka ze seznamu"
			);
		}, 500);
	}

	console.log(customerContacts, "CustomerContacts");

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
			label={`${ $_(translationRoute + '.header', { values: { customerNodeCode: $formValues.customerNodeCode || "customerNodeCode"}})}`}
		/>
	</div>

	{#each items as item (item.id)}
		<div animate:flip="{{duration: flipDurationMs}}">
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<AutoForm
						translationRoute={translationRoute + ".autoform."}
						allowCrossColumnDND={false}
						formDef={customerDetailFormDef}
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
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
					</div>

					<DetailTable
						translationRoute="routes.prodej.zakaznici"
						tableDef={customerDetailContactsTableDef}
						tableData={contactValues}
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
	translationRoute="routes.prodej.zakaznici.customer_and_address_contact"
/>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
</style>
