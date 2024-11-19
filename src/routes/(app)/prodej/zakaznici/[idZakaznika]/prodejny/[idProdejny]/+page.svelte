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
	import { activeSelectedRowIndexStore, editedDataStore, selectedRowsStore } from '$lib/stores/tableStore';
	import { beforeNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CSAgGridDialog from '$lib/components/dialog/ag-grid/CSAgGridDialog.svelte';
	import Repeat from 'lucide-svelte/icons/repeat';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import { customerAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerAddressesAgGridDef';
	import { changeCustomerAddressRoute } from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute';
	import { customerAddressPageLayout } from '$lib/data/detail-page-swappable-layout/customerAddressPageLayout';
	import { addToEditedData } from '$lib/utils/addToEditedData';

	export let data;

	// if no data, disable inputs to avoid unwanted user interactions
	disableInputs.set(data.state.status === "fail");

	$: addressItem = data.response.item;
	$: formValues = writable(addressItem);

	$: addressContacts = data.response.contacts
	$: contactValues = writable(addressContacts)

	let pageLayout = customerAddressPageLayout;
	let openNewContactDialog: boolean = false;
	let openAgGridDialog: boolean = false;
	let translationRoute = "routes.prodej.zakaznici.address_detail";
	let selectedRows = get(selectedRowsStore)

	selectedRowsStore.subscribe((data) => {
		selectedRows = data;
		console.log("selRows", data);
	});


	// route parameters swapping logic
	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
		customerAddressCode: Number($page.params.idProdejny)
	}

	$: disableLeft = false;
	$: disableRight = false;

	function changeRouteParameterAndDisable(direction: "left" | "right") {
		let returnedDisable = changeCustomerAddressRoute(
			selectedRows,
			direction,
			activeId,
			$page.route.id || "/"
		);

		disableLeft = returnedDisable.left;
		disableRight = returnedDisable.right;
	}

	activeSelectedRowIndexStore.subscribe((data) => {
		console.log("activeIndex", data);

		disableRight = false;
		disableLeft = false;

		if (!selectedRows[data + 1]) {
			disableRight = true
		}

		if (!selectedRows[data - 1]) {
			disableLeft = true
		}
	})

	onMount(() => { // disable navigation buttons if user is located on the first/last address
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


	// fetching for customer addresses ag-grid dialog
	let addresses = writable([])

	async function getAddresses() {
		if (get(addresses).length === 0) {
			const res = await fetch(`http://10.2.2.10/albiline.test/api/v1/customers/${$page.params.idZakaznika}/addresses`)

			if (res.ok) {
				const responseData = await res.json()
				addresses.set(await responseData.items)
			}
		}
	}

	beforeNavigate(() => {
		addresses.set([]);
		openAgGridDialog = false;
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
					on:click={() => {
						openAgGridDialog = true
						getAddresses()
					}}
				>
					<Repeat class="size-5 text-albi-500"/>
				</button>
			</div>

			<div
				class={selectedRows.length > 1 ? "flex gap-3" : "hidden"}
			>
				<DetailNavButton
					direction="left"
					bind:disable={disableLeft}
					navigateDetailFn={() => changeRouteParameterAndDisable("left")}
				/>

				<DetailNavButton
					direction="right"
					bind:disable={disableRight}
					navigateDetailFn={() => changeRouteParameterAndDisable("right")}
				/>
			</div>
		</div>
	</div>



	{#each pageLayout as item (item.id)}
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

						<button id="contacts" on:click={() => pageLayout = flipItems(pageLayout)}>
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
