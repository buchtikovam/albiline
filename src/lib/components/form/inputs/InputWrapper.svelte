<script lang="ts">
	import { z } from "zod";
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
 
	export let value: string|number;
	export let schema: z.ZodType<T>;
	export let label;
	export let type = 'text'; 

	let errorMessage = "";
	let hasError: boolean = false;


	function validateSchema(ev: Event) {
		const inputValue = ev.target?.value;

		try {
			schema.parse(inputValue);
			hasError = false;
			console.log("yay");
		} catch (e) {
			console.log(e);
			hasError = true;
		}	
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

		{#if type = "text"}
			<input 
				type="text"
				on:input={(e) => validateSchema(e)}
				bind:value 
				class={`${hasError ? "focus-visible:border-red-500" : ""} h-[36px] w-full border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500`}
			>
		{/if}

		<p class="text-xs text-red-700 w-full">{errorMessage}</p>
	</div>
</div>  
