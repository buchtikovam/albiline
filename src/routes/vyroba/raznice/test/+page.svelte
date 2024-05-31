<script lang="ts">
	import InputDialog from '$lib/components/input-dialog/InputDialog.svelte';

	let objects: { name: string, userName: string };
</script>

<InputDialog bind:objects/>

{#if objects !== undefined}
	<p>{objects.name}</p>
	<p>{objects.userName}</p>
{/if}
