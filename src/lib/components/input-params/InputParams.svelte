<script lang="ts">
	import {isMobile, responseDialogMessages} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {Button} from '$lib/components/ui/button';
	import {Input} from "$lib/components/ui/input";
	import {apiServicePostHandled, apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import {getColumnFilters} from "$lib/utils/components/input-params/getColumnFilters";
	import {addColumnFilter} from "$lib/utils/components/input-params/addColumnFilter";
	import {setContext} from "svelte";
	import deepcopy from "deepcopy";
	import Pencil from "lucide-svelte/icons/pencil";
	import Check from "lucide-svelte/icons/check";
	import Plus from "lucide-svelte/icons/plus";
	import Save from "lucide-svelte/icons/save";
	import type {
		InputParamsType,
		InputParamsSelectOption,
		FetchedInputParam, InputParamsOptions
	} from "$lib/types/components/input-params/inputParams";
	import InputParamsSaveNewOrUpdateDialog from "$lib/components/input-params/InputParamsSaveNewOrUpdateDialog.svelte";
	import InputDialogColumnFilterWrapper
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterWrapper.svelte";
	import LoadInputParamsDialog from "$lib/components/input-params/LoadInputParamsDialog.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
	import CheckboxWrapper from "$lib/components/form/inputs/CheckboxWrapper.svelte";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import Upload from "lucide-svelte/icons/upload";


	interface Props {
		open: boolean,
		type: 'serverSide'|'clientSide',
		defaultInputDialog: InputParamsType,
		selectOptions: InputParamsOptions[]
	}

	let {
		open = $bindable(),
		type,
		defaultInputDialog,
		selectOptions
	}: Props = $props();


	setContext("endpoint", "userInputParameters");


	let table = agGridTables.value[currentPageKey.value];
	let inputDialog: InputParamsType = $state(defaultInputDialog);
	let isLoadDialogOpen = $state(false)
	let isSaveDialogOpen = $state(false);
	let saveLabel = $state("");
	let selectedParam: FetchedInputParam|undefined = $state();

	let editLabel = $state(false);
	let editedLabel = $state("");
	let isLoadedParamChanged = $derived.by(() => {
		if (JSON.stringify(inputDialog) !== JSON.stringify(selectedParam?.paramValue)) {
			return true
		}

		if (editedLabel.length > 0) {
			if (editedLabel !== selectedParam?.paramName) {
				return true;
			}
		}

		return false;
	});


	// api will keep track of input params, creating a smaller data set for
	// server side tables.
	async function loadInputParamsInTable() {
		table.areInputParamsLoading = true;
		table.hasInputParams = true;
		table.selectedRows = [];
		table.selectionState = null;
		table.lastVisibleRowIndex = 0;

		if (type === "clientSide") {
			if ("loadedInputParams" in table) {
				table.loadedInputParams = {
					fulltext: inputDialog.fulltext,
					inputs: inputDialog.inputs,
					columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
				}
			}

			table.areInputParamsLoading = false;
		}


		if (type === "serverSide") {
			open = false;

			const response = await apiServicePostHandled(
				"cachedPageData",
				{
					fulltext: inputDialog.fulltext,
					inputs: inputDialog.inputs,
					columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
				}
			)

			if (response.success) {
				table.areInputParamsLoading = false;
			}
		}
	}


	// save input params into db, user can load these later
	async function saveInputParam() {
		let response = await apiServicePostHandled(
			"userInputParameters",
			{
				paramName: saveLabel,
				paramValue: {
					fulltext: deepcopy(inputDialog.fulltext),
					inputs: deepcopy(inputDialog.inputs),
					columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
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
		inputDialog = deepcopy(inputParam.paramValue);
		selectedParam = deepcopy(inputParam);
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
						fulltext: inputDialog.fulltext,
						columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
					},
				}
			)

			if (response.success) {
				selectedParam = {
					paramId: selectedParam.paramId,
					paramName: editedLabel.length > 0 ? editedLabel : selectedParam.paramName,
					paramValue: {
						fulltext: inputDialog.fulltext,
						columnFilters: getColumnFilters(deepcopy(inputDialog.columnFilters)),
					},
				}

				isSaveDialogOpen = false;
			}
		}
	}
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
		class="min-h-5 overflow-visible flex gap-1 items-center"
	>
		{ m.components_input_params_label() }

		{#if selectedParam}
			{#if !editLabel}
				<div
					class={`${isMobile.value ? "hidden" : "flex"} gap-2 items-center`}
				>
					<p
						class={`${isLoadedParamChanged ? "text-slate-300" : "text-albi-950"} transition-all`}
					>
						({editedLabel.length > 0 ? editedLabel : selectedParam.paramName})
					</p>

					<button
						onclick={() => editLabel = !editLabel}
					>
						<Pencil
							strokeWidth={2.5}
							class="size-4 text-albi-500"
						/>
					</button>
				</div>
			{:else}
				<div
					class={`${isMobile.value ? "hidden" : "flex"} gap-2 items-center`}
				>
					<input
						onblur={(e: FocusEvent) => editLabel = !editLabel}
						onkeyup={(e: KeyboardEvent) => {
							if (e.key === 'Enter') {
							  e.preventDefault();
							  e.currentTarget?.blur();  // Safer than target (guaranteed to be input element)
							}
						 }}
						bind:value={editedLabel}
						class="w-fit py-1 px-1 h-[20px] border bg-slate-50 rounded-md"
					/>
				</div>

				<button onclick={() => editLabel = !editLabel}>
					<Check
						strokeWidth={3}
						class="size-4 text-albi-500"
					/>
				</button>
			{/if}
		{/if}
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div class="overflow-auto pb-2">
		{#if inputDialog.fulltext !== undefined}
			<p class="mb-2 text-albi-500 text-sm font-bold">
				{m.components_input_params_section_fulltext()}
			</p>

			<Input
				type="text"
				bind:value={inputDialog.fulltext}
				placeholder={m.components_input_params_fulltext_placeholder()}
				class="border-slate-300 mb-4"
			/>
		{/if}


		{#if inputDialog.inputs !== undefined}
			<p class="mb-2 text-albi-500 text-sm font-bold">
				Hledat podle parametrů
			</p>

			<div class="mb-4">
				{#if defaultInputDialog?.inputs}
					{#each defaultInputDialog.inputs as paramInput, i}
						{#if paramInput.type === "boolean"}
							<div class="flex items-center gap-2">
								<Checkbox
									class={"focus-visible:border-albi-500"}
									bind:checked={inputDialog.inputs[i].value}
								/>

								<InputLabelWithContext
									contextMenuField={paramInput.field}
									label={paramInput.label()}
								/>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		{/if}

		{#if inputDialog.columnFilters !== undefined}
			<p class="text-albi-500 text-sm font-bold">
				{ m.components_input_params_section_columns() }
			</p>

			<div class="flex flex-col gap-2 mt-2">

				{#each inputDialog.columnFilters as columnFilter, i}
					<div
						class={
						columnFilter.filterModel.conditions.length > 1
							? "rounded-lg border bg-slate-50 p-2 pt-0 flex flex-col mt-1.5  "
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

				<div class="ml-auto w-full flex gap-3 h-10">
					{#if inputDialog.columnFilters !== undefined}
						<Button
							type="button"
							onclick={() => {
								addColumnFilter(inputDialog)
							}}
							class="size-10"
							variant="secondary"
						>
							<Plus strokeWidth={3} />
						</Button>
					{/if}
				</div>
			</div>
		{/if}


		<Dialog.Footer class="w-full mt-6">
			<div class="w-full flex justify-between">
				<div>
					<div class="flex gap-1.5 sm:gap-2">
						<Button
							type="button"
							class="size-10"
							variant="secondary"
							onclick={() => {
							if (
								JSON.stringify(defaultInputDialog) === JSON.stringify(inputDialog) ||
								!isLoadedParamChanged
							) {
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
							class="bg-white size-10"
							variant="secondary"
							onclick={() => isLoadDialogOpen = true}
						>
							<!--{m.components_input_params_button_load_input_params()}-->
							<Upload
								strokeWidth="2.5"
								class="!size-[18px]"
							/>
						</Button>
					</div>
				</div>



				<div class="flex items-center gap-1.5 sm:gap-2">
					<Button
						type="button"
						onclick={loadInputParamsInTable}
					>
						{m.components_input_params_button_filter()}
					</Button>
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
