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
	import DatePicker from "$lib/components/date/DatePicker.svelte";
	import DateRangePicker from "$lib/components/date/DateRangePicker.svelte";
	import ColumnFilterTypeNumber from "$lib/components/input-params/column-filters/ColumnFilterTypeNumber.svelte";
	import {isMobile} from "$lib/runes/page.svelte.js";
	import ColumnFilterTypeEnum from "$lib/components/input-params/column-filters/ColumnFilterTypeEnum.svelte";


	interface Props {
		selectOptions: InputParamsOptions[],
		columnFilter: ColumnFilter,
	}

	let {
		selectOptions,
		columnFilter = $bindable()
	}: Props = $props();


	let dropdownOptions: string[]|undefined = $state();
	let asyncDropdownOptions: (() => Promise<string[]>)|undefined = $state();

	$effect(() => {
		if (columnFilter) {
			columnFilter.filterModel.conditions.forEach((condition) => {
				if (condition.type !== "between") {
					// @ts-ignore
					delete condition.endValue;
				}
			})
		}
	})
</script>




{#each columnFilter.filterModel.conditions as condition, i (i)}
	<div
		class={`w-full sm:h-10 flex flex-col sm:flex-row gap-0.5 sm:gap-1 my-2 sm:mb-0`}
	>
		<div class="w-full">
			{#if isMobile.value && i < 1}
				<div class="flex justify-between">
					<InputDialogColumnFilterFieldSelect
						bind:columnFilter={columnFilter}
						selectOptions={selectOptions}
						bind:dropdownOptions={dropdownOptions}
						bind:asyncDropdownOptions={asyncDropdownOptions}
					/>

					{#if columnFilter.filterModel.operator}
						<p class="text-xs text-slate-300 font-bold">
							Operator: {columnFilter.filterModel.operator}
						</p>
					{/if}
				</div>
			{/if}

			{#if !isMobile.value}
				<InputDialogColumnFilterFieldSelect
					bind:columnFilter={columnFilter}
					selectOptions={selectOptions}
					bind:dropdownOptions={dropdownOptions}
					bind:asyncDropdownOptions={asyncDropdownOptions}
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
					disabled={columnFilter.columnName === null}
					type={columnFilter.type}
					bind:operator={condition.type}
				/>
			</div>


			<ChevronRight
				strokeWidth={3}
				class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
			/>


			<div class="w-full mr-1">
				{#if columnFilter.type === "text"}
					<div class="w-full">
						<Input
							bind:value={condition.value}
							type="text"
							required
						/>
					</div>
				{/if}


				{#if columnFilter.type === "number"}
					<div class="w-full">
						<ColumnFilterTypeNumber
							bind:condition={columnFilter.filterModel.conditions[i]}
							columnFilter={columnFilter}
						/>
					</div>
				{/if}


				{#if columnFilter.type === "boolean"}
					<div class="w-full">
						<Input
							class="hover:cursor-not-allowed"
							disabled
						/>
					</div>
				{/if}


				{#if columnFilter.type === "date"}
					{#if condition.type !== "between"}
						<div class="w-full">
							<DatePicker
								bind:dateValue={condition.value}
							/>
						</div>
					{:else}
						<div class="w-full">
							<DateRangePicker
								bind:startValue={condition.value}
								bind:endValue={condition.endValue}
							/>
						</div>
					{/if}
				{/if}


				{#if columnFilter.type === "enum"}
					<div class="w-full">
						<ColumnFilterTypeEnum
							bind:value={condition.value}
							dropdownOptions={dropdownOptions}
							asyncDropdownOptions={asyncDropdownOptions}
						/>
					</div>
				{/if}
			</div>


			<InputDialogColumnFilterActionButtons
				bind:columnFilter={columnFilter}
				index={i}
			/>
		{:else}
			<div class="flex gap-1.5">
				<div class="min-w-10">
					<InputDialogOperatorSelect
						disabled={columnFilter.columnName === null}
						type={columnFilter.type}
						bind:operator={condition.type}
					/>
				</div>


				<div class="w-full flex">
					{#if columnFilter.type === "text"}
						<div class="w-full">
							<Input
								bind:value={condition.value}
								type="text"
								required
							/>
						</div>
					{/if}


					{#if columnFilter.type === "number"}
						<div class="w-full">
							<ColumnFilterTypeNumber
								bind:condition={columnFilter.filterModel.conditions[i]}
								columnFilter={columnFilter}
							/>
						</div>
					{/if}


					{#if columnFilter.type === "boolean"}
						<div class="w-full">
							<Input
								class="hover:cursor-not-allowed"
								disabled
							/>
						</div>
					{/if}


					{#if columnFilter.type === "date"}
						{#if condition.type !== "between"}
							<div class="w-full">
								<DatePicker
									bind:dateValue={condition.value}
								/>
							</div>
						{:else}
							<div class="w-full">
								<DateRangePicker
									bind:startValue={condition.value}
									bind:endValue={condition.endValue}
								/>
							</div>
						{/if}
					{/if}


					{#if columnFilter.type === "enum"}
						<div class="w-full">
							<ColumnFilterTypeEnum
								value={condition.value}
								dropdownOptions={dropdownOptions}
								asyncDropdownOptions={asyncDropdownOptions}
							/>
						</div>
					{/if}
				</div>


				<InputDialogColumnFilterActionButtons
					bind:columnFilter={columnFilter}
					index={i}
				/>
			</div>
		{/if}
	</div>
{/each}
