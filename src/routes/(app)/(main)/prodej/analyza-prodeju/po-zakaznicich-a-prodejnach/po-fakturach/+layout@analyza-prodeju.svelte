<script lang="ts">
	import {
		getPageTitleSalesDocumentByCustomerorstore
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach/getPageTitleSalesDocumentByCustomerorstore";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import PageTitle from "$lib/components/page/PageTitle.svelte";
	import Fulltext from "$lib/components/form/Fulltext.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let title = $derived(getPageTitleSalesDocumentByCustomerorstore(table.loadedInputParams.inputs))
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<PageTitle {title}/>

		<FilterAndPresetButtons
			bind:table
			routeId="/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp"
		/>

		<Fulltext bind:table />
	</TabFulltextWrapper>

	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
