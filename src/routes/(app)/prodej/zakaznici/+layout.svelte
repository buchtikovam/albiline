<script lang="ts">
	import { editedDataStore, fulltextFilterValueStore, selectedRowIdStore, showFulltextSearchStore } from '$lib/stores/tableStore';
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import * as Tabs from '$lib/components/ui/tabs';
	import { goto } from '$app/navigation';	
	import TabSeparator from '$lib/components/tabs/TabSeparator.svelte';

	let disableTabs: boolean = true;

	editedDataStore.subscribe(data => disableTabs = data.length > 0)
</script>



<div class="w-full flex items-center justify-between">
	<Tabs.Root value={$page.url.pathname} class="w-full h-8 overflow-auto rounded-md md:w-fit mb-2">
		<Tabs.List class="h-8">
			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici` !== $page.url.pathname && disableTabs}
				value={"/prodej/zakaznici"}
				on:click={() => goto("/prodej/zakaznici")}
			>
				Seznam
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/prodejny/${$selectedRowIdStore}` !== $page.url.pathname && disableTabs}
				value={`/prodej/zakaznici/prodejny/${$selectedRowIdStore}`}
				on:click={() => goto(`/prodej/zakaznici/prodejny/${$selectedRowIdStore}`)}
			>
				Prodejny
			</Tabs.Trigger>
			<TabSeparator color="primary"/>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/${$selectedRowIdStore}` !== $page.url.pathname && disableTabs}
				value={`/prodej/zakaznici/${$selectedRowIdStore}`}
				on:click={() => goto(`/prodej/zakaznici/${$selectedRowIdStore}`)}
			>
				Zákazník
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>


	{#if $showFulltextSearchStore === true}
		<div class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible">
			<Input
				class="xl:w-80 lg:w-60 w-40 h-[30px] rounded-md border-white focus-visible:ring-0 focus-visible:border-albi-500"
				placeholder="Hledat..."
				type="search"
				bind:value={$fulltextFilterValueStore}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-white rounded-lg">
	<slot />
</div>
