<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';

	export let value: Date|undefined;
	export let label: string;
</script>

<div class="w-full">
	<DatePicker bind:dateValue={value} label={label}/>
</div>
