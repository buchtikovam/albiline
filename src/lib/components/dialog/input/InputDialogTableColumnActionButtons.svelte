<script lang="ts">
	import Plus from "lucide-svelte/icons/plus";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import Trash2 from "lucide-svelte/icons/trash-2";
	import * as Popover from "$lib/components/ui/popover";
	import * as Command from "$lib/components/ui/command";
	import type {ColumnFilter} from "$lib/types/components/dialog/inputDialog";

	interface Props {
		columnFilter: ColumnFilter;
		index: number;
	}

	let { columnFilter = $bindable(), index }: Props = $props();


	let open = $state(false);


	function addConditionWithOperator(operator: "OR" | "AND") {
		open = false;
		columnFilter.filterModel.operator = operator;
		columnFilter.filterModel.conditions.push({
			type: null,
			value: null
		})
	}


	function addCondition() {
		open = false;
		columnFilter.filterModel.conditions.push({
			type: null,
			value: null
		})
	}


	function removeCondition() {
		console.log("INDEX:", index)

		open = false;
		columnFilter.filterModel.conditions.splice(index, 1);
	}
</script>



<Popover.Root
	bind:open
>
	<Popover.Trigger
		class="hidden sm:flex min-w-10 ml-1 items-center justify-center border rounded-md bg-white p-0 "
	>
		<ChevronDown
			strokeWidth={3}
			class="w-4 text-albi-500"
		/>
	</Popover.Trigger>

	<Popover.Content class="p-1 w-fit ">
		{#if columnFilter.filterModel.conditions.length < 2}
			<button
				class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
				onclick={() => removeCondition()}
			>
				<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
				Smazat
			</button>

			<button
				class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
				onclick={() => addConditionWithOperator("AND")}
			>
				<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
				Přidat: A
			</button>

			<button
				class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
				onclick={() => addConditionWithOperator("OR")}
			>
				<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
				Přidat: NEBO
			</button>
		{:else}
			<button
				class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
				onclick={() => removeCondition()}
			>
				<Trash2 class="text-red-500 size-4 hover:text-red-700"/>
				Smazat
			</button>

			<button
				class="w-full flex items-center gap-2 px-2 py-1 hover:text-black hover:bg-muted/50 text-sm"
				onclick={() => addCondition()}
			>
				<Plus class="text-albi-500 size-4 hover:text-albi-700"/>
				Přidat další
			</button>
		{/if}
	</Popover.Content>
</Popover.Root>
