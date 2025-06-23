<script lang="ts">
	import {
		SalesCustomerorstoreByProductlineByCostLevelAgGridDef,
		SalesCustomerorstoreByProductlineByCostLevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp/ag-grid-cs/salesCustomerorstoreByProductlineByCostlevelAgGridDef";
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";

	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductlineByCostlevel"],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);
</script>



<svelte:head>
	<title>
		Analýza prodejů - po zákaznících a klp | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={SalesCustomerorstoreByProductlineByCostLevelAgGridDef}
		table={table}
		headerTranslations={SalesCustomerorstoreByProductlineByCostLevelHeaderTranslations}
	/>
{/if}
