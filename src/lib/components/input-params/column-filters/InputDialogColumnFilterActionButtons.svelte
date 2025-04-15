<script lang="ts">
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import deepcopy from "deepcopy";
	import Trash2 from "lucide-svelte/icons/trash-2";
	import Plus from "lucide-svelte/icons/plus";
	import type { ColumnFilter } from "$lib/types/components/input-params/inputParams";
	import ActionButton from "$lib/components/input-params/column-filters/ActionButton.svelte";
	import * as Popover from "$lib/components/ui/popover";

	interface Props {
		columnFilter: ColumnFilter;
		onFilterChange: (updatedColumnFilter: ColumnFilter) => void;
		index: number;
	}

	let {
		columnFilter,
		onFilterChange,
		index
	}: Props = $props();


	let open = $state(false);


	function addConditionWithOperator(operator: "OR" | "AND") {
		open = false;
		const newFilter = deepcopy(columnFilter);
		newFilter.filterModel = {
			...newFilter.filterModel,
			operator: operator,
			conditions: [
				...newFilter.filterModel.conditions,
				{ type: null, value: null }
			]
		};
		onFilterChange(newFilter);
	}


	function addCondition() {
		open = false;
		const newFilter = deepcopy(columnFilter);
		newFilter.filterModel = {
			...newFilter.filterModel,
			conditions: [
				...newFilter.filterModel.conditions,
				{ type: null, value: null }
			]
		};
		onFilterChange(newFilter);
	}


	function removeCondition() {
		open = false;
		const newFilter = deepcopy(columnFilter);
		newFilter.filterModel = {
			...newFilter.filterModel,
			conditions: newFilter.filterModel.conditions.filter((_, i) => i !== index),
			operator: newFilter.filterModel.conditions.length > 2
				? newFilter.filterModel.operator
				: null
		};
		onFilterChange(newFilter);
	}
</script>




<Popover.Root bind:open>
	<Popover.Trigger class="flex min-w-10 items-center justify-center border rounded-md bg-white p-0 ml-0.5">
		<ChevronDown strokeWidth={3} class="w-4 text-albi-500" />
	</Popover.Trigger>

	<Popover.Content class="p-1 w-fit">
		{#if columnFilter.filterModel.conditions.length < 2}
			<ActionButton onclickFn={removeCondition}>
				<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
				Smazat
			</ActionButton>

			{#if columnFilter.type !== "boolean"}
				<ActionButton onclickFn={() => addConditionWithOperator("AND")}>
					<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
					Přidat: A
				</ActionButton>

				<ActionButton onclickFn={() => addConditionWithOperator("OR")}>
					<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
					Přidat: NEBO
				</ActionButton>
			{/if}
		{:else}
			<ActionButton onclickFn={removeCondition}>
				<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
				Smazat
			</ActionButton>

			{#if columnFilter.type !== "boolean"}
				<ActionButton onclickFn={addCondition}>
					<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
					Přidat další
				</ActionButton>
			{/if}
		{/if}
	</Popover.Content>
</Popover.Root>
