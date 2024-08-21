<script lang="ts">
	import AgGridSSWrapper from "$lib/components/ag-grid/AgGridSSWrapper.svelte";
	import { testSSColDef } from "$lib/data/column-definitons/test-ss";
</script>


<svelte:head>
	<title>Test Server Side</title>
</svelte:head>


<AgGridSSWrapper 
	columnDefinitions={testSSColDef}
	url="https://dummyjson.com/products?limit=1000"
/>
