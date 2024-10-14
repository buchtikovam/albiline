<script lang="ts">
	import { Field, Control, FieldErrors } from "formsnap";
  	import InputLabel from '$lib/components/label/InputLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	export let value: boolean;
	export let form;
	export let name;
	export let label;
</script>

<div class="w-full ">
	<Field {form} name={name}>
		<Control let:attrs>
			<div class="flex items-center gap-1.5">
				<Checkbox bind:checked={value} />
				<InputLabel name={label} />
			</div>
		</Control>
		<FieldErrors />
	</Field>
</div>


