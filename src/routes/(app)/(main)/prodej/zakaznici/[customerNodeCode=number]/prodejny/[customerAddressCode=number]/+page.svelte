<script lang="ts">
	import {
		customerAndAddressContactsGridOptions,
		customerAndAddressContactsHeaderTranslations
	} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerAndAddressContactsAgGridDef';
	import {pageKeys, agGridTables} from '$lib/runes/table.svelte';
	import {activeTabIndex, isMobile, responseDialogMessages, showFulltextSearch} from '$lib/runes/page.svelte';
	import {customerAddressDetailAutoFormDef} from '$lib/definitions/routes/prodej/zakaznici/autoform/customerAddressAutoFormDef';
	import {
		customerAddressCustomGridOptions,
	} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerAddressesAgGridDef.svelte.js';
	import {customerAddressPageLayout} from '$lib/definitions/routes/prodej/zakaznici/detail-page-layout/customerAddressPageLayout';
	import {customerOrCustomerAddressContactFormDef} from '$lib/definitions/routes/prodej/zakaznici/form/customerOrCustomerAddressContactFormDef';
	import {disableNavigation} from '$lib/runes/navigation.svelte';
	import {ribbonAction} from '$lib/runes/ribbon.svelte';
	import {page} from '$app/state';
	import {changeCustomerAddressRoute} from '$lib/utils/routes/prodej/zakaznici/changeCustomerAddressRoute.svelte';
	import {apiGetCustomerAddresses, apiSaveCustomerAddressDetail} from "$lib/api/routes/prodej/zakaznici/customerService.svelte.js";
	import {RibbonActionEnum} from '$lib/enums/ribbon/ribbonAction';
	import {flipItems} from '$lib/utils/flipItems';
	import {flip} from 'svelte/animate';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Plus from 'lucide-svelte/icons/plus';
	import * as m from '$lib/paraglide/messages.js';
	import type {
		CustomerAddressType,
		CustomerContactType,
	} from '$lib/types/routes/prodej/zakaznici/customers';
	import MaxWidthDetailContainer from '$lib/components/containers/MaxWidthDetailContainer.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import AgGridCSSecondaryWrapper from '$lib/components/ag-grid/clientside-secondary/AgGridCSSecondaryWrapper.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import CustomerAddressesDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-get/CustomerAddressesDialog.svelte";
	import NewCustomerContactDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerContactDialog.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";


	interface Props {
		data: {
			item: CustomerAddressType,
			contacts: CustomerContactType[]
		}
	}

	let { data }: Props = $props();


	// page settings
	activeTabIndex.value = 1;
	showFulltextSearch.value = false;


	// --- initialize variables and state
	// page
	let pageKey: string = $state(pageKeys.value.value[pageKeys.value.index]);
	let table: AgGridTableType = $state(agGridTables.value[pageKey]);
	let disableLeft = $state(false);
	let disableRight = $state(false);
	let activeRoute = $derived({
		customerNodeCode: Number(page.params.customerNodeCode),
		customerAddressCode: Number(page.params.customerAddressCode)
	});

	// customer addresses dialog
	let openAgGridDialog: boolean = $state(false);
	let addresses: CustomerAddressType[] = $state([]);

	// autoform
	let initialFormValues: Record<string, any> = $derived(data.item);
	let editedFormValues: Record<string, any> = $state({});
	let pageLayout = $state(customerAddressPageLayout);
	let autoformDef = $state(customerAddressDetailAutoFormDef);

	// contacts ag grid
	let contactValues: CustomerContactType[] = $derived(data.contacts);
	let editedContactValues: any[] = $state([]);
	let createdContacts: CustomerContactType[] = $state([]);
	let openNewContactDialog: boolean = $state(false);



	// runs during mount and unmount
	$effect(() => {
		disableNavigation.value = false;
		if (!table.selectedRows[table.activeSelectedRowIndex + 1]) disableRight = true;
		if (!table.selectedRows[table.activeSelectedRowIndex - 1]) disableLeft = true;

		return(() => {
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
				apiSaveCustomerAddressDetail({
					insert: [...createdContacts],
					update: [...editedContactValues, ...[editedFormValues]],
					delete: []
				})
			} else {
				responseDialogMessages.value = [{
					type: "InfoToast",
					title: m.components_response_title_info(),
					content: m.components_response_dialog_make_changes_before_action(),
				}]
			}
		}

		ribbonAction.value = RibbonActionEnum.UNKNOWN;
	})



	function disableAllNavigation() {
		disableNavigation.value = true;
		disableLeft = true;
		disableRight = true;
	}
</script>




<svelte:head>
	<title>
		Prodejna {initialFormValues.customerAddressCode || ""} | Albiline
	</title>
</svelte:head>



<MaxWidthDetailContainer>
	<div class="flex flex-col ">
		<!-- header -->
		<div class="flex justify-between mb-2">
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
					onclick={async () => {
						openAgGridDialog = true;
						if (addresses.length === 0) {
							addresses = await apiGetCustomerAddresses();
						}
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
						pageKey
					)}
				/>

				<DetailNavButton
					direction="right"
					bind:disable={disableRight}
					navigateDetailFn={() => changeCustomerAddressRoute(
						"right",
						page.route.id || "",
						pageKey
					)}
				/>
			</div>
		</div>
	</div>


	<!-- page content -->
	<div class="">
		{#each pageLayout as item (item.id)}
			<div animate:flip={{ duration: 300 }} >
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
						class={(item.isLast ? "" : "mb-4")}
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
						<div class="p-2 bg-slate-100 border border-slate-300 rounded-lg">
							<AgGridCSSecondaryWrapper
								rowData={contactValues}
								fullHeight={false}
								hiddenHeader={false}
								headerTranslations={customerAndAddressContactsHeaderTranslations}
								gridOptionsCustom={customerAndAddressContactsGridOptions}
								bind:createdRowData={createdContacts}
								bind:editedRowData={editedContactValues}
							/>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</MaxWidthDetailContainer>







<!-- display all customer addresses, select new active -->
<CustomerAddressesDialog
	gridOptionsCustom={customerAddressCustomGridOptions}
	rowData={addresses}
	bind:open={openAgGridDialog}
/>


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={customerOrCustomerAddressContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	origin="address"
/>
