<script lang="ts">
	import { run } from 'svelte/legacy';

	import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/runes-global/table.svelte';
	import { customerAddressDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerAddressFormDef';
	import { customerAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerAddressesAgGridDef';
	import { customerAddressPageLayout } from '$lib/data/detail-page-swappable-layout/customerAddressPageLayout';
	import { disableNavigationStore } from '$lib/runes-global/page.svelte';
	import { editedFormValuesStore } from '$lib/runes-global/autoformStore';
	import { newCustomerContactFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerContactFormDef';
	import { ribbonActionStore } from '$lib/runes-global/ribbonStore';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n'
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import { apiServiceGET, apiServicePOST } from '$lib/api/apiService.js';
	import { changeCustomerAddressRoute } from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute';
	import { invalidateAll, onNavigate } from '$app/navigation';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { getPageMetaData } from '$lib/utils/getPageMetaData';
	import { customToast } from '$lib/utils/customToast';
	import { flipItems } from '$lib/utils/flipItems';
	import { onMount } from 'svelte';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Plus from 'lucide-svelte/icons/plus';
	import type { CustomerAddressType, CustomerContactType } from '$lib/types/page/customers';
	import type { PageMetaDataType } from '$lib/types/page/pageSettings';
	import { get, type Writable, writable } from 'svelte/store';
	import NewCustomerContactDialog
		from '$lib/components/dialog/page/zakaznici/NewCustomerContactDialog.svelte';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import CSAgGridDialog from '$lib/components/dialog/page/zakaznici/CustomerAddressesDialog.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { processRoute } from '$lib/utils/navigation/processRoute';
	import type { GridOptions } from 'ag-grid-enterprise';

	interface Props {
		data: {
		response: {
			item: CustomerAddressType,
			contacts: CustomerContactType[]
		},
		status: "success" | "fail",
	};
	}

	let { data }: Props = $props();

	// @ts-ignore // autoform
	let formValues: Writable<CustomerAddressType> = $state(writable({}));
	run(() => {
		formValues.set(data.response.item);
	});

	// contacts table
	let contactValues: Writable<CustomerContactType[]> = $state(writable([])) ;
	run(() => {
		contactValues.set(data.response.contacts);
	});

	let editedContactValues: Writable<any[]> = $state(writable([]));
	let createdContacts: Writable<CustomerContactType[]> = $state(writable([]));

	// page variables
	const translationRoute = "routes.prodej.zakaznici.address_detail";
	let pageLayout = $state(customerAddressPageLayout);
	let autoformDef = $state(writable(customerAddressDetailFormDef));
	let openNewContactDialog: boolean = $state(false);
	let openAgGridDialog: boolean = $state(false);
	let pageSettings: PageMetaDataType;


	// get all selected rows from table
	let selectedRows = $state(get(selectedRowsStore))
	selectedRowsStore.subscribe((data) => {
		selectedRows = data;
	});


	// --- PAGE NAVIGATION BETWEEN SELECTED ADRRESSES ----
	// route parameters swapping logic
	let disableLeft = $state(false);
	
	let disableRight = $state(false);
	

	let activeId = $derived({
		customerNodeCode: Number($page.params.customerNodeCode),
		customerAddressCode: Number($page.params.customerAddressCode)
	})

	// disable navigation if there are unsaved changes in form
	editedFormValuesStore.subscribe((data) => {
		if (Object.keys(data).length > 0) {
			disableNavigationStore.set(true);
			disableLeft = true;
			disableRight = true;
		} else {
			disableNavigationStore.set(false);
			if (selectedRows[get(activeSelectedRowIndexStore) + 1]) disableRight = false;
			if (selectedRows[get(activeSelectedRowIndexStore) - 1]) disableLeft = false;
		}
	})

	// disable navigation if new contact was created
	createdContacts.subscribe((data) => {
		if (data.length > 0) {
			disableNavigationStore.set(true);
			disableLeft = true;
			disableRight = true;
		}
	})


	// called when user swappes to the next/previous address
	function changeRouteParameterAndDisable(direction: "left" | "right") {
		const returnedDisable = changeCustomerAddressRoute(
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


	// fetching for customer addresses ag-grid dialog
	let addresses = $state(writable([]))

	async function getAddresses() {
		if (get(addresses).length === 0) {
			const res = await apiServiceGET(`customers/${$page.params.customerNodeCode}/addresses`)

			if (res.ok) {
				const responseData = await res.json()
				addresses.set(await responseData.items)
			} else {
				customToast("Critical", "Nepodařilo se získat prodejny")
			}
		}
	}

	// save data on the api
	async function updateAndReload(saveObj) {
		const res = await apiServicePOST(
			`customers/${$page.params.customerNodeCode}/addresses/${$page.params.customerAddressCode}`,
			saveObj
		)

		if (res.ok) {
			editedFormValuesStore.set({});
			editedContactValues.set([]);
			createdContacts.set([]);
			disableNavigationStore.set(false);
			disableLeft = false;
			disableRight = false;
			await invalidateAll();
		}
	}


	onMount(async () => {
		// disable navigation buttons if user is located on the first/last address
		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode &&
			id.customerAddressCode === activeId.customerAddressCode
		);

		if (!selectedRows[currentIndex + 1]) disableRight = true;
		if (!selectedRows[currentIndex - 1]) disableLeft = true;

		if (!pageSettings) pageSettings = await getPageMetaData();
	})


	onNavigate(() => {
		addresses.set([]);
		openAgGridDialog = false;
	})


	ribbonActionStore.subscribe((action) => {
		if (action === RibbonActionEnum.SAVE) {
			const saveObj = {
				item: get(editedFormValuesStore),

				contacts: {
					insert: get(createdContacts),
					update: get(editedContactValues),
					delete: []
				},
			}

			if (Object.keys(saveObj.item).length > 0) {
				saveObj.item.customerAddressCode = Number($page.params.customerAddressCode)
				saveObj.item.customerNodeCode = Number($page.params.customerNodeCode)
			}

			updateAndReload(saveObj);
			console.log(JSON.stringify(saveObj, null, 1));
		}

		ribbonActionStore.set(undefined);
	})


	const contactsGridOptions: GridOptions = {
		columnDefs: customerAndAddressContactsAgGridDef,
	}


	// function savePageLayout() {
	// 	const pageStripped = pageLayout.map((item) => {
	// 		return item.type;
	// 	})
	//
	// 	const formDefStripped = []
	//
	// 	Object.entries(get(autoformDef)).map(([key, value]) => {
	// 		let temp = {};
	//
	// 		temp[key] = value.map((item) => {
	// 			return {
	// 				field: item.field,
	// 				isOpen: item.isOpen,
	// 			}
	// 		});
	// 		formDefStripped.push(temp)
	// 	})
	//
	//
	// 	const pageLayoutObj = {
	// 		pageLayout: pageStripped,
	// 		formDef: formDefStripped,
	// 	}
	//
	// 	console.log(JSON.stringify(pageLayoutObj, null, 1));
	// }
</script>



<svelte:head>
	<title>Prodejna {$formValues.customerAddressCode || ""} | Albiline</title>
</svelte:head>



<MaxWidthScrollableDetailContainer>
	<div class="flex flex-col mb-3">
		<!-- header -->
		<div class="flex justify-between">
			<!-- page label + get addresses button -->
			<div class="flex gap-1.5">
				{#if data.status === "success"}
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
					class={($disableNavigationStore ? "text-slate-300 " : "text-albi-500") + " w-6"}
					disabled={$disableNavigationStore}
					onclick={() => {
						openAgGridDialog = true;
						getAddresses();
					}}
				>
					<Repeat class="size-5"/>
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
						bind:formDef={autoformDef}
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
							onclick={() => pageLayout = flipItems(pageLayout)}
						>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button
							onclick={() => openNewContactDialog = true}
						>
							<Plus strokeWidth={2.5} class="text-albi-500 size-4"/>
						</button>
					</div>

					<!-- contacts table -->
					<AgGridCSWrapper
						requiredFields={["customerPersonCode"]}
						gridOptionsCustom={contactsGridOptions}
						bind:rowData={contactValues}
						bind:editedRowData={editedContactValues}
						bind:createdRowData={createdContacts}
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
/>


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt prodejny"
	translationRoute={"routes.prodej.zakaznici.customer_and_address_contact"}
/>
