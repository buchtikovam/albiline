<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";


	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	// let table = serverSideTables[currentPageKey.value];
	// let open = $state(!table.hasInputParams);
	// let inputDialogFinished = $derived(!open);
</script>


<svelte:head>
	<title>
		Stav skladu | Albiline
	</title>
</svelte:head>


<!--<AgGridCSWrapper-->


<!--/>-->
