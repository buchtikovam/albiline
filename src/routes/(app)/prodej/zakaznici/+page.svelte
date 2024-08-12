<script lang="ts">
	import AgGridWrapper from '$lib/components/ag-grid/AgGridWrapper.svelte';
	import { zakazniciColDef } from '$lib/data/column-definitons/zakaznici';
</script>


<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>


<AgGridWrapper 
	columnDefinitions={zakazniciColDef}
	url="http://10.2.2.181/customers"
/>
