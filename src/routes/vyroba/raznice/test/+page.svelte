<script lang="ts">
	import InputDialog from '$lib/components/input-dialog/InputDialog.svelte';

	let params: any[];
</script>

<InputDialog bind:objects={params} />

{#if params !== undefined}
	{#each params as param}
		<p>{param}</p>
	{/each}
{/if}
