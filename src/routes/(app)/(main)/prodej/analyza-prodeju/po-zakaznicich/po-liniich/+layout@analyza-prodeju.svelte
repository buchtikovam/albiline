<script lang="ts">
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import * as m from "$lib/paraglide/messages";
	import Info from "lucide-svelte/icons/info";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import {Input} from "$lib/components/ui/input";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import PageTitle from "$lib/components/page/PageTitle.svelte";
	import Fulltext from "$lib/components/form/Fulltext.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

	let title = $derived.by(() => {
		if (table) {
			if (table.loadedInputParams.inputs) {
				const inputs = table.loadedInputParams.inputs;

				const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
				const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';

				return `
				Prodeje po liniích za období <b>${dateFrom.toString().replace(" 00:00:00:000", "")}-${dateTo.toString().replace(" 00:00:00:000", "")}</b>,
				za <b>${inputs.find(f => f.field === 'customernodename')?.value || ''}</b>`;
			}
		}

		return "";
	})
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			<PageTitle {title}/>
		</div>


		{#if table}
			<FilterAndPresetButtons
				bind:table
				routeId="/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich"
			/>

			<Fulltext bind:table />
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
