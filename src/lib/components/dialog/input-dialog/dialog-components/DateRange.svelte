<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import type { DialogDateRange } from '$lib/types/input-dialog/inputDialog';
	import LastYearButton from '$lib/components/button/date-range-buttons/LastYearButton.svelte';

	/*
	Komponent pro získání časového rozmezí
	*/

	export let item: DialogDateRange;
	export let startDateValue: Date | undefined
	export let endDateValue: Date | undefined;
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
