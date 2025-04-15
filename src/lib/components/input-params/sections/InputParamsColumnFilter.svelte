<script lang="ts">
	import {Button} from "$lib/components/ui/button/index.js";
	import Plus from "lucide-svelte/icons/plus";
	import type {
		ColumnFilter,
		InputParamsOptions,
	} from "$lib/types/components/input-params/inputParams";
	import InputDialogColumnFilterWrapper
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import deepcopy from "deepcopy";

	interface Props {
		columnFilters: ColumnFilter[];
		addFilter: () => void;
		selectOptions: InputParamsOptions[];
		onFilterChange: (newFilters: ColumnFilter[]) => void;  // Add this type

	}

	let {
		columnFilters,
		addFilter,
		onFilterChange,
		selectOptions,
	}: Props = $props();


	let inputColumnFilters = $state(deepcopy(columnFilters));

	$effect(() => {
		if (columnFilters.length > 0) {
			inputColumnFilters = columnFilters;
		}
	})


	function onColumnFilterChange(updatedColumnFilter: ColumnFilter) {
		// Clean up conditions before passing up
		const cleanFilter = deepcopy(updatedColumnFilter);
		cleanFilter.filterModel.conditions = cleanFilter.filterModel.conditions.map(c => {
			// @ts-ignore
			if (c.type !== "between") delete c?.endValue;
			return c;
		});

		const newFilters = columnFilters.map(f =>
			f.id === cleanFilter.id ? cleanFilter : f
		);

		onFilterChange(newFilters);
	}
</script>




<p class="text-albi-500 text-sm font-bold mb-1">
	{ m.components_input_params_section_columns() }
</p>


<div class="flex flex-col gap-0">
	{#each columnFilters as columnFilter, i}
		<div
			class={
			columnFilter.filterModel.conditions.length > 1
				? "rounded-lg border bg-slate-50 p-2 pb-0 pt-1 flex flex-col mb-2"
				: "bg-white p-0"
		}
		>
			{#if columnFilter.filterModel.conditions.length > 1}
				<p class="hidden sm:block text-xs font-bold text-slate-400 pb-0.5">
					{columnFilter.filterModel.operator}
				</p>
			{/if}

			<!-- add callback that -->
			<InputDialogColumnFilterWrapper
				selectOptions={selectOptions}
				onFilterChange={(updatedColumnFilter: ColumnFilter) => onColumnFilterChange(updatedColumnFilter)}
				columnFilter={columnFilter}
			/>
		</div>
	{/each}


	<div class="w-full flex justify-end h-10">
		<Button
			type="button"
			onclick={addFilter}
			class="size-10"
			variant="secondary"
		>
			<Plus strokeWidth={3} />
		</Button>
	</div>
</div>
