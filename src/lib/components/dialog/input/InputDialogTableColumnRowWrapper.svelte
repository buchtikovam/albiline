<script lang="ts">
	import { Input } from "$lib/components/ui/input";
	import type {
		ColumnFilter,
		InputDialogSelectOption
	} from "$lib/types/components/dialog/inputDialog";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import InputDialogTableColumnFieldSelect
		from "$lib/components/dialog/input/InputDialogTableColumnFieldSelect.svelte";
	import StringOperatorSelect from "$lib/components/dialog/input/operators/StringOperatorSelect.svelte";
	import InputDialogTableColumnActionButtons
		from "$lib/components/dialog/input/InputDialogTableColumnActionButtons.svelte";


	interface Props {
		selectOptions: InputDialogSelectOption[],
		columnFilter: ColumnFilter,
	}

	let {
		selectOptions,
		columnFilter = $bindable()
	}: Props = $props();
</script>




{#each columnFilter.filterModel.conditions as condition, i (i)}
	<div class="w-full flex gap-1 mt-2">
		<InputDialogTableColumnFieldSelect
			bind:columnFilter={columnFilter}
			selectOptions={selectOptions}
		/>


		<ChevronRight
			strokeWidth={3}
			class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
		/>


		{#if columnFilter.type === "text"}
			<StringOperatorSelect
				disabled={columnFilter.columnName === null}
				bind:operator={condition.type}
			/>

			<ChevronRight
				strokeWidth={3}
				class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"
			/>

			<Input
				bind:value={condition.value}
				type="text"
				class="border border-border w-full"
			/>
		{/if}


		{#if columnFilter.type === "number"}
<!--			<StringOperatorSelectWrapper-->
<!--				disabled={columnFilter.columnName === null}-->
<!--				bind:condition={condition.type}-->
<!--			/>-->

<!--			<ChevronRight class="hidden sm:block min-w-3 max-w-3 text-albi-500 my-auto"/>-->

<!--			<Input-->
<!--				disabled={columnFilter.columnName === null}-->
<!--				bind:value={condition.value}-->
<!--				type="text"-->
<!--				class="border border-border w-full"-->
<!--			/>-->
		{/if}

		{#if columnFilter.type === "boolean"}
			.
		{/if}

		{#if columnFilter.type === "date"}
			.
		{/if}

		{#if columnFilter.type === "enum"}
			.
		{/if}


		<InputDialogTableColumnActionButtons
			bind:columnFilter={columnFilter}
			index={i}
		/>
	</div>
{/each}

