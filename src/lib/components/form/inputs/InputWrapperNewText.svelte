<script lang="ts">
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import type { AutoFormNewInput } from '$lib/types/components/form/autoform/autoformNew';
	import { _ } from 'svelte-i18n';

	export let value: string|number = 0;
	export let label;
	export let inputDef: AutoFormNewInput;

	let errorMessage = "";
	let hasError: boolean = false;




	function validateTextSchema(ev: Event) {
		const inputValue = ev.target?.value;

		try {
			inputDef.schema.parse(inputValue);
			errorMessage = "";
			hasError = false;
		} catch (e) {
			console.log(e);
			hasError = true;

			switch (e.issues[0].code) {
				case "too_small":
					errorMessage = $_('zod_errors.string.too_small', {values: { min: e.issues[0].minimum }});
					break;
				case "too_big":
					errorMessage = $_('zod_errors.string.too_big', {values: { max: e.issues[0].maximum }});
					break;
				case "invalid_string":
					switch (e.issues[0].validation) {
						case "email":
							errorMessage = $_('zod_errors.string.invalid_string.email');
							break;
						default:
							errorMessage = $_('zod_errors.string.invalid_string.default');
					}
					break;
			}
		}


		// console.log(result);
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

		<input
			type="text"
			on:input={(e) => validateTextSchema(e)}
			bind:value
			class={`${hasError ? "focus-visible:border-red-600" : ""} h-[36px] w-full border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500`}
		>

		<p class="text-xs text-red-700 w-full">
			{errorMessage}
		</p>
	</div>
</div>  
