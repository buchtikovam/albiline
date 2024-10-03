<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	// import { Checkbox } from '$lib/components/ui/checkbox';

	export let value: boolean;
	export let form;
	export let name;
	export let label;
</script>


<div class="w-full pr-8 flex flex-col items-start">
	<Field {form} name={name}>
		<Control let:attrs>
		<div class="flex w-full flex-col justify-between  h-[60px]">
			<InputLabel name={label} />
			<Checkbox bind:checked={value} size="large" class="size-[36px]"/>
		</div>
		</Control>
		<FieldErrors />
	</Field>
</div>
