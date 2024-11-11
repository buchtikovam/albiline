<script lang="ts">
	import { z } from "zod";
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
	import type { AutoFormNewInput } from '$lib/types/components/form/autoform/autoformNew';
 
	export let value: number;
	export let label;
	export let inputDef: AutoFormNewInput;

	let errorMessage = "";
	let hasError: boolean = false;



	function validateNumberSchema(ev: Event) {
		const inputValue = ev.target?.value;

		// try {
		// 	inputDef.schema.parse(inputValue);
		// 	errorMessage = "";
		// 	hasError = false;
		// } catch (e) {
		// 	console.log(e);
		// 	hasError = true;
		//
		// 	switch (e.issues[0].code) {
		// 		case "too_small":
		// 			errorMessage = $_('zod_errors.number.too_small', {values: { min: e.issues[0].minimum }});
		// 			break;
		// 		case "too_big":
		// 			errorMessage = $_('zod_errors.number.too_big', {values: { max: e.issues[0].maximum }});
		// 			break;
		// 	}
		// }
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

		<input
			type="number"
			on:input={(e) => validateNumberSchema(e)}
			bind:value
			class={`${hasError ? "focus-visible:border-red-500" : ""} h-[36px] w-full border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500`}
		>

		<p class="text-xs text-red-700 w-full">{errorMessage}</p>
	</div>
</div>  
