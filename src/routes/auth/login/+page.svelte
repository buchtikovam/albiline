<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Input } from "$lib/components/ui/input";
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";
	import AlbiLogo from "$lib/icons/AlbiLogo.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import {redirect} from "@sveltejs/kit";
	import {customToast} from "$lib/utils/customToast";
	import type {ActionData} from "../../../../.svelte-kit/types/src/routes/auth/login/$types";

	let { form }: { form: ActionData } = $props();


	$effect(() => {
		if (form) {
			if (form.data.messages) {
				form.data.messages.forEach((message) => {
					customToast(message.type, message.content);
				})
			}
		}
	})
</script>



<div class="flex flex-col gap-4 items-center justify-center w-[480px] mx-auto h-dvh p-4">
	<div class="w-full flex justify-center text-albi-500">
		<AlbiLogo />
	</div>

	<div class="w-full bg-white rounded-2xl shadow sm:max-w-lg">
		<div class="p-8">
			<h1 class="text-xl font-bold ">
				{ m.routes_login_form_label() }
			</h1>

			<form method="POST"  class="">
				<div class="mt-4 mb-8 flex flex-col gap-4">
					<div>
						<InputLabel
							label={m.routes_login_form_user_code()}
						/>


						<Input
							class="bg-albi-50 h-12 rounded-lg placeholder:text-albi-300 text-albi-950 "
							autocomplete="username"
							name="userCode"
							type="text"
							required={true}
							placeholder="ABCD"
						/>
					</div>

					<div>
						<InputLabel
							label={m.routes_login_form_password()}
						/>


						<Input
							class="bg-albi-50 h-12 rounded-lg placeholder:text-albi-300 text-albi-950"
							autocomplete="current-password"
							name="password"
							type="password"
							required={true}
							placeholder="••••••••"
						/>
					</div>
				</div>


				<div>
					<Button type="submit" class="w-full bg-albi-500 rounded-lg h-12 text-background font-bold">
						{ m.routes_login_form_submit_button() }
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>
