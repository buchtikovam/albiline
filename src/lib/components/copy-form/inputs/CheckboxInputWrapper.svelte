<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import Input from "$lib/components/ui/input/input.svelte";
 
	export let isChecked: boolean;
	export let value: string;
	export let form;
	export let name;
	export let label;
	export let type = 'text'; // Default type
</script>


<div class="w-full">
	<Field {form} name={name}>
		<Control let:attrs>
			<div class="w-full flex flex-col justify-end mr-2 ">
				<InputLabel name={label} />

				<div class="flex gap-1">
					<Checkbox bind:checked={isChecked} />
					{#if isChecked}
						<Input {...attrs} type={type} bind:value />			
					{:else}
						<Input {...attrs} disabled type={type} bind:value />
					{/if}
				</div>
			</div>
		</Control>
		<FieldErrors />
	</Field>
</div>  
