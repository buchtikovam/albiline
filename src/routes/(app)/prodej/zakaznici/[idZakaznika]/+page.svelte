<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/autoform-def/zakaznici/customerDetailFormDef';
	import { newCustomerFormDef } from '$lib/data/autoform-def/zakaznici/newCustomerFormDef';
	import {
		customerDetailContactsTableDef
	} from '$lib/data/table-def/zakaznici/customerDetailContactsTableDef';
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
	import DetailTable from '$lib/components/table/DetailTable.svelte';
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import { customToast } from '$lib/utils/customToast';
	import { disableInputs } from '$lib/stores/pageStore';
	import { onMount } from 'svelte';
	import { selectedRowsStore } from '$lib/stores/tableStore';
	import { changeCustomerAddressRoute } from '$lib/utils/navigation/zakaznici/changeCustomerAddressRoute';
	import DetailNavButton from '$lib/components/button/DetailNavButton.svelte';
	import { customerPageLayout } from '$lib/data/detail-page-swappable-layout/customerPageLayout';
	import { changeCustomerRoute } from '$lib/utils/navigation/zakaznici/changeCustomerRoute';

	export let data;

	// if no data, disable inputs to avoid unwanted user interactions
	disableInputs.set(data.state.status === "fail")

	$: addressItem = data.response.item;
	$: formValues = writable(addressItem);

	$: addressContacts = data.response.contacts
	$: contactValues = writable(addressContacts)

	let translationRoute = "routes.prodej.zakaznici.customer_detail";
	let pageLayout = customerPageLayout;
	let openDialog: boolean = false;
	const flipDurationMs = 200;

	const selectedRows = get(selectedRowsStore)
	const uniqueSelectedRows = selectedRows.reduce((acc, item) => {
		const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
		if (existingIndex === -1) {
			acc.push(item);
		}
		return acc;
	}, []);

	console.log(uniqueSelectedRows);

	const uniqueNodeCodes = selectedRows.reduce((acc, item) => {
		if (acc.includes(item.customerNodeCode)) return acc

		acc.push(item.customerNodeCode)
		return acc;
	}, []);

	console.log(uniqueNodeCodes.length);

	$: disableLeft = false;
	$: disableRight = false;
	$: activeId = {
		customerNodeCode: Number($page.params.idZakaznika),
	}

	console.log(activeId);

	function changeRouteParameterAndDisable(direction: "left" | "right") {
		let returnedDisable = changeCustomerRoute(selectedRows, direction, activeId, $page.route.id);

		disableLeft = returnedDisable.left;
		disableRight = returnedDisable.right;
	}

	onMount(() => {
		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === activeId.customerNodeCode
		);

		if (!selectedRows[currentIndex + 1]) {
			disableRight = true
		}

		if (!selectedRows[currentIndex - 1]) {
			disableLeft = true
		}
	})
</script>



<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<div class="mb-3">
		<div class="flex justify-between">
			<DetailPageLabel
				label={`${ $_(translationRoute + '.header', { values: { customerNodeCode: $formValues.customerNodeCode || "customerNodeCode"}})}`}
			/>

			<div class={uniqueNodeCodes.length > 1 ? "flex gap-3" : "hidden"}>
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
						<SectionLabel name="Kontakty"/>

						<button id="contacts" on:click={() => pageLayout = flipItems(pageLayout)}>
							<ArrowUpDown class="size-4 text-albi-500"/>
						</button>

						<button on:click={() => openDialog = true}>
							<Plus strokeWidth={2.5} class="size-4 text-albi-500"/>
						</button>
					</div>

					<DetailTable
						translationRoute="routes.prodej.zakaznici"
						tableDef={customerDetailContactsTableDef}
						tableData={contactValues}
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>


<NewCustomerContactDialog
	formDef={newCustomerFormDef}
	bind:dialogOpen={openDialog}
	label="Nový kontakt zákazníka"
	translationRoute="routes.prodej.zakaznici.customer_and_address_contact"
/>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
</style>
