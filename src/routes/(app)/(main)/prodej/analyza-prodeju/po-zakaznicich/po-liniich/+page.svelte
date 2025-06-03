<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {beforeNavigate} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesCustomdetailByCustomersAgGridDefSvelte, SalesCustomdetailByCustomersHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/ag-grid-cs/salesCustomdetailByCustomersAgGridDef.svelte";
	import {
		SalesCustomerorstoreByProductlineAgGridDef, SalesCustomersorStoreByProductlineHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/ag-grid-cs/salesCustomerorstoreByProductlineAgGridDef";
	//
	// interface Props {
	// 	data: { pageMetaData: PageMetaDataType }
	// }
	//
	// let { data }: Props = $props();

	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductline"],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);

	beforeNavigate(() => {
		destroy = true;
	})
</script>



<svelte:head>
	<title>
		Analýza prodejů - po zákaznících a liniích | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={SalesCustomerorstoreByProductlineAgGridDef}
		table={table}
		headerTranslations={SalesCustomersorStoreByProductlineHeaderTranslations}
	/>
{/if}
