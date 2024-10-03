<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import Input from "$lib/components/ui/input/input.svelte";
 
	export let isChecked: boolean;
	export let value;
	export let form;
	export let name;
	export let label;
	export let type = 'text'; // Default type
</script>



<div class="w-full flex">
	<Field {form} name={name}>
		<Control let:attrs>
		<div class="flex w-full flex-col justify-between  h-[40px]">
			<InputLabel name={label} />
			<Checkbox bind:checked={isChecked} />
		</div>
		</Control>
		<FieldErrors />
	</Field>
	
	
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
