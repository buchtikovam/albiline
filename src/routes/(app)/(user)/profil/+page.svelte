<script lang="ts">
	import { responseDialogMessages } from "$lib/runes/page.svelte";
	import { Button } from "$lib/components/ui/button";
	import type { ActionData } from "../../../../../.svelte-kit/types/src/routes/(app)/(user)/profil/$types";
	import ChangePasswordDialog from "$lib/components/dialog/auth/ChangePasswordDialog.svelte";

	let openChangePasswordDialog = $state(false);
	let { form }: { form: ActionData } = $props();

	$effect(() => {
		if (form) {
			responseDialogMessages.value = form.messages;
		}
	})
</script>


<div class="w-full h-full rounded-lg bg-white border border-slate-300 p-4">
	<Button
		class="w-fit"
		onclick={() => openChangePasswordDialog = true}
	>
		Změnit heslo
	</Button>
</div>


<ChangePasswordDialog isOpen={openChangePasswordDialog} />
