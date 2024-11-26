<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';

	export let value: Date|undefined;
	export let label: string;
	export let disabled: boolean = false;
	export let field: string; // todo finish update disabled and edited data => addToEditedFormData(initialValue, field, value);
</script>

<div class="w-full">
	<DatePicker bind:dateValue={value} label={label}/>
</div>
