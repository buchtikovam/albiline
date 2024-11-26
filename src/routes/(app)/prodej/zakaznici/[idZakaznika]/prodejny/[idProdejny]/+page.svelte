<script lang="ts">
	import { customerAddressDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerAddressFormDef';
	import { _ } from 'svelte-i18n'
	import { flipItems } from '$lib/utils/flipItems';
	import { get, writable } from 'svelte/store';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import NewCustomerContactDialog
		from '$lib/components/dialog/global/detail-dialogs/zakaznici/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import * as Table from "$lib/components/ui/table";
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import { customToast } from '$lib/utils/customToast';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { disableInputs, disableNavigationStore } from '$lib/stores/pageStore';
	import ArrowLeft from 'lucide-svelte/icons/arrow-left';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/stores/tableStore';
	import { beforeNavigate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import CSAgGridDialog from '$lib/components/dialog/ag-grid/CSAgGridDialog.svelte';
	import Repeat from 'lucide-svelte/icons/repeat';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import { customerAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerAddressesAgGridDef';
	import { changeCustomerAddressRoute } from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute';
	import { customerAddressPageLayout } from '$lib/data/detail-page-swappable-layout/customerAddressPageLayout';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import { editedFormValuesStore } from '$lib/stores/autoformStore';
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import { apiServiceGET } from '$lib/api/apiService.js';


	export let data;

	let formValues = writable({}); // autoform
	$: formValues.set(data.response.item);

	let contactValues = writable([]) // contacts table
	$: contactValues.set(data.response.contacts);
	let editedContactValues = []


	const translationRoute = "routes.prodej.zakaznici.address_detail";
	let pageLayout = customerAddressPageLayout;
	let openNewContactDialog: boolean = false;
	let openAgGridDialog: boolean = false;


	let selectedRows = get(selectedRowsStore)
	selectedRowsStore.subscribe((data) => {
		selectedRows = data;
	});


	// --- PAGE NAVIGATION BETWEEN SELECTED CUSTOMERS ----
	// route parameters swapping logic
	$: disableLeft = false;
	$: disableRight = false;

	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
		customerAddressCode: Number($page.params.idProdejny)
	}

	// called when user swappes to the next/previous address
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

		if (!selectedRows[currentIndex + 1]) disableRight = true;
		if (!selectedRows[currentIndex - 1]) disableLeft = true;
	})


	// fetching for customer addresses ag-grid dialog
	let addresses = writable([])

	async function getAddresses() {
		if (get(addresses).length === 0) {
			const res = await apiServiceGET(`customers/${$page.params.idZakaznika}/addresses`)

			if (res.ok) {
				const responseData = await res.json()
				addresses.set(await responseData.items)
			} else {
				customToast("Critical", "Nepodařilo se získat prodejny")
			}
		}
	}


	// disable editing if there are unsaved changes
	editedFormValuesStore.subscribe((data) => {
		disableNavigationStore.set(false);

		if (Object.keys(data).length > 0) {
			disableNavigationStore.set(true);
		}
	})


	beforeNavigate(() => {
		addresses.set([]);
		editedContactValues = [];
		openAgGridDialog = false;
	})


	onMount(() => {
		// disable navigation buttons if user is located on the first/last address
		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode &&
			id.customerAddressCode === activeId.customerAddressCode
		);

		if (!selectedRows[currentIndex + 1]) disableRight = true;
		if (!selectedRows[currentIndex - 1]) disableLeft = true;
	})
</script>




<MaxWidthScrollableDetailContainer>
	<div class="w-full h-fdull flex flex-col mb-3">
		<!-- header -->
		<div class="flex justify-between">
			<!-- page label + get addresses button -->
			<div class="flex gap-1.5">
				{#if data.state.status === "success"}
					<DetailPageLabel
						label={$_(translationRoute + ".header", {
							values: {
								customerName: $formValues.customerName,
								customerNodeCode: $formValues.customerNodeCode}
							})
						}
					/>
				{:else}
					<DetailPageLabel
						label={$_(translationRoute + ".header_err")}
					/>
				{/if}

				<button
					class="w-6"
					on:click={() => {
						openAgGridDialog = true;
						getAddresses();
					}}
				>
					<Repeat class="size-5 text-albi-500 "/>
				</button>
			</div>

			<!-- page navigation buttons -->
			<div class={selectedRows.length > 1 ? "flex gap-3" : "hidden"}>
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


	<!-- page content -->
	{#each pageLayout as item (item.id)}
		<div animate:flip="{{duration: 300}}" class="">
			<!-- address detail form -->
			{#if item.type === "form"}
				<div class={(item.isLast ? "-mb-2" : "")}>
					<AutoForm
						formDef={customerAddressDetailFormDef}
						translationRoute={translationRoute + ".autoform."}
						allowCrossColumnDND={true}
						bind:formValues
					/>
				</div>
			{/if}

			<!-- address contacts table: display all, add new, move table up/down -->
			{#if item.type === "contacts"}
				<div class={(item.isLast ? "" : "mb-4")}>
					<div class="flex gap-2">
						<SectionLabel label="Kontakty"/>

						<button
							id="contacts"
							on:click={() => pageLayout = flipItems(pageLayout)}
						>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button on:click={() => openNewContactDialog = true}>
							<Plus strokeWidth={2.5} class="text-albi-500 size-4"/>
						</button>

<!--						<button on:click={save}>-&#45;&#45;</button>-->
					</div>

					<AgGridCSWrapper
						colDef={customerAndAddressContactsAgGridDef}
						bind:rowData={contactValues}
						bind:editedRowData={editedContactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</MaxWidthScrollableDetailContainer>


<!-- display all customer addresses, select new active -->
<CSAgGridDialog
	colDef={customerAddressesAgGridDef}
	bind:rowData={addresses}
	bind:open={openAgGridDialog}
	translationRoute={translationRoute}
/>


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt prodejny"
	translationRoute={"routes.prodej.zakaznici.customer_and_address_contact"}
/>
