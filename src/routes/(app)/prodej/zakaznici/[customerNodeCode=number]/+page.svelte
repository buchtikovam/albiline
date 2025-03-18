<script lang="ts">
	import {
		customerAndAddressContactsGridOptions,
		customerAndAddressContactsHeaderTranslations
	} from '$lib/definitions/routes/prodej/zakaznici/ag-grid-cs/customerAndAddressContactsAgGridDef';
	import {newCustomerContactFormDef} from '$lib/definitions/routes/prodej/zakaznici/autoform-simple/newCustomerContactFormDef';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {customerDetailFormDef} from '$lib/definitions/routes/prodej/zakaznici/autoform/customerDetailFormDef';
	import {customerPageLayout} from '$lib/definitions/routes/prodej/zakaznici/detail-page-layout/customerPageLayout';
	import {disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import {activeTabIndex, responseDialogMessages} from '$lib/runes/page.svelte';
	import {page} from '$app/state';
	import {apiSaveCustomerDetail} from "$lib/api/routes/customerService.svelte.js";
	import {changeCustomerRoute} from '$lib/utils/navigation/zakaznici/changeCustomerRoute.svelte';
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {flipItems} from '$lib/utils/flipItems';
	import {flip} from 'svelte/animate';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import type {CustomerContactType, CustomerType} from '$lib/types/routes/prodej/zakaznci/customers';
	import type {AutoFormType} from '$lib/types/components/form/autoform';
	import CustomerDetailInvoiceAdressesDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-get/CustomerInvoiceAdressesDialog.svelte";
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import NewCustomerContactDialog from '$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import AgGridCSSecondaryWrapper from '$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import * as m from '$lib/paraglide/messages.js'
	import type {AgGridSSTableType} from "$lib/types/components/table/table";


	interface Props {
		data: {
			item: CustomerType,
			contacts: CustomerContactType[]
		};
	}

	let { data }: Props = $props();


	// page settings
	activeTabIndex.value = 2;


	// --- initialize variables and state
	// page
	let pageKey: string = $derived(currentPageKey.value);
	let table: AgGridSSTableType = $state(agGridTables.value[pageKey]);
	let disableLeft = $state(false);
	let disableRight = $state(false);
	let activeIndex = $state(0);
	let activeRoute = $derived({
		customerNodeCode: Number(page.params.customerNodeCode),
	})


	// autoform
	let initialFormValues: Record<string, any> = $derived(data.item);
	let editedFormValues: Record<string, any> = $state({ })
	let pageLayout = $state(customerPageLayout);
	let autoformDef: AutoFormType = $state(customerDetailFormDef);

	// contacts ag grid
	let contactValues: CustomerContactType[] = $derived(data.contacts)
	let editedContactValues: any[] = $state([]);
	let createdContacts: CustomerContactType[] = $state([]);
	let openNewContactDialog: boolean = $state(false);

	// get all unique selected rows from table
	const uniqueSelectedRows = $derived.by(() => {
		if (table) {
			return table.selectedRows.reduce((
				acc: Record<string, string | number | boolean | Date>[],
				item
			) => {
				const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
				if (existingIndex === -1) {
					acc.push(item);
				}
				return acc;
			}, [])
		}

		return [];
	})



	// runs on mount
	$effect(() => {
		disablePageTabs.value = false;
	})



	// handles disabling page routing
	$effect(() => {
		activeIndex = uniqueSelectedRows.findIndex((id) =>
			id.customerNodeCode === activeRoute.customerNodeCode
		);

		if (!uniqueSelectedRows[activeIndex + 1]) disableRight = true;
		if (!uniqueSelectedRows[activeIndex - 1] || activeIndex === 0) disableLeft = true;
	})



	// push current route if no selected rows (user has refreshed page)
	$effect(() => {
		if (table.selectedRows.length === 0) {
			table.selectedRows.push(activeRoute)
		}
	})



	// disable navigation if edited data are present
	$effect(() => {
		if (Object.keys(editedFormValues).length > 0) {
			disableAllNavigation();
		} else {
			disableNavigation.value = false;
			if (uniqueSelectedRows[activeIndex + 1]) disableRight = false;
			if (uniqueSelectedRows[activeIndex - 1]) disableLeft = false;
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
				apiSaveCustomerDetail({
					insert: [...createdContacts],
					update: [...editedContactValues, ...[editedFormValues]],
					delete: []
				});
			} else {
				responseDialogMessages.value = [{
					type: "InfoToast",
					title: m.components_response_title_info(),
					content: m.components_response_dialog_make_changes_before_action(),
				}]
			}
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})



	function disableAllNavigation() {
		disableNavigation.value = true;
		disableLeft = true;
		disableRight = true;
	}
</script>




<svelte:head>
	{#if initialFormValues}
		<title>
			Zákazník {initialFormValues.customerNodeCode || ""} | Albiline
		</title>
	{/if}
</svelte:head>




<!-- autoform + contacts -->
<MaxWidthScrollableDetailContainer>
	<div class="mb-3">
		<!-- header -->
		<div class="flex justify-between">
			{#if initialFormValues}
			<DetailPageLabel
				label={m.routes_prodej_zakaznici_customer_detail_label() + " " + initialFormValues.customerNodeCode}
			/>
			{/if}

			<div class={uniqueSelectedRows.length > 1 ? "flex gap-3" : "hidden"}>
				<DetailNavButton
					direction="left"
					bind:disable={disableLeft}
					navigateDetailFn={() => changeCustomerRoute(
						activeIndex,
						uniqueSelectedRows,
						"left",
						page.route.id || "/",
						pageKey
					)}
				/>

				<DetailNavButton
					direction="right"
					bind:disable={disableRight}
					navigateDetailFn={() => changeCustomerRoute(
						activeIndex,
						uniqueSelectedRows,
						"right",
						page.route.id || "/",
						pageKey
					)}
				/>
			</div>
		</div>
	</div>


	{#each pageLayout as item (item.id)}
		<div animate:flip={{ duration: 300 }} >
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<!-- customer detail form -->
					<AutoForm
						allowCrossColumnDND={false}
						initialFormValues={initialFormValues}
						bind:editedFormValues={editedFormValues}
						bind:formDef={autoformDef}
					/>
				</div>
			{/if}

			<!-- customer contacts table: display all, add new, move table up/down -->
			{#if item.type === "contacts"}
				<div class={item.isLast ? "" : "mb-4"}>
					<div class="flex gap-2" >
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
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
					</div>


					<AgGridCSSecondaryWrapper
						requiredFields={["customerPersonCode"]}
						rowData={contactValues}
						fullHeight={false}
						headerTranslations={customerAndAddressContactsHeaderTranslations}
						gridOptionsCustom={customerAndAddressContactsGridOptions}
						bind:createdRowData={createdContacts}
						bind:editedRowData={editedContactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</MaxWidthScrollableDetailContainer>



<!-- opened from contacts section -->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	origin="customer"
/>



<!-- opened from autoform -->
{#if openedRibbonDialog.value === "customer-detail-invoice-addresses"}
	<CustomerDetailInvoiceAdressesDialog />
{/if}
