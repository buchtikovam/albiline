<script lang="ts">
	import InputDialog from '$lib/components/dialog/input-dialog/InputDialog.svelte';

	let inputDialogObjects: Record<string, string>;
</script>

<svelte:head>
	<title>Test</title>
</svelte:head>

<InputDialog bind:inputDialogObjects={inputDialogObjects} />

<div class="w-full h-full bg-background border">
	{#if inputDialogObjects !== undefined}
		{#each Object.entries(inputDialogObjects) as [_, value]}
			<p>{value.startDateValue}</p>
			<p>{value.endDateValue}</p>
		{/each}
	{/if}
</div>
