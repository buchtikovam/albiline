<script lang="ts">
	import InputDialog from '$lib/components/input-dialog/InputDialog.svelte';

	let objects: { firstParam: string, scndParam: string };
</script>

<InputDialog bind:objects/>

{#if objects !== undefined}
	<p>{objects.firstParam}</p>
	<p>{objects.scndParam}</p>
{/if}
