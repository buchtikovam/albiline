<script lang="ts">
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import Loader from "lucide-svelte/icons/loader";

	let table = $derived(agGridTables.value[currentPageKey.value]);
</script>


<div class="ag-status-name-value flex gap-1 items-center">
	<span>
		Řádky:
	</span>

	<span class="ag-status-name-value-value">
		{#if table.areInputParamsLoading}
			<Loader class="!animate-spin size-4"/>
		{:else}
			{table.latestRowCount}
		{/if}
	</span>
</div>
