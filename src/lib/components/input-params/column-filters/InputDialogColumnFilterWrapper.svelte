<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import type {
		ColumnFilter,
		InputDialogSelectOption
	} from "$lib/types/components/dialog/inputDialog";
	import InputDialogColumnFilterActionButtons
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterActionButtons.svelte";
	import InputDialogColumnFilterFieldSelect
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterFieldSelect.svelte";
	import InputDialogOperatorSelect from "$lib/components/input-params/column-filters/InputDialogOperatorSelect.svelte";
	import DatePicker from "$lib/components/date/DatePicker.svelte";
	import DateRangePicker from "$lib/components/date/DateRangePicker.svelte";
	import ColumnFilterTypeNumber from "$lib/components/input-params/column-filters/ColumnFilterTypeNumber.svelte";


	interface Props {
		selectOptions: InputDialogSelectOption[],
		columnFilter: ColumnFilter,
	}

	let {
		selectOptions,
		columnFilter = $bindable()
	}: Props = $props();


	$effect(() => {
		columnFilter.filterModel.conditions.forEach((condition) => {
			if (condition.type !== "between") {
				// @ts-ignore
				delete condition.endValue;
			}
		})
	})
</script>




{#each columnFilter.filterModel.conditions as condition, i (i)}
	<div class="w-full h-10 flex gap-1 mt-2">
		<div class="w-full">
			<InputDialogColumnFilterFieldSelect
				bind:columnFilter={columnFilter}
				selectOptions={selectOptions}
			/>
		</div>


		<ChevronRight
			strokeWidth={3}
			class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
		/>


		<InputDialogOperatorSelect
			disabled={columnFilter.columnName === null}
			type={columnFilter.type}
			bind:operator={condition.type}
		/>


		<ChevronRight
			strokeWidth={3}
			class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
		/>


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
					<DateRangePicker bind:startValue={condition.value} bind:endValue={condition.endValue}/>
				</div>
			{/if}
		{/if}



		{#if columnFilter.type === "enum"}
			<div class="w-full">
				.
			</div>
		{/if}


		<InputDialogColumnFilterActionButtons
			bind:columnFilter={columnFilter}
			index={i}
		/>
	</div>
{/each}



