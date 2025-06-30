<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {Button} from "$lib/components/ui/button";
	import {Input} from "$lib/components/ui/input";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {localizeHref} from "$lib/paraglide/runtime";
	import {goto} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import Fulltext from "$lib/components/form/Fulltext.svelte";


	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	pageKeys.value = {
		value: ["ProductStockInventory"],
		index: 0,
	}

	// let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let table: AgGridTableType = $state(agGridTables.value["blabla"]);
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
			{#if table}
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

				<Fulltext bind:table />
			{/if}
		</div>
	</TabFulltextWrapper>


	<MainContentWrapper>
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
