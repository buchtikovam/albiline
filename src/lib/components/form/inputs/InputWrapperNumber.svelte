<script lang="ts">
	import {validateNumberSchema} from "$lib/utils/components/autoform/validateNumberSchema";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";

	interface Props {
		value: number;
		formInput: AutoFormInput;
		disable?: boolean;
		addToEditedFormData: (newValue: number, initialValue: number|null) => void;
	}

	let {
		value,
		formInput,
		disable = false,
		addToEditedFormData
	}: Props = $props();


	let errorMessage = $state("");
	let hasError: boolean = $state(false);


	function validateNumber(ev: InputEvent) {
		const inputValue = (ev.target as HTMLInputElement).value;

		const validateResult = validateNumberSchema(
			Number(inputValue),
			value,
			formInput.schema,
			addToEditedFormData
		);

		errorMessage = validateResult.errorMessage;
		hasError = validateResult.hasError;
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabelWithContext
			contextMenuField={formInput.field}
			label={formInput.translation()}
		/>

		<input
			type="number"
			oninput={(e) => validateNumber(e)}
			value={value}
			disabled={disable}
			class={`${hasError ? "focus-visible:border-red-500 " : ""} disabled:bg-slate-50 h-[36px] w-full disabled:cursor-not-allowed border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500`}
		>

		<p class="text-xs text-red-700 w-full">{errorMessage}</p>
	</div>
</div>  



<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
	}
</style>
