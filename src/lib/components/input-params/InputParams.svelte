<script lang="ts">
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {isEqual} from "lodash-es";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {cleanUpColumnFilters} from "$lib/utils/components/input-params/cleanUpColumnFilters";
	import {apiServicePostHandled, apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import {getColumnFilters} from "$lib/utils/components/input-params/getColumnFilters";
	import {setContext} from "svelte";
	import deepcopy from "deepcopy";
	import type {
		InputParamsType,
		FetchedInputParam,
		InputParamsOptions, InputParamsInput,
	} from "$lib/types/components/input-params/inputParams";
	import InputParamsSaveNewOrUpdateDialog from "$lib/components/input-params/dialogs/InputParamsSaveNewOrUpdateDialog.svelte";
	import LoadInputParamsDialog from "$lib/components/input-params/dialogs/LoadInputParamsDialog.svelte";
	import InputParamsColumnFilter from "$lib/components/input-params/sections/InputParamsColumnFilter.svelte";
	import InputParamsFulltext from "$lib/components/input-params/sections/InputParamsFulltext.svelte";
	import InputParamsInputs from "$lib/components/input-params/sections/InputParamsInputs.svelte";
	import InputParamsHeader from "$lib/components/input-params/sections/InputParamsHeader.svelte";
	import InputParamsFooter from "$lib/components/input-params/sections/InputParamsFooter.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";


	interface Props {
		open: boolean,
		type: 'serverSide'|'clientSide',
		defaultInputParams: InputParamsType,
		selectOptions: InputParamsOptions[]
	}

	let {
		open = $bindable(),
		type,
		defaultInputParams,
		selectOptions
	}: Props = $props();


	setContext("endpoint", "userInputParameters");


	let table = agGridTables.value[currentPageKey.value];
	let inputParams: InputParamsType = $state(defaultInputParams);
	let isLoadDialogOpen = $state(false)
	let isSaveDialogOpen = $state(false);
	let saveLabel = $state("");
	let editedLabel = $state("");
	let selectedParam: FetchedInputParam|undefined = $state();
	let isLoadedParamChanged = $derived.by(() => {
		if (JSON.stringify(inputParams) !== JSON.stringify(selectedParam?.paramValue)) {
			return true
		}

		if (editedLabel.length > 0) {
			if (editedLabel !== selectedParam?.paramName) {
				return true;
			}
		}

		return false;
	});


	$effect(() => {
		if (Object.keys(table.loadedInputParams).length > 0) {
			inputParams = table.loadedInputParams;
		}
	});



	async function saveInputParam() {
		let response = await apiServicePostHandled(
			"userInputParameters",
			{
				paramName: saveLabel,
				paramValue: {
					fulltext: deepcopy(inputParams.fulltext),
					inputs: deepcopy(inputParams.inputs),
					columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
				},
			}
		);

		if (response.success) {
			isSaveDialogOpen = false;

			selectedParam = await response.data;
			editedLabel = saveLabel;
			saveLabel = "";

			setTimeout(() => {
				openedRibbonDialog.value = "empty";
			}, 200)
		}
	}


	// load selected input param into InputParam component
	function onParamSelect(inputParam: FetchedInputParam) {
		selectedParam = deepcopy(inputParam);
		defaultInputParams = deepcopy(inputParam.paramValue); // TODO: remove, make initial
		inputParams = deepcopy(inputParam.paramValue);
		editedLabel = inputParam.paramName;
	}


	async function updateInputParam() {
		if (selectedParam) {
			const response = await apiServicePUTHandled(
				"userInputParameters",
				selectedParam.paramId,
				{
					paramId: selectedParam.paramId,
					paramName: editedLabel.length > 0 ? editedLabel : selectedParam.paramName,
					paramValue: {
						fulltext: inputParams.fulltext,
						columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
					},
				}
			)

			if (response.success) {
				selectedParam = {
					paramId: selectedParam.paramId,
					paramName: editedLabel.length > 0 ? editedLabel : selectedParam.paramName,
					paramValue: {
						fulltext: inputParams.fulltext,
						columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
					},
				}

				isSaveDialogOpen = false;
			}
		}
	}


	function handleFulltextUpdate(fulltextValue: string|null) {
		inputParams.fulltext = fulltextValue;
	}

	$inspect(inputParams.inputs)

	function handleInputUpdate(paramInputs: InputParamsInput[]) {
		if (inputParams.inputs) {
			inputParams.inputs = paramInputs;
		}
	}


	$effect(() => {
		const currentColumnFilters = inputParams.columnFilters;
		if (!currentColumnFilters) return;

		const cleaned = cleanUpColumnFilters(deepcopy(inputParams));
		if (!isEqual(cleaned, inputParams)) {
			inputParams = cleaned;
		}
	})

	//
	// $effect(() => {
	// 	if (selectedParam) {
	// 		// if (selectedParam.paramValue) inputParams = selectedParam.paramValue;
	// 	}
	// })
</script>




<DialogWrapper
	bind:isOpen={open}
	onChange={() => {
		table.areInputParamsLoading = false;
	}}
	{header}
	{content}
	size="md"
	fixedHeight={false}
/>


{#snippet header()}
	<Dialog.Title
		class="min-h-5 overflow-visible flex gap-2 items-center"
	>
		<InputParamsHeader
			{selectedParam}
			{editedLabel}
			{isLoadedParamChanged}
		/>
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div class="overflow-auto pb-2">
		{#if inputParams.fulltext !== undefined}
			<InputParamsFulltext
				fulltext={inputParams.fulltext}
				handleFulltextChange={handleFulltextUpdate}
			/>
		{/if}


		{#if inputParams.inputs !== undefined}
			<InputParamsInputs
				{defaultInputParams}
				handleInputsUpdate={handleInputUpdate}
			/>
		{/if}


		{#if inputParams.columnFilters !== undefined}
			<InputParamsColumnFilter
				bind:inputParams
				{selectOptions}
			/>
		{/if}



		<InputParamsFooter
			{defaultInputParams}
			{inputParams}
			{isLoadedParamChanged}
			bind:isSaveDialogOpen
			bind:isLoadDialogOpen
			loadInputParamsInTable={() => loadInputParamsInTable(table, inputParams, type)}
		/>
	</div>
{/snippet}



<InputParamsSaveNewOrUpdateDialog
	bind:isOpen={isSaveDialogOpen}
	bind:inputValue={saveLabel}
	onsubmit={saveInputParam}
	onupdate={updateInputParam}
	{selectedParam}
	hasEditedData={isLoadedParamChanged}
/>



<LoadInputParamsDialog
	bind:isOpen={isLoadDialogOpen}
	onchange={onParamSelect}
/>
