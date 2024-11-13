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
	import { get, type Writable, writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import DetailSelectTable from '$lib/components/table/DetailSelectTable.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Table from "$lib/components/ui/table";
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import { customToast } from '$lib/utils/customToast';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { disableInputs } from '$lib/stores/pageStore';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { selectedRowStore } from '$lib/stores/tableStore';
	import { goto } from '$app/navigation';
	// import { useLoader } from '$app/navigation';


	// const loader = useLoader();

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

	let hasMultipleAddresses = true;

	let addressItem = data.response.item;
	let formValues = writable(addressItem);

	let addressContacts = data.response.contacts
	let contactValues = writable(addressContacts)

	if (data.state.message === "not-found") {

		setTimeout(() => {
			customToast(
				"InfoToast",
				"Vyberte prodejnu ze seznamu"
			);
		}, 500);
	}
	if (data.state.message === "no-address") {

		setTimeout(() => {
			customToast(
				"Warning",
				"Zákazník nemá žádnou prodejnu"
			);
		}, 500);
	}
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

	let openDialog: boolean = false;

	let translationRoute = "routes.prodej.zakaznici.address_detail";

	const selectedRows = get(selectedRowStore)

	let activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
		customerAddressCode: Number($page.params.idProdejny)
	}

	let disableLeft = false;
	let disableRight = false;

	type Row = {
		name: string,
		customerAddressCode : number,
		street : string,
		city : string,
		postalCode : string,
		countryCode : string,
		customerRank : string
	}


	let addresses: Writable<Row[]> = writable()

	async function getAddresses() {
		// if (!get(addresses)) {
			const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${$page.params.idZakaznika}/addresses`)

			if (res.ok) {
				const responseData = await res.json()

				console.log(responseData.items);

				addresses.set(await responseData.items)
				console.log(get(addresses))
			}
		// }
	}

	// function changeActiveId(ids: { customerNodeCode: number, customerAddressCode: number}[], direction: "left" | "right", activeId: { customerNodeCode: number, customerAddressCode: number}) {
	// 	console.log("activeIdOld", activeId);
	//
	// 	const currentIndex = ids.findIndex((id) =>
	// 		id.customerNodeCode === activeId.customerNodeCode &&
	// 		id.customerAddressCode === activeId.customerAddressCode
	// 	);
	//
	// 	console.log("currentIndex", currentIndex);
	//
	// 	if (direction === "right") {
	// 		console.log("right");
	// 		const nextIndex = currentIndex + 1;
	// 		console.log("activeIdNew", ids[nextIndex]);
	// 		loader.load(`/prodej/zakaznici/${ids[nextIndex].customerNodeCode}/prodejny/${ids[nextIndex].customerAddressCode}`)
	// 		return ids[nextIndex] || ids[0];
	// 	}
	//
	// 	if (direction === "left") {
	// 		console.log("left");
	// 		const prevIndex = currentIndex - 1;
	// 		console.log("activeIdNew", ids[prevIndex]);
	// 		goto(`/prodej/zakaznici/${ids[prevIndex].customerNodeCode}/prodejny/${ids[prevIndex].customerAddressCode}`)
	//
	// 		return ids[prevIndex] || ids[ids.length - 1];
	// 	}
	// }
</script>



<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	{#if hasMultipleAddresses}
		<Accordion.Root multiple value={["item-"]} class="flex flex-col w-full">
			<Accordion.Item value="item-1" class="w-full flex flex-col mb-3">
				<div class="flex justify-between">
					<Accordion.Trigger
						class="hover:underline-none text-left gap-1"
						on:click={() => getAddresses()}
					>
						{#if data.state.status === "success"}
							<DetailPageLabel
								label={$_(translationRoute + ".header", { values: { customerName: $formValues.customerName, customerNodeCode: $formValues.customerNodeCode} })}
							/>
						{:else}
							<DetailPageLabel
								label={$_(translationRoute + ".header_err")}
							/>
						{/if}
					</Accordion.Trigger>

					<div class={selectedRows.length > 1 ? "flex gap-3" : "hidden"}>
						<button
							class={disableLeft ? "size-5 text-slate-300" : "size-5 text-albi-500" }
							disabled={disableLeft}
						>
							<ArrowLeft class="size-5"/>
						</button>

						<button
							class={disableRight ? "size-5 text-slate-300" : "size-5 text-albi-500" }
							disabled={disableRight}
						>
							<ArrowRight class="size-5 text-albi-500"/>
						</button>
					</div>
				</div>


				<Accordion.Content class="mt-2 mb-2 rounded-lg">
					<DetailSelectTable
						tableDef={customerAddressSelectTableDef}
						tableData={addresses}
						translationRoute={translationRoute}
					/>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	{:else}
		<div class="w-full mb-3">
			{#if data.state.status === "success"}
				<DetailPageLabel
					label={$_(translationRoute + ".header", { values: { customerName: $formValues.customerName, customerNodeCode: $formValues.customerNodeCode} })}
				/>
			{:else}
				<DetailPageLabel
					label={$_(translationRoute + ".header_err")}
				/>
			{/if}
		</div>

	{/if}


	{#each items as item (item.id)}
		<div animate:flip="{{duration: 300}}">
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
