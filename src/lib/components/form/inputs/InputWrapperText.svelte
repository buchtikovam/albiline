<script lang="ts">
	import {validateStringSchema} from "$lib/utils/components/autoform/validateStringSchema";
	import type {AutoFormInput} from "$lib/types/components/form/autoform";
	import InputLabelWithContext from "$lib/components/form/labels/InputLabelWithContext.svelte";
	import * as m from "$lib/paraglide/messages.js"

	interface Props {
		value: string|null;
		formInput: AutoFormInput;
		disable?: boolean;
		addToEditedFormData: (newValue: string, initialValue: string|null) => void;
	}

	let {
		value,
		formInput,
		disable = false,
		addToEditedFormData
	}: Props = $props();


	let errorMessage = $state("");
	let hasError: boolean = $state(false);


	if (value !== null) {
		value = String(value).trim();
	}


	function validateTextSchema(ev: InputEvent) {
		const inputValue = (ev.target as HTMLInputElement).value;

		const validateResult = validateStringSchema(
			inputValue,
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
			type="text"
			oninput={(e) => validateTextSchema(e)}
			value={value}
			disabled={disable}
			class={`
				${hasError ? "focus-visible:border-red-600 " : ""}
				h-[36px] disabled:bg-slate-50 disabled:cursor-not-allowed w-full border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500`
			}
		>

		<p class="text-xs text-red-700 w-full">
			{errorMessage}
		</p>
	</div>
</div>  
