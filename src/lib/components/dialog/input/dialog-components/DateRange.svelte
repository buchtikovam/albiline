<script lang="ts">
	import type { InputDialogDateRange } from '$lib/types/components/form/inputDialog';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import DatePicker from '$lib/components/date/DatePicker.svelte';
	import LastYearButton from '$lib/components/date/range-buttons/LastYearButton.svelte';

	interface Props {
		item: InputDialogDateRange;
		startDateValue: Date | undefined;
		endDateValue: Date | undefined;
	}

	let { item = $bindable(), startDateValue = $bindable(), endDateValue = $bindable() }: Props = $props();
</script>


<div class=" w-full">
	<div class="flex items-center">
		<DatePicker label={item.startDateLabel} bind:dateValue={startDateValue} />
		<ChevronRight class="w-8 mt-6 mx-2" />
		<DatePicker label={item.endDateLabel} bind:dateValue={endDateValue} />
	</div>

	<div class="flex flex-wrap gap-2 mb-4 ">
		{#each item.presetButtons as presetButton}
			{#if presetButton === "lastYear"}
				<LastYearButton
					bind:startDateValue={item.startDateValue}
					bind:endDateValue={item.endDateValue}
				/>
			{/if}
		{/each}
	</div>
</div>
