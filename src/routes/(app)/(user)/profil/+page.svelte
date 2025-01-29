<script lang="ts">
	import ChangePasswordDialog from "$lib/components/dialog/auth/ChangePasswordDialog.svelte";

	let openChangePasswordDialog = $state(false);
</script>



<button onclick={() => openChangePasswordDialog = true}>
	Změnit heslo
</button>



<ChangePasswordDialog isOpen={openChangePasswordDialog} />
