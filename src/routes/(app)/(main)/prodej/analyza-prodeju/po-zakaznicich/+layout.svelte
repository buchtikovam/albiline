<script lang="ts">
	import {showFulltextSearch} from "$lib/runes/page.svelte.js";
	import * as m from "$lib/paraglide/messages.js";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import Info from "lucide-svelte/icons/info";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import {Input} from "$lib/components/ui/input/index.js";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import PageTitle from "$lib/components/page/PageTitle.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

	let title = $derived.by(() => {
		if (table.loadedInputParams.inputs) {
			const inputs = table.loadedInputParams.inputs;

			const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
			const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';

			return `
				Detail pro: období <b>${dateFrom.toString().replace(" 00:00:00:000", "")}-${dateTo.toString().replace(" 00:00:00:000", "")}</b>,
				země = <b>${inputs.find(f => f.field === 'salescountrycode')?.value || 'vše'}</b>,
				prodejní kanál = <b>${inputs.find(f => f.field === 'saleschannel')?.value || 'vše'}</b>,
				divize = <b>${inputs.find(f => f.field === 'divisionid')?.value || ""}</b>,
				linie = <b>${inputs.find(f => f.field === 'productlineid')?.value === -1 ? 'vše' : inputs.find(f => f.field === 'productlineid')?.value || ""}</b>,
				KLP = <b>${inputs.find(f => f.field === 'costlevelcode')?.value || 'vše'}</b>`;
		}

		return "";
	})
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			<PageTitle {title}/>


			<div class="flex min-w-[126px] items-center gap-1 h-8 bg-white px-2 rounded-md border border-slate-300">
				<Checkbox
					class="size-4"
				/>

				<p class="text-xs font-bold">
					Zobrazit vratky
				</p>
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
