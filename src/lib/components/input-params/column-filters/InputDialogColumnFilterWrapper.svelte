<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import type {
		ColumnFilter, InputParamsOptions,
		InputParamsSelectOption
	} from "$lib/types/components/input-params/inputParams";
	import InputDialogColumnFilterActionButtons
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterActionButtons.svelte";
	import InputDialogColumnFilterFieldSelect
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterFieldSelect.svelte";
	import InputDialogOperatorSelect from "$lib/components/input-params/column-filters/InputDialogOperatorSelect.svelte";

	import ColumnFilterTypeNumber from "$lib/components/input-params/column-filters/ColumnFilterTypeNumber.svelte";
	import {isMobile} from "$lib/runes/page.svelte.js";
	import ColumnFilterTypeEnum from "$lib/components/input-params/column-filters/ColumnFilterTypeEnum.svelte";
	import deepcopy from "deepcopy";
	import ColumnFilterTypeDate from "$lib/components/input-params/column-filters/ColumnFilterTypeDate.svelte";


	interface Props {
		selectOptions: InputParamsOptions[];
		onFilterChange: (updatedColumnFilter: ColumnFilter) => void;
		columnFilter: ColumnFilter;
	}

	let {
		selectOptions,
		onFilterChange,
		columnFilter
	}: Props = $props();


	let currentColumnFilter = $state(deepcopy(columnFilter));
	let dropdownOptions: string[]|undefined = $state();
	let asyncDropdownOptions: (() => Promise<string[]>)|undefined = $state();


	$effect(() => {
		if (columnFilter) {
			currentColumnFilter = deepcopy(columnFilter);
		}
	})
</script>




{#each currentColumnFilter.filterModel.conditions as condition, i (i)}
	<div
		class={`w-full sm:h-10 flex flex-col sm:flex-row gap-0.5 sm:gap-0.5 mb-2`}
	>
		<div class="w-full">
			{#if isMobile.value && i < 1}
				<div class="flex justify-between">
					<InputDialogColumnFilterFieldSelect
						bind:columnFilter={currentColumnFilter}
						selectOptions={selectOptions}
						onChange={() => onFilterChange(currentColumnFilter)}
						bind:asyncDropdownOptions
						bind:dropdownOptions
					/>

					{#if currentColumnFilter.filterModel.operator}
						<p class="text-xs text-slate-300 font-bold">
							Operator: {currentColumnFilter.filterModel.operator}
						</p>
					{/if}
				</div>
			{/if}

			{#if !isMobile.value}
				<InputDialogColumnFilterFieldSelect
					bind:columnFilter={currentColumnFilter}
					selectOptions={selectOptions}
					onChange={() => onFilterChange(currentColumnFilter)}
					bind:asyncDropdownOptions
					bind:dropdownOptions
				/>
			{/if}
		</div>


		{#if !isMobile.value}
			<ChevronRight
				strokeWidth={3}
				class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
			/>


			<div class="min-w-10">
				<InputDialogOperatorSelect
					disabled={currentColumnFilter.columnName === null}
					columnFilter={currentColumnFilter}
					condition={condition}
					onOperatorChange={(newCondition) => {
						const updatedFilter = deepcopy(currentColumnFilter);
						updatedFilter.filterModel.conditions[i] = newCondition;
						onFilterChange(updatedFilter);
					}}
				/>
			</div>


			<ChevronRight
				strokeWidth={3}
				class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
			/>


			<div class="w-full mr-1">
				{#if currentColumnFilter.type === "text"}
					<div class="w-full">
						<Input
							bind:value={condition.value}
							oninput={() => onFilterChange(currentColumnFilter)}
							type="text"
							required
						/>
					</div>
				{/if}


				{#if currentColumnFilter.type === "number"}
					<div class="w-full">
						<ColumnFilterTypeNumber
							bind:condition={currentColumnFilter.filterModel.conditions[i]}
							columnFilter={currentColumnFilter}
							onchange={() => onFilterChange(currentColumnFilter)}
						/>
					</div>
				{/if}


				{#if currentColumnFilter.type === "boolean"}
					<div class="w-full">
						<Input
							class="hover:cursor-not-allowed"
							disabled
						/>
					</div>
				{/if}


				{#if currentColumnFilter.type === "date"}
					<ColumnFilterTypeDate
						bind:condition={currentColumnFilter.filterModel.conditions[i]}
						columnFilter={currentColumnFilter}
						onchange={() => onFilterChange(currentColumnFilter)}
					/>
				{/if}


				{#if currentColumnFilter.type === "enum"}
					<div class="w-full">
						<ColumnFilterTypeEnum
							bind:value={condition.value}
							dropdownOptions={dropdownOptions}
							onchange={() => onFilterChange(currentColumnFilter)}
							asyncDropdownOptions={asyncDropdownOptions}
						/>
					</div>
				{/if}
			</div>


			<InputDialogColumnFilterActionButtons
				columnFilter={currentColumnFilter}
				index={i}
				{onFilterChange}
			/>
		{:else}
			<div class="flex gap-1.5">
				<div class="min-w-10">
					<InputDialogOperatorSelect
						disabled={currentColumnFilter.columnName === null}
						columnFilter={currentColumnFilter}
						condition={condition}
						onOperatorChange={(newCondition) => {
							const updatedFilter = deepcopy(currentColumnFilter);
							updatedFilter.filterModel.conditions[i] = newCondition;
							onFilterChange(updatedFilter);
						}}
					/>
				</div>


				<div class="w-full flex">
					{#if currentColumnFilter.type === "text"}
						<div class="w-full">
							<Input
								bind:value={condition.value}
								oninput={() => onFilterChange(currentColumnFilter)}
								type="text"
								required
							/>
						</div>
					{/if}


					{#if currentColumnFilter.type === "number"}
						<div class="w-full">
							<ColumnFilterTypeNumber
								bind:condition={currentColumnFilter.filterModel.conditions[i]}
								columnFilter={currentColumnFilter}
								onchange={() => onFilterChange(currentColumnFilter)}
							/>
						</div>
					{/if}


					{#if currentColumnFilter.type === "boolean"}
						<div class="w-full">
							<Input
								class="hover:cursor-not-allowed"
								disabled
							/>
						</div>
					{/if}


					{#if currentColumnFilter.type === "date"}
						<ColumnFilterTypeDate
							bind:condition={currentColumnFilter.filterModel.conditions[i]}
							columnFilter={currentColumnFilter}
							onchange={() => onFilterChange(currentColumnFilter)}
						/>
					{/if}


					{#if currentColumnFilter.type === "enum"}
						<div class="w-full">
							<ColumnFilterTypeEnum
								bind:value={condition.value}
								dropdownOptions={dropdownOptions}
								onchange={() => onFilterChange(currentColumnFilter)}
								asyncDropdownOptions={asyncDropdownOptions}
							/>
						</div>
					{/if}
				</div>


				<InputDialogColumnFilterActionButtons
					columnFilter={currentColumnFilter}
					index={i}
					{onFilterChange}
				/>
			</div>
		{/if}
	</div>
{/each}
