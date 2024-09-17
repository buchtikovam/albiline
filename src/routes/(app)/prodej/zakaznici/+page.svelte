<script lang="ts">
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import { zakazniciColDef } from '$lib/data/column-definitons/zakaznici';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';

	showFulltextSearchStore.set(true)
</script>


<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>


<AgGridSSWrapper 
	columnDefinitions={zakazniciColDef}
	url="http://10.2.2.10/albiline.test/api/v1/customers"
/>
