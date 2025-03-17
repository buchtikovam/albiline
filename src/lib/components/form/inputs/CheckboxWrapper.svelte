<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import {validateStringSchema} from "$lib/utils/components/autoform/validateStringSchema";
	import {validateBooleanSchema} from "$lib/utils/components/autoform/validateBooleanSchema";

	interface Props {
		value: boolean;
		formInput: AutoFormInput;
		disable?: boolean;
		addToEditedFormData: (newValue: boolean, initialValue: boolean) => void;
	}

	let {
		value,
		formInput,
		disable = false,
		addToEditedFormData
	}: Props = $props();


	let checkedValue = $state(false);
	let hasError = $state(false);
	let errorMessage = $state("")

	if (value) checkedValue = value;

	function validateBoolean() {
		const validateResult = validateBooleanSchema(
			!checkedValue,
			value,
			formInput.schema,
			addToEditedFormData
		);

		errorMessage = validateResult.errorMessage;
		hasError = validateResult.hasError;
	}
</script>



<div class="w-full flex flex-col">
	<div class="flex items-center gap-1.5">
		<Checkbox
			class={(hasError ? "data-[state=checked]:border-red-600" : "data-[state=checked]:border-border") + " focus-visible:border-albi-500"}
			bind:checked={checkedValue}
			disabled={disable}
			onclick={() => validateBoolean()}
		/>

		<InputLabelWithContext
			contextMenuField={formInput.field}
			label={formInput.translation()}
		/>
	</div>

	<p class="text-xs text-red-700 w-full">
		{errorMessage}
	</p>
</div>
