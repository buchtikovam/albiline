<script lang="ts">
	import { fulltextFilterValueStore, showFulltextSearchStore } from '$lib/stores/tableStore';
	import { Input } from '$lib/components/ui/input';
	import LayoutTabs from '$lib/components/tabs/LayoutTabs.svelte';
	import type { Tab } from '$lib/types/tabs/tabs';

	const tabDefinitions: Tab[] = [
		{ name: "Seznam", value: "/prodej/zakaznici"},
		{ name: "Detail", value: "/prodej/zakaznici/detail"},
		{ name: "Fakturační adresy", value: "/prodej/zakaznici/fakturacni-adresy"},
		{ name: "Kontaktní osoby", value: "/prodej/zakaznici/kontaktni-osoby"},
	]
</script>


<svelte:head>
	<title>
		Test
	</title>
</svelte:head>


<div class="w-full flex items-center justify-between pb-2">
	<LayoutTabs tabDefinitions={tabDefinitions} />

	{#if $showFulltextSearchStore === true}
		<div class="hidden md:flex items-center pr-[1px] overflow-visible">
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
