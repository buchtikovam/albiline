<script lang="ts">
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte.js";
	import {getContext} from "svelte";
	import {
		apiServiceDELETEHandled,
		apiServiceGETHandled,
		apiServicePUTHandled
	} from "$lib/api/apiService.svelte.js";
	import {
		inputParamsCustomGridOptions
	} from "$lib/definitions/components/input-params/ag-grid/inputParamsAgGridDef";
	import Save from "lucide-svelte/icons/save";
	import type {FetchedInputParam, FetchedInputParamsType} from "$lib/types/components/input-params/inputParams";
	import type {
		ICellRendererParams
	} from "ag-grid-community";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import TableSkeletonSmall from "$lib/components/skeleton/TableSkeletonSmall.svelte";

	interface Props {
		isOpen: boolean;
		onchange: (selectedParams: FetchedInputParam) => void;
	}

	let {
		isOpen = $bindable(),
		onchange // callback from parent component to handle selected input param change
	}: Props = $props();


	let hasUnsavedData = $state(false);
	let fetchedInputParams: FetchedInputParamsType = $state([]);
	let idsToDelete: number[] = $state([]);
	let endpoint: string = getContext("endpoint");
	let updatedInputParams: FetchedInputParamsType = $state([]);
	let isLoading = $state(true);


	// fetch input parameters on dialog open
	$effect(() => {
		if (isOpen) getUserInputParams();

		return (() => {
			idsToDelete = [];
			updatedInputParams = [];
		})
	})


	// show/hide save button based on user interactions
	$effect(() => {
		idsToDelete.length > 0 || updatedInputParams.length > 0
			? hasUnsavedData = true
			: hasUnsavedData = false;
	})


	async function getUserInputParams() {
		isLoading = true;
		let response = await apiServiceGETHandled(endpoint);

		if (response.success) {
			fetchedInputParams = response.data.items;
			isLoading = false;
		}
	}


	function loadInputParam(params: ICellRendererParams) {
		onchange(params.data);
		isOpen = false;
	}


	function handleDelete(params: ICellRendererParams) {
		fetchedInputParams.forEach((filter, index) => {
			if (filter.paramId === params.data.paramId) {
				idsToDelete.push(params.data.paramId);
				// hide input param visually
				fetchedInputParams.splice(index, 1);
			}
		})
	}


	async function saveChanges() {
		let hasFailed = false;

		for (const id of idsToDelete) {
			const response = await apiServiceDELETEHandled(endpoint, id);
			if (!response.success) hasFailed = true;
		}

		for (const param of updatedInputParams) {
			const response = await apiServicePUTHandled(endpoint, param.paramId, param);
			if (!response.success) hasFailed = true;
		}

		if (!hasFailed) {
			idsToDelete = [];
			updatedInputParams = [];
		}
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
		{m.components_input_params_load_dialog_label()}

		{#if hasUnsavedData}
			<button onclick={() => saveChanges()}>
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
			{#if fetchedInputParams.length > 0}
				<AgGridCSSecondaryWrapper
					rowData={fetchedInputParams}
					requiredFields={["paramId"]}
					returnWholeRowOnEdit={true}
					bind:editedRowData={updatedInputParams}
					gridOptionsCustom={inputParamsCustomGridOptions(handleDelete, loadInputParam)}
					fullHeight={true}
					headerTranslations={{}}
					hiddenHeader={true}
				/>
			{:else }
				{m.components_input_params_load_dialog_no_instances_found()}
			{/if}
		{/if}
	</div>
{/snippet}



