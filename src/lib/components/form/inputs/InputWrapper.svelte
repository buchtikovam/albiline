<script lang="ts">
  	import InputLabel from '$lib/components/form/labels/InputLabel.svelte';
 
	export let value: string|number;
	export let label;
	export let type = 'text'; 

	let errorMessage = ""

	function validateText(ev: Event) {
		const inputValue = ev.target?.value;

		if (inputValue.length < 3) {
			errorMessage = "test"
		} else {
			errorMessage = " "
		}
	}
</script>



<div class="w-full flex flex-col">
	<div class="w-full">
		<InputLabel label={label} />

		{#if type = "text"}
			<input 
				type="text"
				on:input={(e) => validateText(e)}
				bind:value 
				class="h-[36px] w-full border border-border rounded-md text-sm px-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-albi-500"
			>
		{/if}

		<p class="text-xs text-red-700 w-full">{errorMessage}</p>
	</div>
</div>  
