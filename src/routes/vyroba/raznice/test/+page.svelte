<script lang="ts">
	import InputDialog from '$lib/components/dialog/input-dialog/InputDialog.svelte';

	let inputDialogObjects: Record<string, string>;
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<!--TODO: check if all params were included-->

<InputDialog bind:inputDialogObjects={inputDialogObjects} />

<div class="w-full h-full bg-background border">
	{#if inputDialogObjects !== undefined}
		{#each Object.entries(inputDialogObjects) as [key, value]}
			<p>{key} {value}</p>
		{/each}
	{/if}
</div>
