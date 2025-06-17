<script lang="ts">
	import {PaneGroup, Pane, PaneResizer} from "paneforge";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {pageStates, showFulltextSearch} from "$lib/runes/page.svelte";
	import * as m from "$lib/paraglide/messages";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import Info from "lucide-svelte/icons/info";
	import {Input} from "$lib/components/ui/input/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import * as Tabs from "$lib/components/ui/tabs";
	import {page} from "$app/state";
	import {
		SalesTotalByStoreAgGridDef, SalesTotalByStoreHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/ag-grid-cs/salesTotalByStoreAgGridDef";
	import {
		SalesTotalByStoreDetailAgGridDef, SalesTotalByStoreDetailHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/ag-grid-cs/salesTotalByStoreDetailAgGridDef.js";
	import {
		SalesSubdetailByCostlevelAgGridDef, SalesSubdetailByCostlevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/ag-grid-cs/salesSubdetailByCostlevelAgGridDef";
	import {Checkbox} from "$lib/components/ui/checkbox";
	import {setPaneFocus} from "$lib/utils/components/pane-forge/setPaneFocus";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {onMount} from "svelte";
	import {beforeNavigate} from "$app/navigation";
	import {
		SalesTotalByStoreInputParams
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/input-params/salesTotalByStoreInputParams";


	// Use the reactive page state to get the routeId
	const routeId = $state(page.route.id || "");
	let open = $state(false);
	let destroy = $state(false);

	// Initialize runes and other state variables
	showFulltextSearch.value = true;

	// Initialize pageCodes for all tables on current page
	pageKeys.value = {
		value: [
			"SalesTotalByStore",
			"SalesTotalByStoreDetail",
			"SalesSubdetailByCostlevel"
		],
		index: 0,
	}


	// state for tables and UI
	let salesTotalByStoreTable: AgGridTableType = $state(agGridTables.value['SalesTotalByStore'])
	let salesTotalByStoreDetailTable: AgGridTableType = $state(agGridTables.value['SalesTotalByStoreDetail'])
	let salesSubdetailByCostLevelTable: AgGridTableType = $state(agGridTables.value['SalesSubdetailByCostlevel'])
	let activeTable: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);


	// initialize the state for current page if it doesn't exist
	if (routeId && !pageStates.value[routeId]?.resizablePageSections) {
		pageStates.value[routeId] = {
			resizablePageSections: {
				salesTotalByStoreSection: { open: true, size: 50, focused: true, index: 0 },
				salesTotalSubdetailGroupSection: { open: false, size: 50, focused: false, index: 0 }, // wrapper section
				salesTotalByStoreDetailSection: { open: true, size: 50, focused: false, index: 1 },
				salesSubdetailByCostlevelSection: { open: true, size: 50, focused: false, index: 2 }
			}
		};
	}

	// Derived rune for easy, reactive access to the current page's sections state
	let sections = $derived.by(() => {
		return pageStates.value[routeId]?.resizablePageSections;
	});


	//  Reactive page title based on salesTotalByStore table inputParams
	let title = $derived.by(() => {
		return "";
	})

	$effect(() => {
		open = salesTotalByStoreTable.openInputParams;
	})

	onMount(() => {
		open = !salesTotalByStoreTable.hasInputParams;
	})

	beforeNavigate(() => {
		salesTotalByStoreTable.openInputParams = false;
		destroy = true;
	})
</script>


{#if open}
	<InputParams
		bind:open
		type="clientSide"
		defaultInputParams={SalesTotalByStoreInputParams}
		selectOptions={[]}
	/>
{/if}



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
					<p class="text-xs text-ellipsis line-clamp-1">
						{@html title}
					</p>
				</div>
			{:else}
				<div class="w-1"></div>
			{/if}
		</div>


		{#if pageStates.value[routeId].resizablePageSections}
			<div class="flex items-center gap-1 h-8 bg-white px-2 mr-2 rounded-md border border-slate-300">
				<Checkbox
					class="size-4"
					bind:checked={pageStates.value[routeId].resizablePageSections.salesTotalSubdetailGroupSection.open}
				/>

				<p class="text-xs font-bold">Zobrazit detail </p>
			</div>
		{/if}


		<FilterAndPresetButtons
			bind:table={activeTable}
			{routeId}
		/>


		{#if showFulltextSearch.value === true}
			<div
				class="hidden md:flex items-center h-8"
			>
				<Input
					class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
					placeholder={m.components_header_search_placeholder()}
					type="text"
					bind:value={activeTable.fulltextFilterValue}
				/>
			</div>
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper
		border={false}
		background={false}
	>
		{#if !destroy && sections && pageStates.value[routeId].resizablePageSections}
			<PaneGroup
				direction="horizontal"
				class="rounded bg-slate-100"
				onLayoutChange={(sizes: number[]) => {
					if (sizes.length === 2 && pageStates.value[routeId].resizablePageSections) {
						pageStates.value[routeId].resizablePageSections.salesTotalByStoreSection.size = sizes[0];
						pageStates.value[routeId].resizablePageSections.salesTotalSubdetailGroupSection.size = sizes[1];
					}
				}}
			>
				<Pane
					minSize={20}
					defaultSize={sections.salesTotalByStoreSection.size || 50}
					class={`${
						sections.salesTotalByStoreSection.focused && sections.salesTotalSubdetailGroupSection.open
							? "border-albi-500 "
							: "border-slate-300"
					} bg-white rounded-lg border`}
					onclick={() => setPaneFocus(sections, routeId, 'salesTotalByStoreSection')}
				>
					<AgGridCSWrapper
						table={salesTotalByStoreTable}
						gridOptionsCustom={SalesTotalByStoreAgGridDef}
						headerTranslations={SalesTotalByStoreHeaderTranslations}
					/>
				</Pane>


				{#if sections.salesTotalSubdetailGroupSection.open}
					<PaneResizer class="bg-slate-100 w-1" />

					<Pane
						minSize={20}
						defaultSize={sections.salesTotalSubdetailGroupSection.size || 50}
						class={`rounded-lg`}
					>
						<PaneGroup
							direction="vertical"
							onLayoutChange={(sizes: number[]) => {
								if (sizes.length === 2 && pageStates.value[routeId].resizablePageSections) {
									pageStates.value[routeId].resizablePageSections.salesTotalByStoreDetailSection.size = sizes[0];
									pageStates.value[routeId].resizablePageSections.salesSubdetailByCostlevelSection.size = sizes[1];
								}
							}}
						>
							<Pane
								minSize={18}
								defaultSize={sections.salesTotalByStoreDetailSection.size || 50}
								class={`${
									sections.salesTotalByStoreDetailSection.focused
										? "border-albi-500 "
										: "border-slate-300"
								} bg-white rounded-lg border`}
								onclick={() => setPaneFocus(sections, routeId, 'salesTotalByStoreDetailSection')}
							>
								<AgGridCSWrapper
									table={salesTotalByStoreDetailTable}
									gridOptionsCustom={SalesTotalByStoreDetailAgGridDef}
									headerTranslations={SalesTotalByStoreDetailHeaderTranslations}
								/>
							</Pane>

							<PaneResizer class="bg-slate-100 h-1" />

							<Pane
								minSize={18}
								defaultSize={sections.salesSubdetailByCostlevelSection.size || 50}
								class={`${
									sections.salesSubdetailByCostlevelSection.focused
										? "border-albi-500 "
										: "border-slate-300"
								} bg-white rounded-lg border`}
								onclick={() => setPaneFocus(sections, routeId, 'salesSubdetailByCostlevelSection')}
							>
								<AgGridCSWrapper
									table={salesSubdetailByCostLevelTable}
									gridOptionsCustom={SalesSubdetailByCostlevelAgGridDef}
									headerTranslations={SalesSubdetailByCostlevelHeaderTranslations}
								/>
							</Pane>
						</PaneGroup>
					</Pane>
				{/if}
			</PaneGroup>
		{/if}
	</MainContentWrapper>
</PageWrapper>

