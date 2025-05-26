<script lang="ts">
	import {pageKeys, agGridTables} from "$lib/runes/table.svelte";
	import {responseDialogMessages} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {isEqual} from "lodash-es";
	import {Button} from "$lib/components/ui/button";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {cleanUpColumnFilters} from "$lib/utils/components/input-params/cleanUpColumnFilters";
	import {apiServicePostHandled, apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import {getColumnFilters} from "$lib/utils/components/input-params/getColumnFilters";
	import {setContext} from "svelte";
	import deepcopy from "deepcopy";
	import Trash2 from "lucide-svelte/icons/trash-2";
	import Upload from "lucide-svelte/icons/upload";
	import Save from "lucide-svelte/icons/save";
	import type {
		InputParamsType,
		FetchedInputParam,
		InputParamsOptions, InputParamsInput, ColumnFilter,
	} from "$lib/types/components/input-params/inputParams";
	import type {PageMetaDataInputs} from "$lib/types/routes/pageSettings";
	import InputParamsSaveNewOrUpdateDialog from "$lib/components/input-params/dialogs/InputParamsSaveNewOrUpdateDialog.svelte";
	import InputParamsColumnFilter from "$lib/components/input-params/sections/InputParamsColumnFilter.svelte";
	import LoadInputParamsDialog from "$lib/components/input-params/dialogs/LoadInputParamsDialog.svelte";
	import InputParamsFulltext from "$lib/components/input-params/sections/InputParamsFulltext.svelte";
	import InputParamsInputs from "$lib/components/input-params/sections/InputParamsInputs.svelte";
	import InputParamsHeader from "$lib/components/input-params/sections/InputParamsHeader.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";


	interface Props {
		open: boolean,
		type: 'serverSide'|'clientSide',
		defaultInputParams: InputParamsType,
		selectOptions: InputParamsOptions[],
		restrictions?: PageMetaDataInputs,
	}

	let {
		open = $bindable(),
		type,
		defaultInputParams,
		selectOptions,
		restrictions = {
			fulltextEnabled: true,
			columnFiltersEnabled: true
		},
	}: Props = $props();


	setContext("endpoint", "userInputParameters");


	let table = agGridTables.value[pageKeys.value.value[pageKeys.value.index]];
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
			let loaded = deepcopy(table.loadedInputParams);

			if (loaded) {
				if (loaded.columnFilters) {
					if (loaded.columnFilters.length > 0) {
						loaded.columnFilters.forEach((filter, index) => {
							filter["id"] = index
						})
					}
				}
			}

			inputParams = deepcopy(loaded);
		}
	});


	$inspect(JSON.stringify(inputParams, null, 1))

	// load selected input param into InputParam component
	function onParamSelect(inputParam: FetchedInputParam) {
		selectedParam = deepcopy(inputParam);
		inputParams = deepcopy(inputParam.paramValue);
		editedLabel = inputParam.paramName;
	}


	function handleFulltextUpdate(fulltextValue: string|null)  {
		inputParams.fulltext = fulltextValue;
	}


	function handleInputsUpdate(updatedInputs: InputParamsInput[]) {
		inputParams = {
			...inputParams,
			inputs: deepcopy(updatedInputs)
		};
	}

	$effect(() => {
		const currentColumnFilters = inputParams.columnFilters;
		if (!currentColumnFilters) return;

		const cleaned = cleanUpColumnFilters(deepcopy(inputParams));
		if (!isEqual(cleaned, inputParams)) {
			inputParams = cleaned;
		}
	})


	async function saveInputParam() {
		let response = await apiServicePostHandled(
			"userInputParameters",
			{
				paramName: saveLabel,
				paramValue: {
					fulltext: inputParams.fulltext,
					inputs: inputParams.inputs,
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
						inputs: inputParams.inputs,
						columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
					},
				}
			)

			if (response.success) {
				console.log(await response.data)

				selectedParam = {
					paramId: selectedParam.paramId,
					paramName: editedLabel.length > 0 ? editedLabel : selectedParam.paramName,
					paramValue: {
						fulltext: inputParams.fulltext,
						inputs: inputParams.inputs,
						columnFilters: getColumnFilters(deepcopy(inputParams.columnFilters)),
					},
				}

				isSaveDialogOpen = false;
			}
		}
	}


	function handleColumnFilterChange(newColumnFilters: ColumnFilter[]) {
		inputParams.columnFilters = newColumnFilters;
	}


	function addColumnFilter() {
		// Create new array instead of mutating existing one
		const newFilters = inputParams.columnFilters ? [...inputParams.columnFilters] : [];

		// Generate ID safely
		const lastId = newFilters.length > 0
			? Math.max(...newFilters.map(f => f.id))
			: 0;

		// Create new filter object
		const newFilter: ColumnFilter = {
			id: lastId + 1,
			columnName: null,
			type: "text",
			filterModel: {
				operator: null,
				conditions: [{
					type: null,
					value: null
				}]
			}
		};

		// Update state immutably
		inputParams = {
			...inputParams,
			columnFilters: [...newFilters, newFilter]
		};
	}
</script>




<DialogWrapper
	bind:isOpen={open}
	onChange={() => {
		table.areInputParamsLoading = false;
		table.openInputParams = false;
	}}
	{header}
	{content}
	size="md"
	fixedHeight={false}
/>


{#snippet header()}
	<Dialog.Title
		class="h-5 overflow-visible flex gap-2 items-center justify-between"
	>
		<InputParamsHeader
			{selectedParam}
			bind:editedLabel
			{isLoadedParamChanged}
		/>

	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div class="overflow-auto pb-2">
		<div class="mb-10">
			{#if inputParams.fulltext !== undefined && restrictions.fulltextEnabled}
				<InputParamsFulltext
					fulltext={inputParams.fulltext}
					handleFulltextChange={handleFulltextUpdate}
				/>
			{/if}



			{#if inputParams.inputs !== undefined}
				<InputParamsInputs
					initialInputs={defaultInputParams.inputs || []}
					inputs={inputParams.inputs}
					onInputsChange={handleInputsUpdate}
				/>
			{/if}


			{#if inputParams.columnFilters !== undefined && restrictions.columnFiltersEnabled}
				<InputParamsColumnFilter
					columnFilters={inputParams.columnFilters}
					addFilter={() => addColumnFilter()}
					onFilterChange={handleColumnFilterChange}
					{selectOptions}
				/>
			{/if}
		</div>



		<div class="flex w-full -ml-6 px-6 justify-between absolute bottom-0 bg-white pb-4 pt-3">
			<div class="flex gap-1.5 sm:gap-2">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							type="button"
							class="size-10"
							variant="secondary"
							onclick={() => {
								if (isEqual(defaultInputParams, inputParams) || !isLoadedParamChanged) {
									responseDialogMessages.value = [{
										type: "InfoToast",
										title: m.components_input_params_save_fail_info_toast_title(),
										content: m.components_input_params_save_fail_info_toast_content()
									}]
								} else {
									isSaveDialogOpen = true;
								}
							}}
						>
							<Save
								strokeWidth="2.5"
								class="!size-[18px]"
							/>
						</Button>
					</Tooltip.Trigger>

					<Tooltip.Content>
						Uložit
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							type="button"
							class="bg-white size-10"
							variant="secondary"
							onclick={() => isLoadDialogOpen = true}
						>
							<Upload
								strokeWidth="2.5"
								class="!size-[18px]"
							/>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						Načíst uložené
					</Tooltip.Content>
				</Tooltip.Root>

				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							type="button"
							variant="secondary"
							class={`${isEqual(defaultInputParams, inputParams) ? "hidden" : ""} size-10`}
							onclick={() => {
							inputParams = defaultInputParams;
							selectedParam = undefined;
							editedLabel = "";
						}}
						>
							<Trash2 class="!size-[18px]"/>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						Resetovat
					</Tooltip.Content>
				</Tooltip.Root>
			</div>



			<div class="flex items-center gap-1.5 sm:gap-2">
				<Button
					type="button"
					onclick={() => {
						loadInputParamsInTable(
							table,
							inputParams,
							type,
							restrictions
						);

						open = false;
					}}
				>
					{m.components_input_params_button_filter()}
				</Button>
			</div>
		</div>
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
