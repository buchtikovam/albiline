<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { customToast } from "$lib/utils/customToast";
	import type { ActionData } from "../../../../.svelte-kit/types/src/routes/(auth)/login/$types";
	import AuthPasswordInput from "$lib/components/form/inputs/auth/AuthPasswordInput.svelte";
	import AuthInput from "$lib/components/form/inputs/auth/AuthInput.svelte";
	import AlbiLogo from "$lib/icons/AlbiLogo.svelte";
	import * as m from '$lib/paraglide/messages.js'


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



<div class="flex flex-col gap-2 md:gap-4 items-center justify-center w-full max-w-[400px] mx-auto h-dvh p-4 md:p-0">
	<div class="w-full flex justify-center text-albi-500">
		<AlbiLogo />
	</div>

	<div class="w-full bg-white rounded-2xl shadow max-w-lg">
		<div class="p-6 sm:p-8">
			<h1 class="text-xl font-bold ">
				{ m.routes_login_form_label() }
			</h1>

			<form method="POST" autocomplete="off" class="">
				<div class="mt-3 md:mt-4 mb-6 md:mb-8 flex flex-col gap-2 md:gap-3 ">
					<AuthInput
						label={ m.routes_login_form_user_code }
						name="userCode"
						placeholder="ABCD"
					/>

					<AuthPasswordInput
						label={ m.routes_login_form_password }
						name="password"
						placeholder="•••••"
					/>
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
