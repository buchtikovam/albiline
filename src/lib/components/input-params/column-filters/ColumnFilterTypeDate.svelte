<script lang="ts">
	import DatePicker from "$lib/components/date/DatePicker.svelte";
	import DateRangePicker from "$lib/components/date/DateRangePicker.svelte";
	import type {ColumnFilter, ColumnFilterModelCondition} from "$lib/types/components/input-params/inputParams";

	interface Props {
		columnFilter: ColumnFilter;
		condition: ColumnFilterModelCondition;
		onchange: () => void;
	}

	let {
		columnFilter,
		condition = $bindable(),
		onchange,
	}: Props = $props();

	$effect(() => {
		if (condition.type !== "between") {
			// @ts-ignore
			delete condition?.endValue;
		}
	})
</script>



{#if condition.type !== "between"}
	<div class="w-full">
		<DatePicker
			bind:dateValue={condition.value}
			{onchange}
		/>
	</div>
{:else}
	<div class="w-full">
		<DateRangePicker
			bind:startValue={condition.value}
			bind:endValue={condition.endValue}
			{onchange}
		/>
	</div>
{/if}
