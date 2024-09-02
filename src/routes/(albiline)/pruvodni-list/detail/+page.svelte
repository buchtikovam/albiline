<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { superForm } from "sveltekit-superforms";
	import { Field, Control, Label, Description, FieldErrors } from "formsnap";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "./$types.js";
	import { allergies, schema, themes } from "./schema.js";

	import SuperDebug from "sveltekit-superforms";
 
	export let data: PageData;
 
	const form = superForm(data.form, {
		validators: zodClient(schema),
	});
	const { form: formData, enhance } = form;
</script>
 
<form method="POST" use:enhance>
	<Field {form} name="email">
		<Control let:attrs>
			<Label>Email</Label>
			<Input {...attrs} type="email" bind:value={$formData.email} />
		</Control>
		<Description>Use your company email if you have one.</Description>
		<FieldErrors />
	</Field>
</form>
<SuperDebug data={$formData} />