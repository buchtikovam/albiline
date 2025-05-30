<script lang="ts">
	import {pageCompact} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {pageKeys, agGridTables} from "$lib/runes/table.svelte";
	import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte";
	import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";
	import Save from "lucide-svelte/icons/save";
	import {
		apiServicePUTHandled,
		apiServiceGETHandled,
		apiServiceDELETEHandled
	} from "$lib/api/apiService.svelte";
	import type {GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredPresets} from "$lib/types/components/table/presets";
	import type {
		ICellRendererParams
	} from "ag-grid-community";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/clientside-secondary/AgGridCSSecondaryWrapper.svelte";
	import TableSkeletonSmall from "$lib/components/skeleton/TableSkeletonSmall.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';


	let isOpen: boolean = $state(false);
	let hasUnsavedData = $state(false);
	let idsToDelete: number[] = $state([]);
	let fetchedPresets: StoredPresets[] = $state([]);
	let editedPresets: StoredPresets[] = $state([]);
	let isLoading = $state(true);
	let pageKey = pageKeys.value.value[pageKeys.value.index];


	$effect(() => {
		isOpen = true;
		isLoading = true;
		getPresets();

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	$effect(() => {
		if (idsToDelete.length > 0 || editedPresets.length > 0) {
			hasUnsavedData = true;
		}
	})


	const customGridOptions: GridOptions = {
		getRowId: (params: GetRowIdParams) => {
			return String(params.data.pagePresetId);
		},

		columnDefs: [
			{
				field: "pagePresetName",
				editable: true,
				flex: 1,
			},
			{
				field: "select",
				pinned: "right",
				width: pageCompact.value ? 28 : 36,
				minWidth: pageCompact.value ? 28 : 36,
				cellRenderer: (params: ICellRendererParams) => selectButton(params, handleClickSelect),
			},
			{
				field: "delete",
				pinned: "right",
				width: pageCompact.value ? 28 : 36,
				minWidth: pageCompact.value ? 28 : 36,
				cellRenderer: (params: ICellRendererParams) => deleteButton(params, handleDelete),
			},
		],
	}


	async function getPresets() {
		const response = await apiServiceGETHandled("userpresets");

		if (response.success) {
			fetchedPresets = response.data.items;
			isLoading = false;
		}
	}


	function handleClickSelect(params: ICellRendererParams) {
		agGridTables.value[pageKey].selectedPreset = params.data;
		openedRibbonDialog.value = "empty";
	}


	async function saveChanges() {
		let hasFailed = false;

		for (const id of idsToDelete) {
			let response = await apiServiceDELETEHandled("userpresets", id);
			if (!response.success) hasFailed = true;
		}

		for (const preset of editedPresets) {
			let response = await apiServicePUTHandled(
				"userpresets",
				preset.pagePresetId,
				preset
			);
			if (!response.success) hasFailed = true;
		}

		if (!hasFailed) hasUnsavedData = false;
	}


	function handleDelete(params: ICellRendererParams) {
		fetchedPresets.forEach((filter, index) => {
			if (filter.pagePresetId === params.data.pagePresetId) {
				idsToDelete.push(params.data.pagePresetId)
				fetchedPresets.splice(index, 1);
				hasUnsavedData = true;
			}
		})
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
		{m.components_ribbon_dialog_my_presets_label()}

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
			{#if fetchedPresets.length > 0}
				<AgGridCSSecondaryWrapper
					rowData={fetchedPresets}
					requiredFields={["pagePresetId"]}
					bind:editedRowData={editedPresets}
					returnWholeRowOnEdit={true}
					headerTranslations={{}}
					gridOptionsCustom={customGridOptions}
					fullHeight={true}
					hiddenHeader={true}
				/>
			{:else }
				{m.components_ribbon_dialog_my_presets_no_instances_found()}
			{/if}
		{/if}
	</div>
{/snippet}



