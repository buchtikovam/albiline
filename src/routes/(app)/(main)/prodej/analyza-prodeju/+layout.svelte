<script lang="ts">
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import {Input} from "$lib/components/ui/input";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs/index.js";


	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	currentPageKey.value = "SalesAnalytics";
	let table: AgGridTableType = $state(agGridTables.value[currentPageKey.value]);
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="w-full"></div>

		<div class="flex gap-2 items-center">
			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/(main)/prodej/analyza-prodeju"
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
		</div>
	</TabFulltextWrapper>


	<MainContentWrapper>
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
