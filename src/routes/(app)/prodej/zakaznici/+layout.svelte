<script lang="ts">
	import { editedDataStore, fulltextFilterValueStore, selectedRowIdStore, showFulltextSearchStore } from '$lib/stores/tableStore';
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import * as Tabs from '$lib/components/ui/tabs';
	import { goto } from '$app/navigation';	

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

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/detail/${$selectedRowIdStore}` !== $page.url.pathname && disableTabs}
				value={`/prodej/zakaznici/detail/${$selectedRowIdStore}`}
				on:click={() => goto(`/prodej/zakaznici/detail/${$selectedRowIdStore}`)}
			>
				Detail
			</Tabs.Trigger>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/fakturacni-adresy` !== $page.url.pathname && disableTabs}
				value={`/prodej/zakaznici/fakturacni-adresy`}
				on:click={() => goto(`/prodej/zakaznici/fakturacni-adresy`)}
			>
				Fakturační adresy
			</Tabs.Trigger>

			<Tabs.Trigger
				class="font-bold"
				disabled={`/prodej/zakaznici/kontaktni-osoby` !== $page.url.pathname && disableTabs}
				value={`/prodej/zakaznici/kontaktni-osoby`}
				on:click={() => goto(`/prodej/zakaznici/kontaktni-osoby`)}
			>
				Kontaktní osoby
			</Tabs.Trigger>
		
		</Tabs.List>
	</Tabs.Root>


	{#if $showFulltextSearchStore === true}
		<div class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible">
			<Input
				class="w-40 h-[31px] rounded-md border-none focus-visible:ring-0"
				placeholder="Hledat..."
				type="text"
				bind:value={$fulltextFilterValueStore}
			/>
		</div>
	{/if}
</div>

<div class="h-full bg-white rounded-lg">
	<slot />
</div>
