<script lang="ts">
	import AgGridWrapper from "$lib/components/ag-grid/AgGridWrapper.svelte";
	import { testColDef } from "$lib/data/column-definitons/test";
</script>


<svelte:head>
	<title>Test</title>
</svelte:head>


<AgGridWrapper 
	columnDefinitions={testColDef}
	url="https://dummyjson.com/products?"
/>
