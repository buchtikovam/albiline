<script lang="ts">
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import { activeSelectedRowIndex, storedSelectedRows } from '$lib/runes/table.svelte';
	import { customerAddressDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerAddressFormDef';
	import { customerAddressesAgGridDef } from '$lib/data/ag-grid/client-side/customerAddressesAgGridDef';
	import { customerAddressPageLayout } from '$lib/data/detail-page-swappable-layout/customerAddressPageLayout';
	import { newCustomerContactFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerContactFormDef';
	import { disableNavigation } from '$lib/runes/navigation.svelte';
	import { activeTabIndex, isMobile } from '$lib/runes/page.svelte';
	import { ribbonAction } from '$lib/runes/ribbon.svelte';
	import { page } from '$app/stores';
	import { apiServiceGET, apiServicePOST } from '$lib/api/apiService';
	import { changeCustomerAddressRoute } from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { goto, invalidateAll } from '$app/navigation';
	import { customToast } from '$lib/utils/customToast';
	import { flipItems } from '$lib/utils/flipItems';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Repeat from 'lucide-svelte/icons/repeat';
	import Plus from 'lucide-svelte/icons/plus';
	import * as m from '$lib/paraglide/messages.js';
	import type { CustomerAddressType, CustomerContactType } from '$lib/types/page/customers';
	import type { GridOptions } from 'ag-grid-enterprise';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import NewCustomerContactDialog from '$lib/components/dialog/page/zakaznici/NewCustomerContactDialog.svelte';
	import CustomerAddressesDialog from '$lib/components/dialog/page/zakaznici/CustomerAddressesDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';

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

	activeTabIndex.value = 1;

	let initialFormValues: CustomerAddressType = $derived(data.response.item);
	let editedFormValues: Record<string, any> = $state({});

	let contactValues: CustomerContactType[] = $derived(data.response.contacts);
	let editedContactValues: any[] = $state([]);
	let createdContacts: CustomerContactType[] = $state([]);

	let pageLayout = $state(customerAddressPageLayout);

	let openNewContactDialog: boolean = $state(false);
	let openAgGridDialog: boolean = $state(false);

	let autoformDef = $state(customerAddressDetailFormDef);
	let selectedRows = $derived(storedSelectedRows.value);

	let disableLeft = $state(false);
	let disableRight = $state(false);

	let activeRouteId = $derived({
		customerNodeCode: Number($page.params.customerNodeCode),
		customerAddressCode: Number($page.params.customerAddressCode)
	});


	// disable navigation if there are unsaved changes in form
	$effect(() => {
		if (Object.keys(editedFormValues).length > 0) {
			disableNavigation.value = true;
			disableLeft = true;
			disableRight = true;
		} else {
			disableNavigation.value = false;

			if (selectedRows[activeSelectedRowIndex.value + 1]) {
				disableRight = false;
			}

			if (selectedRows[activeSelectedRowIndex.value - 1]) {
				disableLeft = false;
			}
		}
	})


	// disable navigation if new contact was created
	$effect(() => {
		if (createdContacts.length > 0) {
			disableNavigation.value = true;
			disableLeft = true;
			disableRight = true;
		}
	})


	// called when user swappes to the next/previous address
	function changeRouteParameterAndDisable(direction: "left" | "right") {
		const returnedDisable = changeCustomerAddressRoute(
			selectedRows,
			direction,
			activeRouteId,
			$page.route.id || "/"
		);

		disableLeft = returnedDisable.left;
		disableRight = returnedDisable.right;
	}


	// fetching for customer addresses ag-grid dialog
	let addresses = $state([])

	async function getAddresses() {
		if (addresses.length === 0) {
			const res = await apiServiceGET(`customers/${$page.params.customerNodeCode}/addresses`)

			if (res.ok) {
				const responseData = await res.json();
				addresses = await responseData.items;
			} else {
				customToast("Critical", "Nepodařilo se získat prodejny")
			}
		}
	}


	// runs during mount and unmount
	$effect(() => {
		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === activeRouteId.customerNodeCode
		);

		if (!selectedRows[currentIndex + 1]) disableRight = true;
		if (!selectedRows[currentIndex - 1]) disableLeft = true;

		return(() => {
			addresses = [];
			openAgGridDialog = false;
		})
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
					item: editedFormValues,

					contacts: {
						insert: createdContacts,
						update: editedContactValues,
						delete: []
					},
				}

				console.log(JSON.stringify(saveObj, null, 1));

				if (Object.keys(saveObj.item).length > 0) {
					saveObj.item.customerAddressCode = Number($page.params.customerAddressCode)
					saveObj.item.customerNodeCode = Number($page.params.customerNodeCode)
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


	// save data on the api
	async function updateAndReload(saveObj) {
		const res = await apiServicePOST(
			`customers/${$page.params.customerNodeCode}/addresses/${$page.params.customerAddressCode}`,
			saveObj
		)

		if (res.ok) {
			editedFormValues = {};
			editedContactValues = [];
			createdContacts = [];
			disableNavigation.value = false;
			customToast(
				"Success",
				"Změny byly úspěšně uloženy"
			);
			await invalidateAll();
		} else {
			customToast(
				"Critical",
				"Nepovedlo se uložit změny."
			)
		}
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


	const contactsGridOptions: GridOptions = {
		columnDefs: customerAndAddressContactsAgGridDef,
	}
</script>



<svelte:head>
	<title>Prodejna {initialFormValues.customerAddressCode || ""} | Albiline</title>
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
			<div class={storedSelectedRows.value.length > 1 ? "flex gap-3" : "hidden"}>
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
		<div class="">
			<!-- address detail form -->
			{#if item.type === "form"}
				<div class={(item.isLast ? "-mb-2" : "")}>
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
				<div class={(item.isLast ? "" : "mb-4")}>
					<div class="flex gap-2">
						<SectionLabel label={m.routes_prodej_zakaznici_detail_contacts_label()}/>

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
						rowData={contactValues}
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


<!--&lt;!&ndash; new customer form &ndash;&gt;-->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt prodejny"
/>
