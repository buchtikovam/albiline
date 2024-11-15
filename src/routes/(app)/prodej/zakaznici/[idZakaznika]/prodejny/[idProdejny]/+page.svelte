<script lang="ts">
	import { customerAddressDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerAddressFormDef';
	import {
		customerDetailContactsTableDef
	} from '$lib/data/table-def/zakaznici/customerDetailContactsTableDef';
	import { _ } from 'svelte-i18n'
	import { flipItems } from '$lib/utils/flipItems';
	import { get, type Writable, writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import * as Table from "$lib/components/ui/table";
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import { customToast } from '$lib/utils/customToast';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { disableInputs } from '$lib/stores/pageStore';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { activeSelectedRowIndexStore, selectedRowStore } from '$lib/stores/tableStore';
	import { beforeNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CSAgGridDialog from '$lib/components/dialog/ag-grid/CSAgGridDialog.svelte';
	import Repeat from 'lucide-svelte/icons/repeat';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import { customerAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerAddressesAgGridDef';


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

	$: addressItem = data.response.item;
	$: formValues = writable(addressItem);

	$: addressContacts = data.response.contacts
	$: contactValues = writable(addressContacts)

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

	let openNewContactDialog: boolean = false;
	let openAgGridDialog: boolean = false;
	let translationRoute = "routes.prodej.zakaznici.address_detail";
	const selectedRows = get(selectedRowStore)

	type Row = {
		name: string,
		customerAddressCode : number,
		street : string,
		city : string,
		postalCode : string,
		countryCode : string,
		customerRank : string
	}

	$: addresses = writable()

	async function getAddresses() {
		// if (get(addresses).length > 0) {
			const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${$page.params.idZakaznika}/addresses`)

			console.log("fetch");

			if (res.ok) {
				console.log("fetch ok");
				const responseData = await res.json()
				// console.log(await responseData.items);
				addresses.set(await responseData.items)
				console.log(get(addresses));
			}
		// }
	}

	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
		customerAddressCode: Number($page.params.idProdejny)
	}

	$: disableLeft = false;
	$: disableRight = false;

	function changeActiveId(
		ids: { customerNodeCode: number, customerAddressCode: number}[],
		direction: "left" | "right",
		activeId: { customerNodeCode: number, customerAddressCode: number}
	) {
		const currentIndex = ids.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode &&
			id.customerAddressCode === activeId.customerAddressCode
		);

		disableLeft = false;
		disableRight = false;

		if (direction === "right") {
			const nextIndex = currentIndex + 1;
			activeSelectedRowIndexStore.set(nextIndex)
			goto(`/prodej/zakaznici/${ids[nextIndex].customerNodeCode}/prodejny/${ids[nextIndex].customerAddressCode}`)
			activeId = ids[nextIndex];

			if (!ids[currentIndex + 2]) {
				disableRight = true
			}
		}

		if (direction === "left") {
			const prevIndex = currentIndex - 1;
			activeSelectedRowIndexStore.set(prevIndex)
			goto(`/prodej/zakaznici/${ids[prevIndex].customerNodeCode}/prodejny/${ids[prevIndex].customerAddressCode}`)
			activeId = ids[prevIndex];

			if (!ids[currentIndex - 2]) {
				disableLeft = true
			}
		}
	}

	onMount(() => {
		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode &&
			id.customerAddressCode === activeId.customerAddressCode
		);

		if (!selectedRows[currentIndex + 1]) {
			disableRight = true
		}

		if (!selectedRows[currentIndex - 1]) {
			disableLeft = true
		}
	})

	beforeNavigate(() => {
		addresses.set([])
	})
</script>




<div class="h-full max-w-[1850px] p-3 md:p-4 overflow-auto">
	<div class="w-full flex flex-col mb-3">
		<div class="flex justify-between">
			<div class="flex gap-2">
				{#if data.state.status === "success"}
					<DetailPageLabel
						label={
							$_(translationRoute + ".header", {
								values: {
									customerName: $formValues.customerName,
									customerNodeCode: $formValues.customerNodeCode}
								}
							)
						}
					/>
				{:else}
					<DetailPageLabel
						label={$_(translationRoute + ".header_err")}
					/>
				{/if}

				<button
					class={hasMultipleAddresses ? "block" : "hidden"}
					on:click={() => {
						openAgGridDialog = true
						getAddresses()
					}}
				>
					<Repeat class="size-5 text-albi-500"/>
				</button>
			</div>

			<div class={selectedRows.length > 1 ? "flex gap-3" : "hidden"}>
				<DetailNavButton
					direction="left"
					disable={disableLeft}
					navigateDetailFn={() => changeActiveId(selectedRows, "left", activeId)}
				/>

				<DetailNavButton
					direction="right"
					disable={disableRight}
					navigateDetailFn={() => changeActiveId(selectedRows, "right", activeId)}
				/>
			</div>
		</div>
	</div>



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

						<button on:click={() => openNewContactDialog = true}>
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


<CSAgGridDialog
	colDef={customerAddressesAgGridDef}
	bind:rowData={addresses}
	bind:open={openAgGridDialog}
	translationRoute={translationRoute}
/>


<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt prodejny"
	translationRoute={"routes.prodej.zakaznici.customer_and_address_contact"}
/>


<style>
	::-webkit-scrollbar {
		width: 0px;
	}
</style>
