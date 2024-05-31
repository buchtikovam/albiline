<script lang="ts">
	import InputDialogDate from '$lib/components/input-dialog/InputDialogDate.svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';

	let dates: { startDate: DateValue, endDate: DateValue };

	const df = new DateFormatter('cz', {
		dateStyle: 'long'
	});
</script>

<InputDialogDate bind:dates/>

{#if dates !== undefined}
	<p>{df.format(dates.startDate.toDate(getLocalTimeZone()))}</p>
	<p>{df.format(dates.endDate.toDate(getLocalTimeZone()))}</p>
{/if}
