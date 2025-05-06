<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import {Input} from "$lib/components/ui/input";
	import {localizeHref} from "$lib/paraglide/runtime";
	import {goto} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {Button} from "$lib/components/ui/button";


	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	currentPageKey.value = "ProductStockInventory";

	let table: AgGridTableType = $state(agGridTables.value[currentPageKey.value]);
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


		<div class="flex items-center">
			{#if table.showRefreshDataButton}
				<Button
					variant="outline"
					class="h-8 text-xs mr-2"
					onclick={() => {
					loadInputParamsInTable(
						table,
						table.loadedInputParams,
						"clientSide",
						{columnFiltersEnabled: true, fulltextEnabled: true}
					);

					table.showRefreshDataButton = false;
				}}
				>
					Přenačíst data
				</Button>
			{/if}

			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/(main)/sklad/stav-skladu"
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
