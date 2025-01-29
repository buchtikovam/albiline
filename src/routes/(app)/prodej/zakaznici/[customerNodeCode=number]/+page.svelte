<script lang="ts">
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import { activeSelectedRowIndex, storedSelectedRows } from '$lib/runes/table.svelte';
	import { newCustomerContactFormDef } from '$lib/data/autoform/zakaznici/newCustomerContactFormDef';
	import { customerDetailFormDef } from '$lib/data/autoform/zakaznici/customerDetailFormDef';
	import { customerPageLayout } from '$lib/data/detail-page-layout/customerPageLayout';
	import { disableNavigation } from '$lib/runes/navigation.svelte';
	import { activeTabIndex } from '$lib/runes/page.svelte';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js'
	import { changeCustomerRoute } from '$lib/utils/navigation/zakaznici/changeCustomerRoute';
	import { flipItems } from '$lib/utils/flipItems';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import Plus from 'lucide-svelte/icons/plus';
	import type { CustomerContactType, CustomerType } from '$lib/types/page/customers';
	import type { GridOptions } from 'ag-grid-enterprise';
	import type { AutoFormType } from '$lib/types/components/form/autoform';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import NewCustomerContactDialog from '$lib/components/dialog/page/zakaznici/dialog-create-new/NewCustomerContactDialog.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';


	interface Props {
		data: {
			response: {
				item: CustomerType,
				contacts: CustomerContactType[]
			},
			status: "success" | "fail",
		};
	}

	let { data }: Props = $props();

	activeTabIndex.value = 2;

	let initialFormValues: CustomerType = $derived(data.response.item);
	let editedFormValues: Record<string, any> = $state({ })

	let contactValues: CustomerContactType[] = $derived(data.response.contacts)
	let editedContactValues: any[] = $state([]);
	let createdContacts: CustomerContactType[] = $state([]);

	let pageLayout = $state(customerPageLayout);
	let autoformDef: AutoFormType = $state(customerDetailFormDef);
	let openNewContactDialog: boolean = $state(false);


	$inspect(editedFormValues);
	$effect(() => {
		if (Object.keys(editedFormValues).length > 0) {
			disableNavigation.value = true;
			disableLeft = true;
			disableRight = true;
		} else {
			disableNavigation.value = false;

			if (uniqueSelectedRows[activeSelectedRowIndex.value + 1]) disableRight = false;
			if (uniqueSelectedRows[activeSelectedRowIndex.value - 1]) disableLeft = false;
		}
	})


	// get all unique selected rows from table
	const uniqueSelectedRows = $derived.by(() => {
		return storedSelectedRows.value.reduce((
			acc: Record<string, string | number | boolean | Date>[],
			item
		) => {
			const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
			if (existingIndex === -1) {
				acc.push(item);
			}
			return acc;
		}, [])
	})

	let disableLeft = $state(false);
	let disableRight = $state(false);

	let activeRouteId = $derived({
		customerNodeCode: Number(page.params.customerNodeCode),
	})


	// called when user swappes to the next/previous customer
	function changeRouteParameterAndDisable(direction: "left" | "right") {
		let returnedDisable = changeCustomerRoute(
			storedSelectedRows.value,
			uniqueSelectedRows,
			direction,
			activeRouteId,
			page.route.id || "/"
		);

		disableLeft = returnedDisable.left;
		disableRight = returnedDisable.right;
	}


	$effect(() => {
		const currentIndex = uniqueSelectedRows.findIndex((id) =>
			id.customerNodeCode === activeRouteId.customerNodeCode
		);

		if (!uniqueSelectedRows[currentIndex + 1]) disableRight = true;
		if (!uniqueSelectedRows[currentIndex - 1]) disableLeft = true;
	})


	$effect(() => {
		if (createdContacts.length > 0) {
			disableNavigation.value = true;
			disableLeft = true;
			disableRight = true;
		}
	})


	const contactsGridOptions: GridOptions = {
		columnDefs: customerAndAddressContactsAgGridDef,
	}

	$inspect(editedContactValues);
	$inspect(createdContacts)
</script>



<svelte:head>
	<title>Zákazník {initialFormValues.customerNodeCode || ""} | Albiline</title>
</svelte:head>



<MaxWidthScrollableDetailContainer>
	<div class="mb-3">
		<!-- header -->
		<div class="flex justify-between">
			<!-- page label -->
			<DetailPageLabel
				label={m.routes_prodej_zakaznici_customer_detail_label() + " " + initialFormValues.customerNodeCode}
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
		<div >
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
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
					</div>

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


<!-- new customer form -->
<NewCustomerContactDialog
	formDef={newCustomerContactFormDef}
	bind:createdContacts={createdContacts}
	bind:dialogOpen={openNewContactDialog}
	label="Nový kontakt zákazníka"
/>
