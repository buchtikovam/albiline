<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { z } from "zod";
	import AuthPasswordInput from "$lib/components/form/inputs/auth/AuthPasswordInput.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Dialog from "$lib/components/ui/dialog";

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable() }: Props = $props();

	let disableSubmit = $state(false);
	const passwordSchema = z.string().regex(new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/));
</script>


<DialogWrapper
	isOpen={isOpen}
	{header}
	{content}
	size="sm"
	fixedHeight={false}
/>

{#snippet header()}
	<Dialog.Title>
		{ m.routes_zmena_hesla_label() }
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<form
		method="POST"
		autocomplete="off"
		action="/profil"
	>
		<div
			class={`
				w-full sm:max-w-[320px] sm:w-[320px] flex flex-col gap-2 sm:gap-3 mb-6
				${disableSubmit ? "mb-2 sm:mb-2" : "sm:mb-6"}
			`}
		>
			<AuthPasswordInput
				label={m.routes_zmena_hesla_form_old_password}
				name="old-password"
				placeholder="•••••"
				inputType="dialog"
			/>

			<AuthPasswordInput
				bind:disableSubmit={disableSubmit}
				schema={passwordSchema}
				label={m.routes_zmena_hesla_form_new_password}
				name="new-password"
				placeholder="••••••••"
				inputType="dialog"
			/>
		</div>


		<Button
			type="submit"
			disabled={disableSubmit}
			class="w-full bg-albi-500 rounded-lg h-12 text-white font-bold"
		>
			{ m.routes_zmena_hesla_form_sumbmit_button() }
		</Button>
	</form>
{/snippet}
