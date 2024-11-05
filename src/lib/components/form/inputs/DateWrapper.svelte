<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';

	export let label: string;
</script>

<div class="w-full">
	<DatePicker label={label}/>
</div>
