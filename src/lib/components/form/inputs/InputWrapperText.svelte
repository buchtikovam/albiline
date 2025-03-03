<script lang="ts">
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


	function validateTextSchema(ev: InputEvent) {  // <-- Add event type
		const inputValue = (ev.target as HTMLInputElement).value; // <-- Cast to HTMLInputElement

		try {
			formInput.schema.parse(inputValue);
			errorMessage = "";
			hasError = false;
			addToEditedFormData(inputValue, value);
		} catch (err: any) {
			console.log(err);
			addToEditedFormData(inputValue, value);
			hasError = true;
			errorMessage = err.issues[0].code;

			switch (err.issues[0].code) {
				case "invalid_string":
					switch (err.issues[0].validation) {
						case "email":
							errorMessage = m.components_autoform_string_error_invalid_email();
							break;
						// default:
							// errorMessage = $_('zod_errors.string.invalid_string.default', {values: { format: e.issues[0].validation, field: label }});
					}
					break;
			}
		}
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
