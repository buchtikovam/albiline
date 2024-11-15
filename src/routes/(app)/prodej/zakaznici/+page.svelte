<script lang="ts">
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import { customerAgGridDef } from '$lib/data/ag-grid/server-side/customerAgGridDef';
	import { isMobileLayoutExpandedStore } from '$lib/stores/pageStore';
	import { showFulltextSearchStore } from '$lib/stores/tableStore';

	showFulltextSearchStore.set(true);
	isMobileLayoutExpandedStore.set(true);
</script>


<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>


<AgGridSSWrapper 
	columnDefinitions={customerAgGridDef}
	url="http://10.2.2.10/albiline.test/api/v1/customers"
/>
