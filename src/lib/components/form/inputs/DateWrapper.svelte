<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';

	interface Props {
		value: Date|undefined;
		label: string;
		disabled?: boolean;
		field: string;
	}

	let {
		value = $bindable(),
		label,
		disabled = false,
		field
	}: Props = $props();
</script>

<div class="w-full">
	<DatePicker bind:dateValue={value} label={label}/>
</div>
