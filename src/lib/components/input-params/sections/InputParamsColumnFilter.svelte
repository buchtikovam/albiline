<script lang="ts">
	import {addColumnFilter} from "$lib/utils/components/input-params/addColumnFilter.js";
	import InputDialogColumnFilterWrapper
		from "$lib/components/input-params/column-filters/InputDialogColumnFilterWrapper.svelte";
	import {Button} from "$lib/components/ui/button/index.js";
	import Plus from "lucide-svelte/icons/plus";
	import type {InputParamsOptions, InputParamsType} from "$lib/types/components/input-params/inputParams";
	import * as m from "$lib/paraglide/messages";

	interface Props {
		inputParams: InputParamsType;
		selectOptions: InputParamsOptions[];
	}

	let {
		inputParams = $bindable(),
		selectOptions,
	}: Props = $props();
</script>




{#if inputParams.columnFilters}
	<p class="text-albi-500 text-sm font-bold">
		{ m.components_input_params_section_columns() }
	</p>


	<div class="flex flex-col gap-0">
		{#each inputParams.columnFilters as columnFilter, i}
			<div
				class={
					columnFilter.filterModel.conditions.length > 1
						? "rounded-lg border bg-slate-50 p-2 flex flex-col mt-1.5  "
						: "bg-white p-0"
				}
			>
				{#if columnFilter.filterModel.conditions.length > 1}
					<p class="hidden sm:block text-xs font-bold text-slate-400 ">
						{columnFilter.filterModel.operator}
					</p>
				{/if}

				<InputDialogColumnFilterWrapper
					selectOptions={selectOptions}
					bind:columnFilter={inputParams.columnFilters[i]}
				/>
			</div>
		{/each}

		<div class="w-full flex justify-end gap-3 h-10 mt-2">
			{#if inputParams.columnFilters !== undefined}
				<Button
					type="button"
					onclick={() => {
						addColumnFilter(inputParams)
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
