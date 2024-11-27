<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerDetailFormDef';
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
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
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { onMount } from 'svelte';
	import { selectedRowsStore } from '$lib/stores/tableStore';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import { customerPageLayout } from '$lib/data/detail-page-swappable-layout/customerPageLayout';
	import { changeCustomerRoute } from '$lib/utils/navigation/zakaznici/changeCustomerRoute';
	import MaxWidthScrollableDetailContainer from '$lib/components/containers/MaxWidthScrollableDetailContainer.svelte';
	import { editedFormValuesStore } from '$lib/stores/autoformStore';
	import {
		customerAndAddressContactsAgGridDef
	} from '$lib/data/ag-grid/client-side/customerAndAddressContactsAgGridDef';
	import AgGridCSWrapper from '$lib/components/ag-grid/AgGridCSWrapper.svelte';
	import { disableNavigationStore } from '$lib/stores/pageStore';
	import { onNavigate } from '$app/navigation';


	export let data;

	let formValues = writable({});
	$: formValues.set(data.response.item);

	let contactValues = writable([])
	$: contactValues.set(data.response.contacts);
	let editedContactValues = []


	const translationRoute = "routes.prodej.zakaznici.customer_detail";
	let pageLayout = customerPageLayout;
	let openDialog: boolean = false;
	const flipDurationMs = 200;


	const selectedRows = get(selectedRowsStore);
	const uniqueSelectedRows = selectedRows.reduce((acc, item) => {
		const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
		if (existingIndex === -1) {
			acc.push(item);
		}
		return acc;
	}, []);


	// --- PAGE NAVIGATION BETWEEN SELECTED ADDRESSES ----
	// route parameters swapping logic
	$: disableLeft = false;
	$: disableRight = false;

	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
	}

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


	// disable editing if there are unsaved changes
	editedFormValuesStore.subscribe((data) => {
		disableNavigationStore.set(false);

		if (Object.keys(data).length > 0) {
			disableNavigationStore.set(true);
		}
	})


	onNavigate(() => {
		editedContactValues = [];
	})


	onMount(() => {
		const currentIndex = uniqueSelectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode
		);

		if (!uniqueSelectedRows[currentIndex + 1]) disableRight = true;
		if (!uniqueSelectedRows[currentIndex - 1]) disableLeft = true;
	})
</script>



<MaxWidthScrollableDetailContainer>
	<div class="mb-3">
		<div class="flex justify-between">
			<DetailPageLabel
				label={`${ $_(translationRoute + '.header', { values: { customerNodeCode: $formValues.customerNodeCode || "customerNodeCode"}})}`}
			/>

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
		<div animate:flip="{{duration: flipDurationMs}}">
			{#if item.type === "form"}
				<div class={item.isLast ? "-mb-2" : ""}>
					<AutoForm
						translationRoute={translationRoute + ".autoform."}
						allowCrossColumnDND={false}
						formDef={customerDetailFormDef}
						bind:formValues
					/>
				</div>
			{/if}

			{#if item.type === "contacts"}
				<div class={item.isLast ? "" : "mb-4"}>
					<div class="flex gap-2" >
						<SectionLabel label="Kontakty"/>

						<button id="contacts" on:click={() => pageLayout = flipItems(pageLayout)}>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button on:click={() => openDialog = true}>
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
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


<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openDialog}
	label="Nový kontakt zákazníka"
	translationRoute="routes.prodej.zakaznici.customer_and_address_contact"
/>
