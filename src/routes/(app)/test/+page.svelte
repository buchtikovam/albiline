<script lang="ts">
	import AgGridSSWrapper from "$lib/components/ag-grid/AgGridSSWrapper.svelte";
	import { testColDef } from "$lib/data/column-definitons/test";
</script>


<svelte:head>
	<title>Test</title>
</svelte:head>


<AgGridSSWrapper 
	columnDefinitions={testColDef}
	url="https://dummyjson.com/products?limit=1000"
/>
