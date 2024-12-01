<script lang="ts">
	import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/stores/tableStore';
	import { disableNavigationStore } from '$lib/stores/pageStore';
	import { customerDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerDetailFormDef';
	import { editedFormValuesStore } from '$lib/stores/autoformStore';
	import { customerPageLayout } from '$lib/data/detail-page-swappable-layout/customerPageLayout';
	import { newCustomerContactFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerContactFormDef';
	import { ribbonActionStore } from '$lib/stores/ribbonStore';
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n'
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import { changeCustomerRoute } from '$lib/utils/navigation/zakaznici/changeCustomerRoute';
	import { RibbonActionEnum } from '$lib/enums/ribbon/ribbonAction';
	import { getPageMetaData } from '$lib/utils/getPageMetaData';
	import { onNavigate } from '$app/navigation';
	import { flipItems } from '$lib/utils/flipItems';
	import { onMount } from 'svelte';
	import { flip } from "svelte/animate";
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import { get, type Writable, writable } from 'svelte/store';
	import type { CustomerContactType, CustomerType } from '$lib/types/page/customers';
	import type { PageMetaDataType } from '$lib/types/page/pageSettings';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import NewCustomerContactDialog
		from '$lib/components/dialog/page/zakaznici/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';

	export let data: {
		response: {
			item: CustomerType,
			contacts: CustomerContactType[]
		},
		status: "success" | "fail",
	};

	// @ts-ignore // autoform
	let formValues: Writable<CustomerType> = writable({});
	$: formValues.set(data.response.item);

	// contacts table
	let contactValues: Writable<CustomerContactType[]> = writable([])
	$: contactValues.set(data.response.contacts);

	let editedContactValues: Writable<any[]> = writable([]);
	let createdContacts: Writable<CustomerContactType[]> = writable([]);

	// page variables
	const translationRoute = "routes.prodej.zakaznici.customer_detail";
	let pageLayout = customerPageLayout;
	let openNewContactDialog: boolean = false;
	let pageSettings: PageMetaDataType;


	// get all unique selected rows from table
	const selectedRows = get(selectedRowsStore);
	const uniqueSelectedRows = selectedRows.reduce((
		acc: Record<string, string | number | boolean | Date>[],
		item
	) => {
		const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
		if (existingIndex === -1) {
			acc.push(item);
		}
		return acc;
	}, []);


	// --- PAGE NAVIGATION BETWEEN SELECTED CUSTOMERS ----
	// route parameters swapping logic
	$: disableLeft = false;
	$: disableRight = false;

	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
	}

	// disable editing if there are unsaved changes
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


	// called when user swappes to the next/previous customer
	function changeRouteParameterAndDisable(direction: "left" | "right") {
		let returnedDisable = changeCustomerRoute(
			selectedRows,
			uniqueSelectedRows,
			direction,
			activeId,
			$page.route.id || "/"
		);

		disableLeft = returnedDisable.left;
		disableRight = returnedDisable.right;
	}


	onMount(async () => {
		// disable navigation buttons if user is located on the first/last customer
		const currentIndex = uniqueSelectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode
		);

		if (!uniqueSelectedRows[currentIndex + 1]) disableRight = true;
		if (!uniqueSelectedRows[currentIndex - 1]) disableLeft = true;

		if (!pageSettings) pageSettings = await getPageMetaData();
	})


	ribbonActionStore.subscribe((action) => {
		if (action === RibbonActionEnum.SAVE) {
			console.log("save");

			disableNavigationStore.set(false);
			if (selectedRows[get(activeSelectedRowIndexStore) + 1]) disableRight = false;
			if (selectedRows[get(activeSelectedRowIndexStore) - 1]) disableLeft = false;

			const saveObj = {
				item: get(editedFormValuesStore),

				contacts: {
					insert: get(createdContacts),
					update: get(editedContactValues),
					delete: []
				},
			}

			console.log(JSON.stringify(saveObj, null, 1));
		}

		ribbonActionStore.set(undefined);
	})
</script>



<MaxWidthScrollableDetailContainer>
	<div class="mb-3">
		<!-- header -->
		<div class="flex justify-between">
			<!-- page label -->
			<DetailPageLabel
				label={`${ $_(translationRoute + '.header', { values: { customerNodeCode: $formValues.customerNodeCode || "customerNodeCode"}})}`}
			/>

			<!-- page navigation buttons -->
			<div class={uniqueSelectedRows.length > 1 ? "flex gap-3" : "hidden"}>
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
					<!-- customer detail form -->
					<AutoForm
						translationRoute={translationRoute + ".autoform."}
						allowCrossColumnDND={false}
						formDef={customerDetailFormDef}
						bind:formValues
					/>
				</div>
			{/if}

			<!-- customer contacts table: display all, add new, move table up/down -->
			{#if item.type === "contacts"}
				<div class={item.isLast ? "" : "mb-4"}>
					<div class="flex gap-2" >
						<SectionLabel label="Kontakty"/>

						<button
							id="contacts"
							on:click={() => pageLayout = flipItems(pageLayout)}
						>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button
							on:click={() => openNewContactDialog = true}
						>
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
					</div>

					<AgGridCSWrapper
						requiredFields={["customerPersonCode"]}
						colDef={customerAndAddressContactsAgGridDef}
						bind:rowData={contactValues}
						bind:createdRowData={createdContacts}
						bind:editedRowData={editedContactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</MaxWidthScrollableDetailContainer>


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt zákazníka"
	translationRoute="routes.prodej.zakaznici.customer_and_address_contact"
/>
