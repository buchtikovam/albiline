<script lang="ts">
	import { z } from "zod";
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';

	interface Props {
		value: number;
		label: any;
		schema: z.ZodType<T>;
		disable?: boolean;
		addToEditedFormData: (newValue: number, initialValue: number|null) => void;
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

	function validateNumberSchema(ev) {
		const inputValue = Number(ev.target?.value);

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
					// errorMessage = $_('zod_errors.number.too_small', {values: { min: e.issues[0].minimum }});
					break;
				case "too_big":
					// errorMessage = $_('zod_errors.number.too_big', {values: { max: e.issues[0].maximum }});
					break;
			}
		}
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

		<input
			type="number"
			oninput={(e) => validateNumberSchema(e)}
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
