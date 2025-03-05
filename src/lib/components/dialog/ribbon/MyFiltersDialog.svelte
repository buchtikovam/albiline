<script lang="ts">
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import {apiServiceDELETEHandled, apiServiceGETHandled, apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import {ribbonFiltersAgGridDef} from "$lib/definitions/components/ribbon/ag-grid/ribbonFiltersAgGridDef";
	import Save from "lucide-svelte/icons/save";
	import type {
		CellContextMenuEvent,
		ICellRendererParams
	} from "ag-grid-community";
	import type {GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredFilters} from "$lib/types/components/table/filters";
	import FilterDetailDialog from "$lib/components/dialog/ribbon/FilterDetailDialog.svelte";
	import TableSkeletonSmall from "$lib/components/skeleton/TableSkeletonSmall.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';


	let isOpen: boolean = $state(false);
	let openDetailDialog = $state(false);
	let isLoading = $state(true);
	let detailFilter: StoredFilters|undefined = $state(undefined);
	let hasUnsavedData = $state(false);
	let fetchedFilters: StoredFilters[] = $state([]);
	let idsToDelete: number[] = $state([]);
	let editedFilters: StoredFilters[] = $state([]);
	let pageKey = $derived(currentPageKey.value);


	$effect(() => {
		isOpen = true;
		isLoading = true;
		getFilters();

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	$effect(() => {
		if (idsToDelete.length > 0 || editedFilters.length > 0) {
			hasUnsavedData = true;
		}
	})


	const customGridOptions: GridOptions = {
		columnDefs: ribbonFiltersAgGridDef(handleClickSelect, handleDelete),

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.filterId);
		},

		getContextMenuItems: () => {
			return [
				'copy',
				{
					name: "Detail",
					action: () => {
						openDetailDialog = true;
					},
					icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-search\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>",
				},
			];
		},

		onCellContextMenu(event: CellContextMenuEvent<any>) {
			detailFilter = event.data;
		},
	}


	async function getFilters() {
		const response = await apiServiceGETHandled("userfilters");

		if (response.success) {
			fetchedFilters = response.data.items;
			isLoading = false;
		}
	}


	// if filter was selected, load it in table and close dialog
	function handleClickSelect(params: ICellRendererParams) {
		if (!hasUnsavedData) {
			agGridTables[pageKey].selectedFilters = params.data;
			openedRibbonDialog.value = "empty";
		}
	}


	function handleDelete(params: ICellRendererParams) {
		fetchedFilters.forEach((filter, index) => {
			if (filter.filterId === params.data.filterId) {
				idsToDelete.push(params.data.filterId)
				fetchedFilters.splice(index, 1);
			}
		})
	}


	async function saveChanges() {
		let hasFailed = false;

		for (const id of idsToDelete) {
			let response = await apiServiceDELETEHandled("userfilters", id);
			if (!response.success) hasFailed = true;
		}

		for (const filter of editedFilters) {
			let response = await apiServicePUTHandled("userfilters", filter.filterId, filter);
			if (!response.success) hasFailed = true;
		}

		if (!hasFailed) hasUnsavedData = false;
	}
</script>




<DialogWrapper
	bind:isOpen
	{header}
	{content}
	onChange={() => {
		isOpen = false;
		setTimeout(() => {
			openedRibbonDialog.value = 'empty';
		}, 200)
	}}
	fixedHeight={false}
	size="sm"
	customCss={"!h-[360px] md:!w-[500px]"}
/>

{#snippet header()}
	<Dialog.Title class="h-6 flex pr-4 gap-2 items-center">
		{m.components_ribbon_dialog_my_filters_label()}

		{#if hasUnsavedData}
			<button
				onclick={() => saveChanges()}
			>
				<Save
					class="size-5 text-albi-500 hover:text-albi-700"
				/>
			</button>
		{/if}
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="h-full">
		{#if isLoading}
			<TableSkeletonSmall/>
		{:else}

			{#if fetchedFilters.length > 0}
				<AgGridCSWrapper
					rowData={fetchedFilters}
					requiredFields={["fiterId"]}
					bind:editedRowData={editedFilters}
					returnWholeRowOnEdit={true}
					headerTranslations={{}}
					gridOptionsCustom={customGridOptions}
					fullHeight={true}
					hiddenHeader={true}
				/>
			{:else }
				{m.components_ribbon_dialog_my_filters_no_instances_found()}
			{/if}

		{/if}
	</div>
{/snippet}


<FilterDetailDialog
	bind:isOpen={openDetailDialog}
	filter={detailFilter}
/>
