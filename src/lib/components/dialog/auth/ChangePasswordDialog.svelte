<script lang="ts">
	import DialogWrapperSmall from "$lib/components/dialog/DialogWrapperSmall.svelte";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as m from "$lib/paraglide/messages";
	import AuthPasswordInput from "$lib/components/form/inputs/auth/AuthPasswordInput.svelte";
	import {Button} from "$lib/components/ui/button";
	import {z} from "zod";

	interface Props {
		isOpen: boolean;
	}

	let { isOpen = $bindable() }: Props = $props();

	let disableSubmit = $state(false);
	// const passwordSchema = z.string().regex(new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/));
</script>



<DialogWrapperSmall
	bind:isOpen
	fixedWidth="sm:min-w-[400px] sm:max-w-[400px]"
>
	<Dialog.Header>
		<Dialog.Title>
			{ m.routes_zmena_hesla_label() }
		</Dialog.Title>
	</Dialog.Header>

	<form
		method="POST"
		autocomplete="off"
		action="/profil"
	>
		<div
			class={`flex flex-col gap-2 md:gap-3 ${disableSubmit ? "md:mb-4" : "md:mb-8"}`}
		>
			<AuthPasswordInput
				label={m.routes_zmena_hesla_form_old_password}
				name="old-password"
				placeholder="•••••"
				inputType="dialog"
			/>

			<!--schema={passwordSchema}-->
			<AuthPasswordInput
				bind:disableSubmit={disableSubmit}
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
</DialogWrapperSmall>
