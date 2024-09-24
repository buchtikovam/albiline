<script lang="ts">
	import { Field, Control, Label, FieldErrors } from "formsnap";
	import { get } from "svelte/store";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import Input from "$lib/components/ui/input/input.svelte";
 
	export let value;
	export let form;
	export let name;
	export let label;
	export let type = 'text'; // Default type
</script>



<div class="w-full flex flex-col">
	<Field {form} name={name}>
		<Control let:attrs>
		<div class="w-full">
			<InputLabel name={label} />
			<Input {...attrs} type={type} bind:value />
		</div>
		</Control>
		<FieldErrors />
	</Field>
</div>  
