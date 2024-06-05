<script lang="ts">
	import InputDialogDate from '$lib/components/input-dialog/InputDialogDate.svelte';
	import { onMount } from 'svelte';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';

	let openDialog: boolean;

	let dates: { startDate: DateValue, endDate: DateValue };

	const df = new DateFormatter('cz', {
		dateStyle: 'medium'
	});

	onMount(() => {
		openDialog = true;
	});
</script>

<InputDialogDate open={openDialog} bind:dates={dates} />

{#if dates !== undefined}
	<p>{df.format(dates.startDate.toDate(getLocalTimeZone()))}</p>
	<p>{df.format(dates.endDate.toDate(getLocalTimeZone()))}</p>
{/if}
