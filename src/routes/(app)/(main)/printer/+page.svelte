<script lang="ts">
	import { onMount } from 'svelte';
	import {getAvailablePrinters, initializePrinterService} from "$lib/api/documents/printerService.svelte";

	let printers: string[] = $state([]);
	let isInitialized = $state(false);

	onMount(async () => {
		isInitialized = await initializePrinterService();
		if (isInitialized) {
			printers = await getAvailablePrinters();
		}
	});
</script>

<div>
	{#if !isInitialized}
		<p>Initializing print service...</p>
	{:else}
		<h1>Available Printers:</h1>

		<br/>

		<ul>
			{#each printers as printer}
				<li class="text-sm">{printer}</li>
			{/each}
		</ul>
	{/if}
</div>
