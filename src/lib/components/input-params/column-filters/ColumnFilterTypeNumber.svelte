<script lang="ts">
	import {Input} from "$lib/components/ui/input";
	import type {
		ColumnFilter,
		ColumnFilterModelCondition,
	} from "$lib/types/components/dialog/inputDialog";

	interface Props {
		columnFilter: ColumnFilter;
		condition: ColumnFilterModelCondition;
	}

	let {
		columnFilter,
		condition = $bindable(),
	}: Props = $props();
</script>



{#if condition.type !== "between"}
	<div class="w-full">
		<Input
			disabled={columnFilter.columnName === null}
			bind:value={condition.value}
			type="number"
			inputmode="numeric"
			required
		/>
	</div>
{:else}
	<div class="w-full flex gap-2">
		<Input
			disabled={columnFilter.columnName === null}
			bind:value={condition.value}
			type="number"
			inputmode="numeric"
			required
		/>
		<Input
			disabled={columnFilter.columnName === null}
			bind:value={condition.endValue}
			required
			type="number"
			inputmode="numeric"
		/>
	</div>
{/if}
