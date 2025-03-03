<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";

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

	if (value) checkedValue = value;

	function validateBooleanSchema() {
		try {
			formInput.schema.parse(!checkedValue);
			hasError = false;
			addToEditedFormData(!checkedValue, value);
		} catch (e) {
			console.log(e);
			hasError = true;
			addToEditedFormData(!checkedValue, value);
		}
	}
</script>



<div class="w-full flex flex-col">
	<div class="flex items-center gap-1.5">
		<Checkbox
			class={(hasError ? "data-[state=checked]:border-red-600" : "data-[state=checked]:border-border") + " focus-visible:border-albi-500"}
			bind:checked={checkedValue}
			disabled={disable}
			onclick={() => validateBooleanSchema()}
		/>

		<InputLabelWithContext
			contextMenuField={formInput.field}
			label={formInput.translation()}
		/>
	</div>
</div>
