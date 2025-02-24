<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from "$lib/components/ui/input";
	import Plus from "lucide-svelte/icons/plus";
	import deepcopy from "deepcopy";
	import type {
		InputDialogType,
		InputDialogSelectOption,
		ColumnFilter,
		ColumnFilterModelCondition
	} from "$lib/types/components/dialog/inputDialog";
	import InputDialogColumnFilterWrapper
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import {formatDateLong} from "$lib/utils/formatting/formatDateLong.js";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import Save from "lucide-svelte/icons/save";
	import SaveWithLabelDialog from "$lib/components/dialog/save/SaveWithLabelDialog.svelte";


	interface Props {
		open: boolean,
		defaultInputDialog: InputDialogType,
		selectOptions: InputDialogSelectOption[]
	}

	let {
		open = $bindable(),
		defaultInputDialog,
		selectOptions
	}: Props = $props();


	let inputDialog: InputDialogType = $state(defaultInputDialog);
	let fulltextFilter: string|null|undefined = $state(inputDialog.fulltext);
	let columnFilters = $state(inputDialog.columnFilters);


	let isSaveDialogOpen = $state(false);
	let saveLabel = $state("");

	function saveInputParams() {
		const inputsParamsToSave = {
			label: saveLabel,
			inputParams: {
				fulltext: fulltextFilter,
				columnFilters: getColumnFilters(),
			},
		}

		isSaveDialogOpen = false;
		saveLabel = "";

		console.log(JSON.stringify(inputsParamsToSave, null, 1));
	}


	function addInput() {
		if (columnFilters) {
			let lastIndex = 0;

			columnFilters.length > 0
				? lastIndex = columnFilters[columnFilters.length - 1].id || 0
				: lastIndex = 0;

			columnFilters.push({
				id: lastIndex + 1,
				columnName: null,
				type: "text",
				filterModel: {
					operator: null,
					conditions: [{
						type: null,
						value: null
					}]
				}
			})
		}
	}


	function getColumnFilters() {
		const cleanedColumnFilters: ColumnFilter[] = [];
		const currentColumnFilters = deepcopy(columnFilters);

		currentColumnFilters?.forEach((columnFilter) => {
			if (
				columnFilter.filterModel.conditions.length > 0 &&
				columnFilter.columnName !== null
			) {
				let cleanedConditions: ColumnFilterModelCondition[] = [];

				if (columnFilter.type === "text") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.value !== null &&
							condition.value !== ""
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "number") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.type !== "between" &&
							condition.value !== null
						) {
							cleanedConditions.push(condition);
						}

						if (
							condition.type === "between" &&
							condition.value &&
							condition.endValue
						) {
							cleanedConditions.push(condition);
						}
					})
				}

				if (columnFilter.type === "boolean") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (condition.type !== null) {
							const cleanCondition = condition;
							cleanCondition.value = condition.type === "true";
							cleanedConditions.push(cleanCondition);
						}
					})
				}

				if (columnFilter.type === "date") {
					columnFilter.filterModel.conditions.forEach((condition) => {
						if (
							condition.type !== null &&
							condition.type !== "between" &&
							condition.value
						) {
							condition.value = formatDateLong(condition.value);
							cleanedConditions.push(condition);
						}

						if (
							condition.type === "between" &&
							condition.value &&
							condition.endValue
						) {
							condition.value = formatDateLong(condition.value);
							condition.endValue = formatDateLong(condition.endValue);
							cleanedConditions.push(condition);
						}
					})
				}

				if (cleanedConditions.length > 0) {
					let cleanedColumnFilter = columnFilter;

					if (cleanedConditions.length === 1) {
						cleanedColumnFilter.filterModel.operator = null;
					}

					cleanedColumnFilter.filterModel.conditions = cleanedConditions;
					cleanedColumnFilters.push(cleanedColumnFilter);
				}
			}
		})

		cleanedColumnFilters.forEach((columnFilter) => {
			delete columnFilter.id
		})

		return cleanedColumnFilters;
	}


	function postInputParams() {
		let inputParamObj: InputDialogType = {
			fulltext: fulltextFilter,
			inputs: [],
			columnFilters: getColumnFilters(),
		}

		console.log(JSON.stringify(inputParamObj, null, 2));
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
	<Dialog.Title class="h-5">
		Vstupní parametry
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<div>
		{#if fulltextFilter !== undefined}
			<p
				class="mb-1 text-albi-500 text-sm font-bold"
			>
				Hledat všude
			</p>

			<Input
				type="text"
				bind:value={fulltextFilter}
				placeholder="Id, Název, Město, ..."
				class="border-border mb-4"
			/>
		{/if}


		{#if columnFilters !== undefined}
			<p
				class="text-albi-500 text-sm font-bold "
			>
				Hledat podle sloupce
			</p>

			{#each columnFilters as columnFilter, i (columnFilter.id)}
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
						bind:columnFilter={columnFilters[columnFilter.id]}
					/>
				</div>
			{/each}
		{/if}


		<Dialog.Footer class="w-full mt-6">
			<div class="w-full flex justify-between">
				<div class="flex gap-1.5 sm:gap-2">
					<Button
						type="button"
						class="size-10"
						variant="secondary"
						onclick={() => isSaveDialogOpen = true}
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
					>
						Načíst
					</Button>
				</div>

				<div class="flex items-center gap-1.5 sm:gap-2">
					<Button
						type="button"
						onclick={postInputParams}
					>
						Filtrovat
					</Button>

					{#if columnFilters !== undefined}
						<Button
							type="button"
							onclick={() => addInput()}
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



<SaveWithLabelDialog
	bind:isOpen={isSaveDialogOpen}
	bind:inputValue={saveLabel}
	onSubmit={saveInputParams}
	title="Uložit vstupní parametry"
	label="Název"
	saveButtonLabel="Uložit"
/>
