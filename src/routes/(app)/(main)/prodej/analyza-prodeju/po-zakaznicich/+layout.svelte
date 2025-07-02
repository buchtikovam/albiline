<script lang="ts">
	import * as m from "$lib/paraglide/messages.js";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import Info from "lucide-svelte/icons/info";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import {Checkbox} from "$lib/components/ui/checkbox/index.js";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import PageTitle from "$lib/components/page/PageTitle.svelte";
	import Fulltext from "$lib/components/form/Fulltext.svelte";
	import {
		getPageTitleSalesCustomdetailByCustomers
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/getPageTitleSalesCustomdetailByCustomers";
	import type {ColState} from "ag-grid-enterprise/dist/types/src/charts/chartComp/model/chartDataModel";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let showReturns = $state(false);

	let title = $derived.by(() => {
		if (table) {
			return getPageTitleSalesCustomdetailByCustomers(table.loadedInputParams.inputs);
		}

		return "";
	})

	$effect(() => {
		if (showReturns) {
			const columns = table.presetToSave.length > 0 ? table.presetToSave : table.defaultColState;

			columns.forEach((column: ColState) => {
				if (column.colId.includes("return")) {
					column.hide = false;
				}
			})

			table.presetToSave = columns;
		}

		if (!showReturns) {
			const columns = table.presetToSave.length > 0 ? table.presetToSave : table.defaultColState;

			columns.forEach((column: ColState) => {
				if (column.colId.includes("return")) {
					column.hide = true;
				}
			})

			table.presetToSave = columns;
		}
	})
</script>



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			<PageTitle {title}/>


			<div class="flex min-w-[126px] items-center gap-1 h-8 bg-white px-2 rounded-md border border-slate-300">
				<Checkbox
					bind:checked={showReturns}
					class="size-4"
				/>

				<p class="text-xs font-bold">
					Zobrazit vratky
				</p>
			</div>
		</div>


		{#if table}
			<FilterAndPresetButtons
				bind:table={table}
				routeId="/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich"
			/>

			<Fulltext bind:table />
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
