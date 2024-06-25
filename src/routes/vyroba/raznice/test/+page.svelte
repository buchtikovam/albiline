<script lang="ts">
	import InputDialog from '$lib/components/dialog/input-dialogs/InputDialog.svelte';

	let params: any[];
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<InputDialog bind:objects={params} />

{#if params !== undefined}
	{#each params as param}
		<p>{param}</p>
	{/each}
{/if}
