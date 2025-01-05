<script lang="ts">
	// import {
	// 	activeSelectedRowIndexStore,
	// 	editedTableDataStore,
	// 	fulltextFilterValueStore,
	// 	selectedRowsStore,
	// 	showFulltextSearchStore
	// } from '$lib/runes/table.svelte';
	// import { page } from '$app/stores';
	// import { Input } from '$lib/components/ui/input';
	// import { goto } from '$app/navigation';
	import TabSeparator from '$lib/components/tabs/TabSeparator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as m from '$lib/paraglide/messages.js'
	import { disableNavigation, disablePageTabs } from '$lib/runes/navigation.svelte';
	import { goto } from '$app/navigation';
	import { fulltextFilterValue, showFulltextSearch } from '$lib/runes/page.svelte';
	import { Input } from '$lib/components/ui/input';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let customerAddressCode: string|undefined = $state();
	let customerNodeCode: string|undefined = $state();
	// let activeIndex: number;
	//
	// activeSelectedRowIndexStore.subscribe((index) => {
	// 	activeIndex = index
	// 	let selectedRows = get(selectedRowsStore)
	//
	// 	if (selectedRows.length > 0) {
	// 		customerNodeCode = selectedRows[activeIndex].customerNodeCode;
	// 		customerAddressCode = selectedRows[activeIndex].customerAddressCode;
	// 	}
	// })
	//
	// let disablePageTabs = $state(false);

	// selectedRowsStore.subscribe((data) => {
	// 	if (data.length > 0) {
	// 		customerNodeCode = data[activeIndex].customerNodeCode;
	// 		customerAddressCode = data[activeIndex].customerAddressCode;
	// 	}
	// })
	//
	//
	// disablePageTabsStore.subscribe(data => {
	// 	disablePageTabs = data;
	// })
	//
	//
	//
	// let route: string = $state();
	//
	// page.subscribe((data) => {
	// 	if (get(selectedRowsStore).length === 0) { // for page refresh on a detail page (no selected row from table)
	// 		customerNodeCode = $page.params.customerNodeCode;
	// 		customerAddressCode = $page.params.customerAddressCode;
	// 	}
	//
	// 	route = data.url.pathname;
	// })

</script>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={"route"} class="w-full h-8 overflow-auto rounded-md md:w-fit mb-2">
		<Tabs.List class="h-8">
			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici` !== "route" && (disableNavigation.value || disablePageTabs.value)}
				value={"/prodej/zakaznici"}
				onclick={() => goto("/prodej/zakaznici")}
			>
				{m.routes_prodej_customers_tabs_list()}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}` !== "route" && (disableNavigation.value || disablePageTabs.value)}
				value={`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`}
				onclick={() => goto(`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`)}
			>
				{m.routes_prodej_customers_tabs_address_detail()}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/${customerNodeCode}` !== "route" && (disableNavigation.value || disablePageTabs.value)}
				value={`/prodej/zakaznici/${customerNodeCode}`}
				onclick={() => goto(`/prodej/zakaznici/${customerNodeCode}`)}
			>
				{m.routes_prodej_customers_tabs_customer_detail()}
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	{#if showFulltextSearch.value === true}
		<div class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible">

			<Input
				class="xl:w-80 lg:w-60 w-40 h-[30px] "
				placeholder={"Hledat..."}
				type="search"
				bind:value={fulltextFilterValue.value}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-white rounded-lg">
	{@render children?.()}
</div>
