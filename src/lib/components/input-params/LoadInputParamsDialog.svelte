<script lang="ts">
	import {pageCompact} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {apiServiceGET} from "$lib/api/apiService.svelte";
	import {invalidateAll} from "$app/navigation";
	import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte";
	import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";
	import Save from "lucide-svelte/icons/save";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {FetchedInputParam, FetchedInputParamsType} from "$lib/types/components/input-params/inputParams";
	import type {
		ICellRendererParams
	} from "ag-grid-community";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';


	interface Props {
		isOpen: boolean;
		onchange: (selectedParams: FetchedInputParam) => void;
	}

	let {
		isOpen = $bindable(),
		onchange
	}: Props = $props();


	let hasUnsavedData = $state(false);
	let fetchedInputParams: FetchedInputParamsType = $state([]);


	$effect(() => {
		if (isOpen) getInputParams()
	})


	async function getInputParams() {
		const resp = await apiServiceGET("userInputParameters");

		if (resp.ok) {
			const respItems = await resp.json();
			console.log(respItems)

			fetchedInputParams = respItems.items;
		}
	}


	export const inputParamsAgGridDef: ColDef[] = [
		{
			field: "paramName",
			editable: true,
			flex: 1,
		},
		{
			field: "select",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => selectButton(params, loadInputParam),
		},
		{
			field: "delete",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => deleteButton(params, handleDelete),
		},
	]


	const customGridOptions: GridOptions = {
		columnDefs: inputParamsAgGridDef,

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.paramId);
		},
	}


	function loadInputParam(params: ICellRendererParams) {
		onchange(params.data);
		isOpen = false;
	}


	function handleDelete(params: ICellRendererParams) {
		fetchedInputParams.forEach((filter, index) => {
			if (filter.paramId === params.data.paramId) {
				fetchedInputParams.splice(index, 1);
				hasUnsavedData = true;
				invalidateAll();
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
		Uložené vstupní parametry

		{#if hasUnsavedData}
			<button
				onclick={() => hasUnsavedData = false}
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
		{#if fetchedInputParams.length > 0}
			<AgGridCSWrapper
				rowData={fetchedInputParams}
				gridOptionsCustom={customGridOptions}
				fullHeight={true}
				hiddenHeader={true}
			/>
		{:else }
			Nemáš žádné uložené vstupní parametry
		{/if}
	</div>
{/snippet}



