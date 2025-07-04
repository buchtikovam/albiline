<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from '$lib/runes/page.svelte';
	import {activePageTab, disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import {pageKeys, agGridTables} from '$lib/runes/table.svelte';
	import {Input} from '$lib/components/ui/input';
	import {localizeHref} from "$lib/paraglide/runtime";
	import {goto} from '$app/navigation';
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabSeparator from '$lib/components/tabs/TabSeparator.svelte';
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import {Button} from "$lib/components/ui/button";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import Fulltext from "$lib/components/form/Fulltext.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	pageKeys.value = {
		value: ["CustomersGetList"],
		index: 0
	};

	let activeTab = $derived(activeTabIndex.value.toString());
	let table: AgGridTableType = $state(agGridTables.value["CustomersGetList"]);
	let customerAddressCode = $state(0);
	let customerNodeCode = $state(0);


	// for navigation to detail pages
	$effect(() => {
		if (table.selectedRows) {
			if (table.selectedRows[table.activeSelectedRowIndex]) {
				customerNodeCode = table.selectedRows[table.activeSelectedRowIndex].customerNodeCode;
				customerAddressCode = table.selectedRows[table.activeSelectedRowIndex].customerAddressCode;
			}
		}

		activePageTab.value = localizeHref("/prodej/zakaznici");

		return (() => {
			activePageTab.value = "";
		})
	})
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<Tabs.Root
			value={activeTab}
		>
			<Tabs.List class="rounded-md border !border-slate-300">
				<Tabs.Trigger
					class="font-bold"
					disabled={activeTab !== "0" && (disableNavigation.value || disablePageTabs.value)}
					value={"0"}
					onclick={() => {
						goto(localizeHref("/prodej/zakaznici"))
					}}
				>
					{m.routes_prodej_zakaznici_tabs_list()}
				</Tabs.Trigger>

				<TabSeparator/>
				<Tabs.Trigger
					class="font-bold"
					disabled={activeTab !== "1" && (disableNavigation.value || disablePageTabs.value)}
					value={"1"}
					onclick={() => {
						goto(localizeHref(`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`));
					}}
				>
					{m.routes_prodej_zakaznici_tabs_address_detail()}
				</Tabs.Trigger>

				<TabSeparator/>
				<Tabs.Trigger
					class="font-bold"
					disabled={activeTab !== "2" && (disableNavigation.value || disablePageTabs.value)}
					value={"2"}
					onclick={() => {
						goto(localizeHref(`/prodej/zakaznici/${customerNodeCode}`));
					}}
				>
					{m.routes_prodej_zakaznici_tabs_customer_detail()}
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>

		<!--todo: add real restrictions, hide button -->
		<div class="flex items-center">
			{#if table.showRefreshDataButton}
				<Button
					variant="outline"
					class="h-8 text-xs mr-2"
					onclick={() => {
						loadInputParamsInTable(
							table,
							table.loadedInputParams,
							"serverSide",
							{columnFiltersEnabled: true, fulltextEnabled: true}
						);

						table.showRefreshDataButton = false;
					}}
				>
					Přenačíst data
				</Button>
			{/if}

			{#if table}
				<FilterAndPresetButtons
					bind:table={table}
					routeId="/(app)/(main)/prodej/zakaznici"
				/>

				<Fulltext bind:table />
			{/if}
		</div>
	</TabFulltextWrapper>


	<MainContentWrapper>
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>




