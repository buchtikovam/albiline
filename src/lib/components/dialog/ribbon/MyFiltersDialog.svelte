<script lang="ts">
	import {pageCompact, pageCode, responseDialogMessages} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte";
	import {apiServiceDELETE, apiServiceGET, apiServicePUT} from "$lib/api/apiService.svelte";
	import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte.js";
	import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";
	import Save from "lucide-svelte/icons/save";
	import type {
		CellContextMenuEvent,
		ICellRendererParams
	} from "ag-grid-community";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredFilters} from "$lib/types/components/table/filters";
	import FilterDetailDialog from "$lib/components/dialog/ribbon/FilterDetailDialog.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';
	import {ribbonFiltersAgGridDef} from "$lib/definitions/components/ribbon/ag-grid/ribbonFiltersAgGridDef";
	import type {FetchedInputParamsType} from "$lib/types/components/input-params/inputParams";


	let isOpen: boolean = $state(false);
	let openDetailDialog = $state(false);
	let detailFilter: StoredFilters|undefined = $state(undefined);
	let hasUnsavedData = $state(false);
	let fetchedFilters: StoredFilters[] = $state([]);
	let idsToDelete: number[] = $state([]);
	let editedFilters: StoredFilters[] = $state([]);


	$effect(() => {
		isOpen = true;
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
		const resp = await apiServiceGET("userfilters");

		if (resp.ok) {
			const respItems = await resp.json();
			fetchedFilters = respItems.items;
		}
	}


	// if filter was selected, load it in table and close dialog
	function handleClickSelect(params: ICellRendererParams) {
		if (!hasUnsavedData) {
			serverSideTables[pageCode.value].selectedFilters = params.data.filters;
			openedRibbonDialog.value = "empty";
		}
	}


	// todo: finish delete with api
	function handleDelete(params: ICellRendererParams) {
		fetchedFilters.forEach((filter, index) => {
			if (filter.filterId === params.data.filterId) {
				idsToDelete.push(params.data.filterId)
				fetchedFilters.splice(index, 1);
			}
		})
	}


	async function saveChanges() {
		for (const id of idsToDelete) {
			console.log("deleting ", id)
			let resp = await apiServiceDELETE("userfilters", id);
			let respData = await resp.json();

			console.log(respData)
			responseDialogMessages.value = respData.messages;
		}

		for (const filter of editedFilters) {
			let resp = await apiServicePUT("userfilters", filter.filterId, filter);
			let respData = await resp.json();
			responseDialogMessages.value = respData.messages;
		}

		hasUnsavedData = false;
	}


	$inspect(idsToDelete)

	$inspect(editedFilters)
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
		{#if fetchedFilters.length > 0}
			<AgGridCSWrapper
				rowData={fetchedFilters}
				requiredFields={["fiterId"]}
				bind:editedRowData={editedFilters}
				returnWholeRowOnEdit={true}
				gridOptionsCustom={customGridOptions}
				fullHeight={true}
				hiddenHeader={true}
			/>
		{:else }
			{m.components_ribbon_dialog_my_filters_no_instances_found()}
		{/if}
	</div>
{/snippet}


<FilterDetailDialog
	bind:isOpen={openDetailDialog}
	filter={detailFilter}
/>
