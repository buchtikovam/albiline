<script lang="ts">
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import { testCSColDef } from "$lib/data/column-definitons/test-cs.js";

	export let data;
</script>


<svelte:head>
	<title>Test Client Side</title>
</svelte:head>


<AgGridCSWrapper 
	columnDefinitions={testCSColDef}
	data={data.products}
/>
