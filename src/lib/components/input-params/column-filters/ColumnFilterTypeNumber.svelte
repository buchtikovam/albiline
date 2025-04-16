<script lang="ts">
	import {Input} from "$lib/components/ui/input";
	import type {
		ColumnFilter,
		ColumnFilterModelCondition,
	} from "$lib/types/components/input-params/inputParams";

	interface Props {
		columnFilter: ColumnFilter;
		condition: ColumnFilterModelCondition;
		onchange: (event: Event) => void;
	}

	let {
		columnFilter,
		condition = $bindable(),
		onchange,
	}: Props = $props();

	$effect(() => {
		if (condition.type !== "between") {
			delete condition?.endValue;
		}
	})
</script>



{#if condition.type !== "between"}
	<div class="w-full">
		<Input
			disabled={columnFilter.columnName === null}
			bind:value={condition.value}
			oninput={onchange}
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
			oninput={onchange}
			type="number"
			inputmode="numeric"
			required
		/>
		<Input
			disabled={columnFilter.columnName === null}
			bind:value={condition.endValue}
			oninput={onchange}
			required
			type="number"
			inputmode="numeric"
		/>
	</div>
{/if}
