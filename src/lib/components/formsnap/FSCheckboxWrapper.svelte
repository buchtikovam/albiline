<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	export let value: boolean;
	export let form;
	export let name;
	export let label;
</script>

<div class="w-full flex flex-col gap-0.5">
	<Field {form} name={name}>
		<Control let:attrs>
			<InputLabel name={label} />
			<Checkbox bind:checked={value} />
		</Control>
		<FieldErrors />
	</Field>
</div>


