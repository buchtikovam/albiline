<script lang="ts">
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import { z } from "zod";

	interface Props {
		value: string|null;
		label: string;
		schema: z.ZodType<T>;
		disable?: boolean;
		addToEditedFormData: (newValue: string, initialValue: string|null) => void;
	}

	let {
		value,
		label,
		schema,
		disable = false,
		addToEditedFormData
	}: Props = $props();


	let errorMessage = $state("");
	let hasError: boolean = $state(false);

	if (value !== null) {
		value = String(value).trim();
	}


	function validateTextSchema(ev) {
		const inputValue = ev.target?.value;

		try {
			schema.parse(inputValue);
			errorMessage = "";
			hasError = false;

			addToEditedFormData(inputValue, value);
		} catch (e) {
			console.log(e);
			addToEditedFormData(inputValue, value);
			hasError = true;
			errorMessage = e.issues[0].code;

			switch (e.issues[0].code) {
				case "too_small":
					// errorMessage = $_('zod_errors.string.too_small', {values: { min: e.issues[0].minimum, field: label }});
					break;
				case "too_big":
					// errorMessage = $_('zod_errors.string.too_big', {values: { max: e.issues[0].maximum, field: label }});
					break;
				case "invalid_string":
					switch (e.issues[0].validation) {
						case "email":
							// errorMessage = $_('zod_errors.string.invalid_string.email');
							break;
						default:
							// errorMessage = $_('zod_errors.string.invalid_string.default', {values: { format: e.issues[0].validation, field: label }});
					}
					break;
			}
		}
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

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
