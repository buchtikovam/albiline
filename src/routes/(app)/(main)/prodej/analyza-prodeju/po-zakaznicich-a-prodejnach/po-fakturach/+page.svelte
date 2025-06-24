<script lang="ts">
	import {activeTabIndex, pageCodes, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesDocumentByCustomerorstoreAgGridDef, SalesDocumentByCustomerorstoreHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach/ag-grid-cs/salesDocumentByCustomerorstoreAgGridDef";
	import {page} from "$app/state";

	pageKeys.value = {
		value: pageCodes.value.get(page.route.id||"")||[],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);
</script>



<svelte:head>
	<title>
		Analýza prodejů - Po zákaznících a fakturách | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={SalesDocumentByCustomerorstoreAgGridDef}
		table={table}
		headerTranslations={SalesDocumentByCustomerorstoreHeaderTranslations}
	/>
{/if}
