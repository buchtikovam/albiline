<script lang="ts">
	import {activeTabIndex, fulltextFilterValue, showFulltextSearch} from '$lib/runes/page.svelte';
	import {serverSideTables} from '$lib/runes/table.svelte';
	import {activePageTab, disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import {Input} from '$lib/components/ui/input';
	import {i18n} from '$lib/i18n.js'
	import {setContext} from 'svelte';
	import {goto} from '$app/navigation';
	import TabSeparator from '$lib/components/tabs/TabSeparator.svelte';
	import * as m from '$lib/paraglide/messages.js'
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let activeTab = $derived(activeTabIndex.value.toString());
	let serverSideTableKey = btoa("/(app)/prodej/zakaznici")
	let table = $state(serverSideTables[serverSideTableKey])

	setContext('serverSideTableKey', serverSideTableKey);

	if (!table) {
		serverSideTables[serverSideTableKey] = {
			defaultColDef: [],
			setColDefToDefault: false,
			editedTableData: [],
			filtersToSave: {},
			selectedFilters: {},
			presetToSave: [],
			selectedPreset: [],
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			latestRowCount: 100,
		}
	}


	// $inspect("layout", serverSideTables[serverSideTableKey])


	let customerAddressCode = $state(0);
	let customerNodeCode = $state(0);


	$effect(() => {
		if (serverSideTables[serverSideTableKey].selectedRows) {
			if (serverSideTables[serverSideTableKey].selectedRows[serverSideTables[serverSideTableKey].activeSelectedRowIndex]) {
				customerNodeCode = serverSideTables[serverSideTableKey].selectedRows[serverSideTables[serverSideTableKey].activeSelectedRowIndex].customerNodeCode;
				customerAddressCode = serverSideTables[serverSideTableKey].selectedRows[serverSideTables[serverSideTableKey].activeSelectedRowIndex].customerAddressCode;
			}
		}
	})


	$effect(() => {
		activePageTab.value = i18n.resolveRoute("/prodej/zakaznici");

		return (() => {
			activePageTab.value = "";
		})
	})
</script>



<div
	class="w-full flex items-center justify-between"
>
	<Tabs.Root
		value={activeTab}
		class="w-full h-8 overflow-auto rounded-md md:w-fit mb-2"
	>
		<Tabs.List class="h-8">
			<Tabs.Trigger
				class="font-bold"
				disabled={activeTab !== "0" && (disableNavigation.value || disablePageTabs.value)}
				value={"0"}
				onclick={() => {
					goto(i18n.resolveRoute("/prodej/zakaznici"))
				}}
			>
				{m.routes_prodej_zakaznici_tabs_list()}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={activeTab !== "1" && (disableNavigation.value || disablePageTabs.value)}
				value={"1"}
				onclick={() => {
					goto(i18n.resolveRoute(`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`))
				}}
			>
				{m.routes_prodej_zakaznici_tabs_address_detail()}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={activeTab !== "2" && (disableNavigation.value || disablePageTabs.value)}
				value={"2"}
				onclick={() => {
					goto(i18n.resolveRoute(`/prodej/zakaznici/${customerNodeCode}`))}
				}
			>
				{m.routes_prodej_zakaznici_tabs_customer_detail()}
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	{#if showFulltextSearch.value === true}
		<div
			class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible"
		>
			<Input
				class="xl:w-80 lg:w-60 w-40 h-[30px] border-none "
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



