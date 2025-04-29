<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from '$lib/runes/page.svelte';
	import {activePageTab, disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import {currentPageKey, agGridTables} from '$lib/runes/table.svelte';
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

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	currentPageKey.value = "CustomersGetList";

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
			class="w-full md:w-fit"
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
						goto(localizeHref(`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`))
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
						goto(localizeHref(`/prodej/zakaznici/${customerNodeCode}`))
					}}
				>
					{m.routes_prodej_zakaznici_tabs_customer_detail()}
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>


		<div class="flex gap-2 items-center">
			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/(main)/prodej/zakaznici"
			/>

			{#if showFulltextSearch.value === true}
				<div
					class="hidden md:flex items-center h-8"
				>
					<Input
						class="xl:w-80 lg:w-60 w-40 h-8  border border-slate-300 focus-visible:border-albi-500"
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




