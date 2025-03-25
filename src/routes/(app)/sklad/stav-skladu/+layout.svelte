<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import {Input} from "$lib/components/ui/input";
	import {localizeHref} from "$lib/paraglide/runtime";
	import {goto} from "$app/navigation";
	import type {AgGridSSTableType} from "$lib/types/components/table/table";
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


	currentPageKey.value = "ProductStockInventory";

	let table: AgGridSSTableType = $state(agGridTables.value[currentPageKey.value]);
	let activeTab = $derived(activeTabIndex.value.toString());
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<Tabs.Root
			value={activeTab}
			class="w-full md:w-fit"
		>
			<Tabs.List class="rounded-md border !border-slate-300">
				<Tabs.Trigger
					class="font-bold"
					disabled={activeTab !== "0" && (disableNavigation.value || disablePageTabs.value)}
					value={"0"}
					onclick={() => {
						goto(localizeHref("/sklad/stav-skladu"))
					}}
				>
					Seznam
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>


		<div class="flex gap-2 items-center">
			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/sklad/stav-skladu"
			/>

			{#if showFulltextSearch.value === true}
				<div
					class="hidden md:flex items-center h-8"
				>
					<Input
						class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
						placeholder={m.components_header_search_placeholder()}
						type="search"
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
