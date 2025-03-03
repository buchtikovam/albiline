<script lang="ts">
	import DatePicker from '$lib/components/date/DatePicker.svelte';
	import type {AutoFormInput} from "$lib/types/components/form/autoform";

	interface Props {
		value: string|undefined;
		disable?: boolean;
		formInput: AutoFormInput;
		addToEditedFormData: (newValue: string, initialValue: string|null) => void;
	}

	let {
		value,
		disable,
		formInput,
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

	function validateDateSchema(newValue: string) {
		// try {
		// 	schema.parse(newValue);
		// 	errorMessage = "";
		// 	hasError = false;
			addToEditedFormData(newValue, value);
		// } catch (e) {
		// 	console.log(e);
		// 	errorMessage = e.issues[0].code;
		// 	hasError = true;
		// 	addToEditedFormData(newValue, value);
		// 	return false;
		// }
	}
</script>

<div class="w-full">
	<DatePicker
		hasError={hasError}
		bind:dateValue={dateValue}
		label={formInput.translation()}
		field={formInput.field}
	/>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
