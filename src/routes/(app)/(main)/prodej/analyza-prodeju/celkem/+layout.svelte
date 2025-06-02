<script lang="ts">
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte.js";
	import {pageSectionsState, showFulltextSearch} from "$lib/runes/page.svelte.js";
	import {Separator} from "$lib/components/ui/separator";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import {Input} from "$lib/components/ui/input";
	import Info from "lucide-svelte/icons/info";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as m from "$lib/paraglide/messages";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Popover from "$lib/components/ui/popover/index.js";


	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();


	pageKeys.value = {
		value: [
			"SalesTotalByDivision",
			"SalesTotalByDivisionSubdetailProductline",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"
		],
		index: 0
	};

	let table: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);

	let title = $derived.by(() => {
		if (table.loadedInputParams.inputs) {
			const inputs = table.loadedInputParams.inputs;
			const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
			const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
			const countryCode = inputs.find(f => f.field === 'salescountrycode')?.value || '';
			let currency = "CZK";
			let formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
			let formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");

			if (countryCode === "CZ") currency = "CZK";
			if (countryCode === "SK") currency = "EUR";
			if (countryCode === "PL") currency = "PLN";

			return `Prodeje za období <b>${formattedDateFrom}-${formattedDateTo}</b>. Vše v <b>${currency}</b> bez DPH.`;
		}

		return "";
	})

	$effect(() => {
		if (
			pageSectionsState.value.kspSection === false &&
			pageSectionsState.value.ksSection === true
		) {
			pageSectionsState.value.ksSection = false;
		}

		if (
			pageSectionsState.value.linieSection === false &&
			pageSectionsState.value.kspSection === true
		) {
			pageSectionsState.value.kspSection = false;
		}
	})
</script>


<svelte:head>
	<title>
		Analýza prodejů - celkem | Albiline
	</title>
</svelte:head>


<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			{#if title.length > 0}
				<Popover.Root>
					<Popover.Trigger
						class="size-8 bg-white border border-slate-300 rounded-md flex 2xl:hidden justify-center items-center"
					>
						<Info
							strokeWidth="2"
							class="size-[18px]"
						/>
					</Popover.Trigger>

					<Popover.Content
						side="right"
						class="text-xs h-8 py-0 px-2 w-fit flex items-center border-albi-500"
					>
						<p>
							{@html title}
						</p>
					</Popover.Content>
				</Popover.Root>

				<div class="h-8 hidden border border-slate-300 rounded-md px-2 bg-white 2xl:flex items-center">
					<p class="text-xs">
						{@html title}
					</p>
				</div>
			{:else}
				<div class="w-1"></div>
			{/if}


			<div class="min-w-[304px] flex text-xs justify-end items-center gap-1.5 bg-white h-8 border border-slate-300 rounded-md w-fit px-2">
				<b>Detail: </b>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						bind:checked={pageSectionsState.value.linieSection}
					/>

					<p>po liniích</p>
				</div>

				<Separator orientation="vertical" class="bg-albi-500 min-h-3 w-[2px]"/>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						disabled={!pageSectionsState.value.linieSection}
						bind:checked={pageSectionsState.value.kspSection}
					/>

					<p>po KLP</p>
				</div>

				<Separator
					orientation="vertical"
					class="bg-albi-500 min-h-3 w-[2px]"
				/>

				<div class="flex items-center gap-1">
					<Checkbox
						class="size-4"
						disabled={!pageSectionsState.value.kspSection}
						bind:checked={pageSectionsState.value.ksSection}
					/>

					<p>po kusech</p>
				</div>
			</div>
		</div>

		<FilterAndPresetButtons
			bind:table={table}
			routeId="/(app)/(main)/prodej/analyza-prodeju/celkem"
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


	<MainContentWrapper border={false}>
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
