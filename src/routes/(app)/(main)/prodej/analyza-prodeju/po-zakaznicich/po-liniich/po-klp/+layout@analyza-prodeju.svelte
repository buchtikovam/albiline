<script lang="ts">
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import * as m from "$lib/paraglide/messages";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import {Input} from "$lib/components/ui/input";
	import PageTitle from "$lib/components/page/PageTitle.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

	let title = $derived.by(() => {
		if (table.loadedInputParams.inputs) {
			const inputs = table.loadedInputParams.inputs;

			const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
			const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';

			return `
				Prodeje po KLP v rámci linie <b>${inputs.find(f => f.field === 'productLineName')?.value || ''}</b> za období
				<b>${dateFrom.toString().replace(" 00:00:00:000", "")}-${dateTo.toString().replace(" 00:00:00:000", "")}</b>,
				za <b>${inputs.find(f => f.field === 'customerNodeName')?.value || ''}</b>`;
		}

		return "";
	})
</script>



<PageWrapper>

	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			<PageTitle {title}/>
		</div>


		<FilterAndPresetButtons
			bind:table={table}
			routeId="/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp"
		/>


		{#if showFulltextSearch.value === true}
			<div
				class="hidden md:flex items-center h-8"
			>
				<Input
					class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
					placeholder={m.components_header_search_placeholder()}
					type="text"
					bind:value={table.fulltextFilterValue}
				/>
			</div>
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
