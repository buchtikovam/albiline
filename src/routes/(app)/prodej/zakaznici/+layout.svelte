<script lang="ts">
	import {
		activeSelectedRowIndexStore,
		editedDataStore,
		fulltextFilterValueStore,
		selectedRowsStore,
		showFulltextSearchStore
	} from '$lib/stores/tableStore';
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import { _ } from 'svelte-i18n'
	import { goto } from '$app/navigation';
	import TabSeparator from '$lib/components/tabs/TabSeparator.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { get } from 'svelte/store';

	let disableTabs: boolean = true;
	let translationRouteTabs = "routes.prodej.zakaznici.layout_tabs"

	editedDataStore.subscribe(data => disableTabs = data.length > 0)

	let customerAddressCode: string|undefined;
	let customerNodeCode: string|undefined;
	let activeIndex: number;

	activeSelectedRowIndexStore.subscribe((index) => {
		activeIndex = index
		let selectedRows = get(selectedRowsStore)

		if (selectedRows.length > 0) {
			customerNodeCode = selectedRows[activeIndex].customerNodeCode;
			customerAddressCode = selectedRows[activeIndex].customerAddressCode;
		}
	})

	selectedRowsStore.subscribe((data) => {
		if (data.length > 0) {
			customerNodeCode = data[activeIndex].customerNodeCode;
			customerAddressCode = data[activeIndex].customerAddressCode;
		}
	})

	let route: string;

	page.subscribe((data) => {
		if (get(selectedRowsStore).length === 0) { // for page refresh on a detail page (no selected row from table)
			selectedRowsStore.set([
				{
					customerNodeCode: Number($page.params.idZakaznika) || 0,
					customerAddressCode: Number($page.params.idProdejny) || 0,
				}
			])
		}

		route = data.url.pathname;
	})
</script>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={route} class="w-full h-8 overflow-auto rounded-md md:w-fit mb-2">
		<Tabs.List class="h-8">
			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici` !== route && disableTabs}
				value={"/prodej/zakaznici"}
				on:click={() => goto("/prodej/zakaznici")}
			>
				{$_(translationRouteTabs + ".list")}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}` !== route && disableTabs}
				value={`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`}
				on:click={() => goto(`/prodej/zakaznici/${customerNodeCode}/prodejny/${customerAddressCode}`)}
			>
				{$_(translationRouteTabs + ".address")}
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/${customerNodeCode}` !== route && disableTabs}
				value={`/prodej/zakaznici/${customerNodeCode}`}
				on:click={() => goto(`/prodej/zakaznici/${customerNodeCode}`)}
			>
				{$_(translationRouteTabs + ".customer")}
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	{#if $showFulltextSearchStore === true}
		<div class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible">
			<Input
				class="xl:w-80 lg:w-60 w-40 h-[30px] rounded-md border-white focus-visible:ring-0 focus-visible:border-albi-500"
				placeholder={$_('routes.prodej.zakaznici.fulltext_placeholder')}
				type="search"
				bind:value={$fulltextFilterValueStore}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-white rounded-lg">
	<slot />
</div>
