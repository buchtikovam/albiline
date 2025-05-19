<script lang="ts">
	import { onMount } from 'svelte';
	import PrinterDialog from "$lib/components/printer/PrinterDialog.svelte";


	let openPrintWindow = $state(false);


	onMount(() => {
		openPrintWindow = true;
	});
</script>



<PrinterDialog bind:isOpen={openPrintWindow}/>

