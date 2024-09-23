<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	// import {
	// 	Field,
	// 	Control,
	// 	Label,
	// 	Description,
	// 	FieldErrors,
	// 	Fieldset,
	// 	Legend,
	// } from "formsnap";
	import { zodClient } from "sveltekit-superforms/adapters";
	import type { PageData } from "../$types.js";
	import { schema } from "./schema.js";
	import SuperDebug from "sveltekit-superforms";
	import { onDestroy } from "svelte";
	import { selectedRowIdStore } from "$lib/stores/tableStore.js";
 
	export let data: PageData;
 
	const form = superForm(data.superforms.form, {
		validators: zodClient(schema),
	});
	const { form: formData, enhance } = form;

	onDestroy(() => {
		selectedRowIdStore.set(undefined)
	})
</script>
 
<form use:enhance class="mx-auto flex max-w-md flex-col" method="POST">
	<!-- <Field {form} name="email">
		<Control let:attrs>
			<Label>Email</Label>
			<input {...attrs} type="email" bind:value={$formData.email} />
		</Control>
		<Description>Company email is preferred</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="bio">
		<Control let:attrs>
			<Label>Bio</Label>
			<textarea {...attrs} bind:value={$formData.bio} />
		</Control>
		<Description>Tell us a bit about yourself.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="language">
		<Control let:attrs>
			<Label>Language</Label>
			<select {...attrs} bind:value={$formData.language}>
				<option value="fr">French</option>
				<option value="es">Spanish</option>
				<option value="en">English</option>
			</select>
		</Control>
		<Description>Help us address you properly.</Description>
		<FieldErrors />
	</Field>
	<Field {form} name="marketingEmails">
		<Control let:attrs>
			<input {...attrs} type="checkbox" bind:checked={$formData.marketingEmails} />
			<Label>I want to receive marketing emails</Label>
		</Control>
		<Description>Stay up to date with our latest news and offers.</Description>
		<FieldErrors />
	</Field>
	<button>Submit</button> -->
</form>
<SuperDebug data={$formData} />