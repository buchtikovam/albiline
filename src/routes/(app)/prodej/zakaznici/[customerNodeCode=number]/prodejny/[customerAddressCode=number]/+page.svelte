<script lang="ts">
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/prodej/zakaznici/customerAndAddressContactsAgGridDef';
	import {type ServerSideTable, serverSideTables} from '$lib/runes/table.svelte';
	import {activeTabIndex, isMobile, pageCode} from '$lib/runes/page.svelte';
	import {customerAddressDetailFormDef} from '$lib/data/autoform/zakaznici/customerAddressFormDef';
	import {customerAddressesAgGridDef} from '$lib/data/ag-grid/client-side/prodej/zakaznici/customerAddressesAgGridDef.svelte';
	import {customerAddressPageLayout} from '$lib/data/detail-page-layout/customerAddressPageLayout';
	import {newCustomerContactFormDef} from '$lib/data/autoform/zakaznici/newCustomerContactFormDef';
	import {disableNavigation} from '$lib/runes/navigation.svelte';
	import {ribbonAction} from '$lib/runes/ribbon.svelte';
	import {page} from '$app/state';
	import {apiServiceGET} from '$lib/api/apiService.svelte';
	import {changeCustomerAddressRoute} from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute.svelte';
	import {RibbonActionEnum} from '$lib/enums/ribbon/ribbonAction';
	import {customToast} from '$lib/utils/customToast';
	import {flipItems} from '$lib/utils/flipItems';
	import {getContext} from 'svelte';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Plus from 'lucide-svelte/icons/plus';
	import * as m from '$lib/paraglide/messages.js';
	import type {CustomerAddressType, CustomerContactType} from '$lib/types/page/customers';
	import type {GridOptions} from 'ag-grid-enterprise';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import CustomerAddressesDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-get/CustomerAddressesDialog.svelte";
	import NewCustomerContactDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerContactDialog.svelte";

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


	// page settings
	activeTabIndex.value = 1;
	pageCode.value = btoa(page.route.id || "");


	// --- initialize variables and state
	// page
	let tableKey: string = getContext('serverSideTableKey');
	let table: ServerSideTable = $state(serverSideTables[tableKey]);
	let disableLeft = $state(false);
	let disableRight = $state(false);
	let activeRoute = $derived({
		customerNodeCode: Number(page.params.customerNodeCode),
		customerAddressCode: Number(page.params.customerAddressCode)
	});

	// customer addresses dialog
	let openAgGridDialog: boolean = $state(false);
	let addresses = $state([]);

	// autoform
	let initialFormValues: Record<string, any> = $derived(data.response.item);
	let editedFormValues: Record<string, any> = $state({ id: data.response.item.id });
	let pageLayout = $state(customerAddressPageLayout);
	let autoformDef = $state(customerAddressDetailFormDef);

	// contacts ag grid
	let contactValues: CustomerContactType[] = $derived(data.response.contacts);
	let editedContactValues: any[] = $state([]);
	let createdContacts: CustomerContactType[] = $state([]);
	let openNewContactDialog: boolean = $state(false);
	const contactsGridOptions: GridOptions = {
		columnDefs: customerAndAddressContactsAgGridDef,
	}



	// runs during mount and unmount
	$effect(() => {
		disableNavigation.value = false;
		if (!table.selectedRows[table.activeSelectedRowIndex + 1]) disableRight = true;
		if (!table.selectedRows[table.activeSelectedRowIndex - 1]) disableLeft = true;

		return(() => {
			console.log("return")
			addresses = [];
			openAgGridDialog = false;
		})
	})



	// push current route if no selected rows (user has refreshed page)
	$effect(() => {
		if (table.selectedRows.length === 0) {
			table.selectedRows.push(activeRoute)
		}
	})



	// disable navigation on routing between detail pages
	$effect(() => {
		if (table.activeSelectedRowIndex) {
			if (!table.selectedRows[table.activeSelectedRowIndex + 1]) disableRight = true;
			if (!table.selectedRows[table.activeSelectedRowIndex - 1]) disableLeft = true;
		}
	})



	// disable navigation if there are unsaved changes in form
	$effect(() => {
		if (Object.keys(editedFormValues).length > 1) {
			disableAllNavigation();
		} else {
			disableNavigation.value = false;

			if (table.selectedRows[table.activeSelectedRowIndex + 1]) {
				disableRight = false;
			}

			if (table.selectedRows[table.activeSelectedRowIndex - 1]) {
				disableLeft = false;
			}
		}
	})



	// disable navigation if new contact was created
	$effect(() => {
		if (createdContacts.length > 0) disableAllNavigation();
	})



	// runs when ribbon action changes
	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.SAVE) {
			if (
				Object.keys(editedFormValues).length > 0 ||
				createdContacts.length > 0 ||
				editedContactValues.length > 0
			) {
				const saveObj = {
					insert: [...createdContacts],
					update: [...editedContactValues, ...[editedFormValues]],
					delete: []
				}

				updateAndReload(saveObj);
			} else {
				customToast(
					"InfoToast",
					"Nemáte nic k uložení. Nejdříve proveďte změny."
				)
			}
		}

		ribbonAction.value = RibbonActionEnum.UNKNOWN;
	})



	function disableAllNavigation() {
		disableNavigation.value = true;
		disableLeft = true;
		disableRight = true;
	}



	// save data on the api
	async function updateAndReload(saveObj: {insert: any[], update: any[], delete: any[]}) {
		console.log(JSON.stringify(saveObj, null, 1)); // clear all edited and created
	}



	// fetching for customer addresses ag-grid dialog
	async function getAddresses() {
		if (addresses.length === 0) {
			const res = await apiServiceGET(`customers/${page.params.customerNodeCode}/addresses`)

			if (res.ok) {
				const responseData = await res.json();
				addresses = await responseData.items;
			} else {
				customToast("Critical", "Nepodařilo se získat prodejny")
			}
		}
	}
</script>




<svelte:head>
	<title>
		Prodejna {initialFormValues.customerAddressCode || ""} | Albiline
	</title>
</svelte:head>




<MaxWidthScrollableDetailContainer>
	<div class="flex flex-col mb-3">
		<!-- header -->
		<div class="flex justify-between">
			<!-- page label + get addresses button -->
			<div class="flex gap-1.5">
				{#if isMobile.value}
					<DetailPageLabel
						label={`${m.routes_prodej_zakaznici_address_detail_label_mobile(
							{ customerAddressCode: initialFormValues.customerAddressCode || ""}
						)}`}
					/>
				{:else}
					<DetailPageLabel
						label={`${m.routes_prodej_zakaznici_address_detail_label(
						{
							customerName: initialFormValues.customerName || "",
							customerAddressCode: initialFormValues.customerAddressCode || ""})
						}`}
					/>
				{/if}

				<button
					class={(disableNavigation.value ? "text-slate-300 " : "text-albi-500") + " w-6"}
					disabled={disableNavigation.value}
					onclick={() => {
						openAgGridDialog = true;
						getAddresses();
					}}
				>
					<Repeat class="size-5"/>
				</button>
			</div>

			<!-- page navigation buttons -->
			<div
				class={table.selectedRows.length > 1 ? "flex gap-3" : "hidden"}
			>
				<DetailNavButton
					direction="left"
					bind:disable={disableLeft}
					navigateDetailFn={() => changeCustomerAddressRoute(
						"left",
						page.route.id || "",
						tableKey
					)}
				/>

				<DetailNavButton
					direction="right"
					bind:disable={disableRight}
					navigateDetailFn={() => changeCustomerAddressRoute(
						"right",
						page.route.id || "",
						tableKey
					)}
				/>
			</div>
		</div>
	</div>


	<!-- page content -->
	{#each pageLayout as item (item.id)}
		<div class="">
			<!-- address detail form -->
			{#if item.type === "form"}
				<div
					class={(item.isLast ? "-mb-2" : "")}
				>
					<AutoForm
						bind:formDef={autoformDef}
						allowCrossColumnDND={true}
						bind:editedFormValues={editedFormValues}
						initialFormValues={initialFormValues}
					/>
				</div>
			{/if}

			<!-- address contacts table: display all, add new, move table up/down -->
			{#if item.type === "contacts"}
				<div
					class={(item.isLast ? "mb-2" : "mb-4")}
				>
					<div class="flex gap-2 pb-2">
						<SectionLabel
							label={m.routes_prodej_zakaznici_detail_contacts_label()}
						/>

						<button
							id="contacts"
							onclick={() => pageLayout = flipItems(pageLayout)}
						>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button
							onclick={() => openNewContactDialog = true}
						>
							<Plus
								strokeWidth={2.5}
								class="text-albi-500 size-4"
							/>
						</button>
					</div>

					<!-- contacts table -->
					<AgGridCSWrapper
						requiredFields={["customerPersonCode"]}
						rowData={contactValues}
						fullHeight={false}
						hiddenHeader={false}
						gridOptionsCustom={contactsGridOptions}
						bind:createdRowData={createdContacts}
						bind:editedRowData={editedContactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</MaxWidthScrollableDetailContainer>


<!-- display all customer addresses, select new active -->
<CustomerAddressesDialog
	colDef={customerAddressesAgGridDef}
	rowData={addresses}
	bind:open={openAgGridDialog}
/>


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt prodejny"
/>
