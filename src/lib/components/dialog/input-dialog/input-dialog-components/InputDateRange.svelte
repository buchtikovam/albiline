<script lang="ts">
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import DatePicker from '$lib/components/date-picker/DatePicker.svelte';
	import type { DateValue } from '@internationalized/date';
	import type { DialogItemDateRange } from '$lib/types/inputDialog';

	export let item: DialogItemDateRange;
	export let startDateValue: DateValue | undefined = undefined;
	export let endDateValue: DateValue | undefined = undefined;
</script>


<div class="flex items-center w-full">
	<DatePicker label={item.startDateLabel} bind:value={startDateValue} />
	<ChevronRight class="w-8 mt-6 mx-2" />
	<DatePicker label={item.endDateLabel} bind:value={endDateValue} />
</div>
