<script lang="ts">
	import {responseDialogMessages} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {Button} from '$lib/components/ui/button';
	import {Input} from "$lib/components/ui/input";
	import {apiServicePostHandled, apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import {getColumnFilters} from "$lib/utils/components/input-params/getColumnFilters";
	import {addColumnFilter} from "$lib/utils/components/input-params/addColumnFilter";
	import {setContext} from "svelte";
	import deepcopy from "deepcopy";
	import Plus from "lucide-svelte/icons/plus";
	import Save from "lucide-svelte/icons/save";
	import type {
		InputParamsType,
		InputParamsSelectOption,
		FetchedInputParam
	} from "$lib/types/components/input-params/inputParams";
	import InputParamsSaveNewOrUpdateDialog from "$lib/components/input-params/InputParamsSaveNewOrUpdateDialog.svelte";
	import InputDialogColumnFilterWrapper
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterWrapper.svelte";
	import LoadInputParamsDialog from "$lib/components/input-params/LoadInputParamsDialog.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";


	interface Props {
		open: boolean,
		defaultInputDialog: InputParamsType,
		selectOptions: InputParamsSelectOption[]
	}

	let {
		open = $bindable(),
		defaultInputDialog,
		selectOptions
	}: Props = $props();


	setContext("endpoint", "userInputParameters");

	let inputDialog: InputParamsType = $state(defaultInputDialog);
	let isLoadDialogOpen = $state(false)
	let isSaveDialogOpen = $state(false);
	let saveLabel = $state("");
	let selectedParam: FetchedInputParam|undefined = $state();
	let isLoadedParamChanged = $derived(JSON.stringify(inputDialog) !== JSON.stringify(selectedParam?.paramValue))



	// api will keep track of input params, creating a smaller data set for
	// server side tables.
	function loadInputParamsInTable() {
		// let inputParamObj: InputParamsType = {
		// 	fulltext: inputDialog.fulltext,
		// 	inputs: [],
		// 	columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
		// }
	}


	// save input params into db, user can load these later
	async function saveInputParam() {
		let response = await apiServicePostHandled(
			"userInputParameters",
			{
				paramName: saveLabel,
				paramValue: {
					fulltext: inputDialog.fulltext,
					columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
				},
			}
		);

		if (response.success) {
			isSaveDialogOpen = false;
			saveLabel = "";

			setTimeout(() => {
				openedRibbonDialog.value = "empty";
			}, 200)
		}
	}


	// load selected input param into InputParam component
	function onParamSelect(inputParam: FetchedInputParam) {
		inputDialog = deepcopy(inputParam.paramValue);
		selectedParam = inputParam;
	}



	async function updateInputParam() {
		if (selectedParam) {
			const response = await apiServicePUTHandled(
				"userInputParameters",
				selectedParam.paramId,
				{
					paramId: selectedParam.paramId,
					paramName: selectedParam.paramName,
					paramValue: {
						fulltext: inputDialog.fulltext,
						columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
					},
				}
			)

			console.log(response.success)
		}
	}
</script>




<DialogWrapper
	bind:isOpen={open}
	{header}
	{content}
	size="md"
	fixedHeight={false}
/>


{#snippet header()}
	<Dialog.Title
		class="min-h-5 overflow-visible flex gap-1"
	>
		{ m.components_input_params_label() }

		{#if selectedParam}
			<p
				class={`${isLoadedParamChanged ? "text-slate-300" : "text-albi-950"} transition-all`}
			>
				({selectedParam.paramName})
			</p>
		{/if}
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div class="overflow-auto pb-2">
		{#if inputDialog.fulltext !== undefined}
			<p
				class="mb-1 text-albi-500 text-sm font-bold"
			>
				{ m.components_input_params_section_fulltext() }
			</p>

			<Input
				type="text"
				bind:value={inputDialog.fulltext}
				placeholder={m.components_input_params_fulltext_placeholder()}
				class="border-border mb-4"
			/>
		{/if}


		{#if inputDialog.columnFilters !== undefined}
			<p
				class="text-albi-500 text-sm font-bold "
			>
				{ m.components_input_params_section_columns() }
			</p>

			{#each inputDialog.columnFilters as columnFilter, i}
				<div
					class={
						columnFilter.filterModel.conditions.length > 1
							? "rounded-lg border bg-slate-50 p-2 pt-0 sm:pt-2 flex flex-col mt-1.5 sm:mt-2 "
							: "bg-white p-0"
					}
				>
					{#if columnFilter.filterModel.conditions.length > 1}
						<p class="hidden sm:block text-xs font-bold text-slate-400">
							{columnFilter.filterModel.operator}
						</p>
					{/if}

					<InputDialogColumnFilterWrapper
						selectOptions={selectOptions}
						bind:columnFilter={inputDialog.columnFilters[i]}
					/>
				</div>
			{/each}
		{/if}


		<Dialog.Footer
			class="w-full mt-6"
		>
			<div
				class="w-full flex justify-between"
			>
				<div
					class="flex gap-1.5 sm:gap-2"
				>
					<Button
						type="button"
						class="size-10"
						variant="secondary"
						onclick={() => {
							if (JSON.stringify(defaultInputDialog) === JSON.stringify(inputDialog)) {
								responseDialogMessages.value = [{
									type: "InfoToast",
									title: m.components_input_params_save_fail_info_toast_title(),
									content: m.components_input_params_save_fail_info_toast_content(),
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

					<Button
						type="button"
						class="bg-white"
						variant="secondary"
						onclick={() => isLoadDialogOpen = true}
					>
						{m.components_input_params_button_load_input_params()}
					</Button>
				</div>

				<div
					class="flex items-center gap-1.5 sm:gap-2"
				>
					<Button
						type="button"
						onclick={loadInputParamsInTable}
					>
						{m.components_input_params_button_filter()}
					</Button>

					{#if inputDialog.columnFilters !== undefined}
						<Button
							type="button"
							onclick={() => addColumnFilter(inputDialog)}
							class="size-10"
							variant="secondary"
						>
							<Plus strokeWidth={3} />
						</Button>
					{/if}
				</div>
			</div>
		</Dialog.Footer>
	</div>
{/snippet}



<InputParamsSaveNewOrUpdateDialog
	bind:isOpen={isSaveDialogOpen}
	bind:inputValue={saveLabel}
	onsubmit={saveInputParam}
	onupdate={updateInputParam}
	selectedParam={selectedParam}
	hasEditedData={isLoadedParamChanged}
/>


<LoadInputParamsDialog
	bind:isOpen={isLoadDialogOpen}
	onchange={onParamSelect}
/>
