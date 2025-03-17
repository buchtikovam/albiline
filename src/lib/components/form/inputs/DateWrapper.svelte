<script lang="ts">
	import {validateStringSchema} from "$lib/utils/components/autoform/validateStringSchema";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import DatePicker from '$lib/components/date/DatePicker.svelte';

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

	let hasError = $state(false);
	let errorMessage = $state("");


	$effect(() => {
		if (value) {
			validateDate()
		}
	})


	function validateDate() {
		const validateResult = validateStringSchema(
			value || "",
			null,
			formInput.schema,
			addToEditedFormData
		);

		errorMessage = validateResult.errorMessage;
		hasError = validateResult.hasError;
	}
</script>



<div class="w-full">
	<DatePicker
		hasError={hasError}
		bind:dateValue={value}
		label={formInput.translation()}
		field={formInput.field}
	/>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
