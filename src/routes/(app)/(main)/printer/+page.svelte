<script>
	import { onMount } from 'svelte';
	import {getAvailablePrinters, initializePrinterService} from "$lib/api/documents/printerService.svelte.js";

	let printers = [];
	let isInitialized = false;

	onMount(async () => {
		isInitialized = await initializePrinterService();
		if (isInitialized) {
			printers = await getAvailablePrinters();
			console.log('Available printers:', printers);
		}
	});
</script>

<div>
	{#if !isInitialized}
		<p>Initializing print service...</p>
	{:else}
		<h1>Available Printers</h1>
		<ul>
			{#each printers as printer}
				<li>{printer.name} ({printer.status})</li>
			{/each}
		</ul>
	{/if}
</div>
