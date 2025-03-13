<script lang="ts">
	import {activeTabIndex, fulltextFilterValue, showFulltextSearch} from "$lib/runes/page.svelte";
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import {Input} from "$lib/components/ui/input";
	import {i18n} from "$lib/i18n";
	import {goto} from "$app/navigation";
	import type {AgGridSSTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		children?: import('svelte').Snippet;
	}

	currentPageKey.value = "ProductStockInventory";

	let table: AgGridSSTableType = $state(agGridTables.value[currentPageKey.value]);

	let { children }: Props = $props();
	let activeTab = $derived(activeTabIndex.value.toString());
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
					goto(i18n.resolveRoute("/sklad/stav-skladu"))
				}}
			>
				Seznam
			</Tabs.Trigger>

			<TabSeparator color="primary"/>
		</Tabs.List>
	</Tabs.Root>


	<div class="flex gap-2">
		<FilterAndPresetButtons bind:table={table}/>

		{#if showFulltextSearch.value === true}
			<div
				class="hidden md:flex items-center pb-2 pr-[1px] overflow-visible"
			>
				<Input
					class="xl:w-80 lg:w-60 w-40 h-[31px] border border-white focus-visible:border-albi-500"
					placeholder={m.components_header_search_placeholder()}
					type="search"
					bind:value={fulltextFilterValue.value}
				/>
			</div>
		{/if}
	</div>
</div>


<div class="h-full bg-white rounded-lg">
	{@render children?.()}
</div>
