<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';
	import { z } from 'zod';

	interface Props {
		value: Date|undefined;
		label: string;
		disable?: boolean;
		schema: z.ZodType<T>;
		addToEditedFormData: (newValue: Date, initialValue: Date|null) => void;
	}

	let {
		value,
		label,
		disable,
		schema,
		addToEditedFormData
	}: Props = $props();

	let dateValue = $state(value);
	let hasError = $state(false);
	let errorMessage = $state("");

	$effect(() => {
		if (dateValue) {
			validateDateSchema(dateValue)
		}
	})

	function validateDateSchema(newValue: Date) {
		try {
			schema.parse(newValue);
			errorMessage = "";
			hasError = false;
			addToEditedFormData(newValue, value);
		} catch (e) {
			console.log(e);
			errorMessage = e.issues[0].code;
			hasError = true;
			addToEditedFormData(newValue, value);
			return false;
		}
	}
</script>

<div class="w-full">
	<DatePicker hasError={hasError} bind:dateValue={dateValue} label={label}/>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
