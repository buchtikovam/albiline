<script lang="ts">
	import {showFulltextSearch} from "$lib/runes/page.svelte.js";
	import * as m from "$lib/paraglide/messages.js";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import Info from "lucide-svelte/icons/info";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import {Separator} from "$lib/components/ui/separator/index.js";
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import {Input} from "$lib/components/ui/input/index.js";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let title = $state("")

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			{#if title.length > 0}
				<Popover.Root>
					<Popover.Trigger
						class="size-8 bg-white border border-slate-300 rounded-md flex 2xl:hidden justify-center items-center"
					>
						<Info strokeWidth="2" class="size-[18px]"/>
					</Popover.Trigger>

					<Popover.Content side="right" class="text-sm h-8 py-0 px-2 w-fit flex items-center border-albi-500">
						<p >{title}</p>
					</Popover.Content>
				</Popover.Root>

				<div class="h-8 hidden border border-slate-300 rounded-md px-2 bg-white 2xl:flex items-center">
					<p class="text-sm ">{title}</p>
				</div>
			{:else}
				<div class="w-1"></div>
			{/if}


			<div class="flex items-center gap-1 h-8 bg-white px-2 rounded-md border border-slate-300">
				<Checkbox
					class="size-4"
				/>

				<p class="text-xs">Zobrazit vratky</p>
			</div>
		</div>


		<FilterAndPresetButtons
			bind:table={table}
			routeId="/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich"
		/>


		{#if showFulltextSearch.value === true}
			<div
				class="hidden md:flex items-center h-8"
			>
				<Input
					class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
					placeholder={m.components_header_search_placeholder()}
					type="text"
					bind:value={table.fulltextFilterValue}
				/>
			</div>
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
