<script lang="ts">
	import {
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations,
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef";
	import {
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef,
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef";
	import {
		SalesTotalByDivisionSubdetailProductlineAgGridDef,
		SalesTotalByDivisionSubdetailProductlineHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineAgGridDef";
	import {
		SalesTotalByDivisionAgGridDef,
		salesTotalByDivisionHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionAgGridDef";
	import {InputParamsSalesTotalByDivision} from '$lib/definitions/routes/prodej/analyza-prodeju/celkem/input-params/salesTotalByDivisionInputParams';
	import {pageCodes, pageStates, showFulltextSearch} from '$lib/runes/page.svelte';
	import {agGridTables, pageKeys} from '$lib/runes/table.svelte';
	import {Separator} from '$lib/components/ui/separator';
	import {Checkbox} from '$lib/components/ui/checkbox';
	import {page} from '$app/state';
	import {onCellDoubleClickedSalesTotalByDivision} from '$lib/utils/routes/prodej/analyza-prodeju/celkem/onCellDoubleClickedSalesTotalByDivision';
	import {getPageTitleSalesTotalByDivision} from '$lib/utils/routes/prodej/analyza-prodeju/celkem/getPageTitleSalesTotalByDivision';
	import {Pane, PaneGroup, PaneResizer} from 'paneforge';
	import {loadInputParamsInTable} from '$lib/utils/components/input-params/loadInputParamsInTable';
	import { beforeNavigate} from '$app/navigation';
	import {setPaneFocus} from "$lib/utils/components/pane-forge/setPaneFocus";
	import {onMount} from 'svelte';
	import deepcopy from 'deepcopy';
	import {
		handlePaneLayoutChange
	} from "$lib/utils/components/pane-forge/handlePaneLayoutChange";
	import type { AgGridTableType } from '$lib/types/components/table/table';
	import FilterAndPresetButtons from '$lib/components/button/FilterAndPresetButtons.svelte';
	import TabFulltextWrapper from '$lib/components/wrapper/TabFulltextWrapper.svelte';
	import MainContentWrapper from '$lib/components/wrapper/MainContentWrapper.svelte';
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import InputParams from '$lib/components/input-params/InputParams.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import PageTitle from "$lib/components/page/PageTitle.svelte";
	import type { CellDoubleClickedEvent, GridOptions } from 'ag-grid-enterprise';
	import * as m from '$lib/paraglide/messages';
	import Fulltext from "$lib/components/form/Fulltext.svelte";

	// Initialize runes and other state variables
	const routeId = $state(page.route.id || "");
	let destroy = $state(false);
	let open = $state(false);
	showFulltextSearch.value = true;


	// Initialize pageCodes for all tables on current page
	pageKeys.value = {
		value: pageCodes.value.get(routeId) || [],
		index: 0
	};


	// State for tables and UI
	let salesTotalByDivisionTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivision']);

	let salesTotalByDivisionSubdetailProductlineTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductline']);
	let salesTotalByDivisionSubdetailProductlineClearRowData = $state(false);

	let salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel']);
	let salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = $state(false);

	let salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity']);
	let salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = $state(false);

	let activeTable = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);


	// Safely initialize the state for the current page if it doesn't exist
	if (routeId && !pageStates.value[routeId]?.resizablePageSections) {
		pageStates.value[routeId] = {
			resizablePageSections: {
				salesTotalByDivisionSection: { open: true, size: 50, focused: true, index: 0 },
				salesTotalByDivisionSubdetailProductlineSection: { open: false, size: 50, focused: false, index: 1 },
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection: { open: false, size: 50, focused: false, index: 2 },
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection: { open: false, size: 50, focused: false, index: 3 }
			}
		};
	}


	// Derived rune for easy, reactive access to the current page's sections state
	let sections = $derived.by(() => {
		return pageStates.value[routeId]?.resizablePageSections;
	});


	// Reactive page title based on division table inputParams
	let title = $derived.by(() => {
		if (salesTotalByDivisionTable) {
			return salesTotalByDivisionTable.loadedInputParams.inputs
				? getPageTitleSalesTotalByDivision(salesTotalByDivisionTable.loadedInputParams.inputs)
				: '';
		}

		return '';
	});


	// Effect to manage cascading checkbox logic
	$effect(() => {
		if (!routeId || !sections) return;
		const currentSections = pageStates.value[routeId].resizablePageSections;

		if (currentSections) {
			if (!currentSections.salesTotalByDivisionSubdetailProductlineSection.open && currentSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open) {
				currentSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open = false;
			}

			if (!currentSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open && currentSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.open) {
				currentSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.open = false;
			}
		}
	});


	// Effect to load data for 'linie' section
	$effect(() => {
		if (salesTotalByDivisionTable) {
			if (salesTotalByDivisionTable.selectedRows.length > 0 && sections?.salesTotalByDivisionSubdetailProductlineSection.open) {
				const linieInputParams = deepcopy(salesTotalByDivisionTable.loadedInputParams);
				salesTotalByDivisionSubdetailProductlineClearRowData = true;
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = true;
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;

				if (linieInputParams.inputs) {
					linieInputParams.inputs.push({
						field: 'divisionId',
						type: 'number',
						value: salesTotalByDivisionTable.selectedRows[0][salesTotalByDivisionTable.identificationKey]
					});
				}

				if (salesTotalByDivisionSubdetailProductlineTable) {
					loadInputParamsInTable(salesTotalByDivisionSubdetailProductlineTable, linieInputParams, 'clientSide', {
						fulltextEnabled: true,
						columnFiltersEnabled: true
					});
				}
			}
		}
	});


	$effect(() => {
		if (salesTotalByDivisionTable) {
			if (salesTotalByDivisionTable.loadedInputParams) {
				salesTotalByDivisionSubdetailProductlineClearRowData = true;
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = true;
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;
			}
		}
	})


	// Effect to load data for 'ksp' (KLP) section
	$effect(() => {
		if (salesTotalByDivisionSubdetailProductlineTable) {
			if (salesTotalByDivisionSubdetailProductlineTable.selectedRows.length > 0) {
				if (sections?.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open) {
					const klpInputParams = deepcopy(salesTotalByDivisionSubdetailProductlineTable.loadedInputParams);
					salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = true;
					salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;

					if (klpInputParams.inputs) {
						klpInputParams.inputs.push({
							field: 'productlineid',
							type: 'number',
							value: salesTotalByDivisionSubdetailProductlineTable.selectedRows[0][salesTotalByDivisionSubdetailProductlineTable.identificationKey]
						});
					}

					if (salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable) {
						loadInputParamsInTable(salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable, klpInputParams, 'clientSide', {
							fulltextEnabled: true,
							columnFiltersEnabled: true
						});
					}
				}
			} else {
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = true;
			}
		}
	});


	// Effect to load data for 'ks' section
	$effect(() => {
		if (salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable) {
			if (salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable.selectedRows.length > 0) {
				if (sections?.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.open) {
					const ksInputParams = deepcopy(salesTotalByDivisionTable.loadedInputParams);
					salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;

					if (ksInputParams.inputs) {
						ksInputParams.inputs.push({
							field: 'costlevelcode',
							type: 'text',
							value: salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable.selectedRows[0][salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable.identificationKey]
						});
					}

					if (salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityTable) {
						loadInputParamsInTable(salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityTable, ksInputParams, 'clientSide', {
							fulltextEnabled: true,
							columnFiltersEnabled: true
						});
					}
				}
			} else {
				salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;
			}
		}

	});


	$effect(() => {
		if (salesTotalByDivisionTable) open = salesTotalByDivisionTable.openInputParams;
	});


	onMount(() => {
		if (salesTotalByDivisionTable) {
			open = !salesTotalByDivisionTable.hasInputParams;
			salesTotalByDivisionSubdetailProductlineClearRowData = true;
			salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData = true;
			salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData = true;
		}
	});


	beforeNavigate(() => {
		if (salesTotalByDivisionTable) salesTotalByDivisionTable.openInputParams = false;
	})


	// Custom grid options with double-click handlers
	const divisionCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('division', salesTotalByDivisionTable, salesTotalByDivisionSubdetailProductlineTable, salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable, event)
		},
	};

	const linieCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('linie', salesTotalByDivisionTable, salesTotalByDivisionSubdetailProductlineTable, salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable, event)
		}
	};

	const klpCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('costLevel', salesTotalByDivisionTable, salesTotalByDivisionSubdetailProductlineTable, salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable, event)
		}
	};
</script>



<svelte:head>
	<title>Analýza prodejů - Celkem | Albiline</title>
</svelte:head>



{#if open}
	<InputParams
		bind:open
		type="clientSide"
		defaultInputParams={InputParamsSalesTotalByDivision}
		selectOptions={[]}
	/>
{/if}



<PageWrapper>
	<TabFulltextWrapper>
		<div class="flex-1 flex justify-between items-center mr-2">
			<PageTitle {title}/>

			{#if sections}
				<div
					class="min-w-[304px] flex text-xs justify-end items-center gap-1.5 bg-white h-8 border border-slate-300 rounded-md w-fit px-2"
				>
					<b>Detail: </b>
					{#if pageStates.value[routeId].resizablePageSections}
						<div class="flex items-center gap-1">
							<Checkbox
								class="size-4"
								bind:checked={pageStates.value[routeId].resizablePageSections.salesTotalByDivisionSubdetailProductlineSection.open}
							/>
							<p>po liniích</p>
						</div>

						<Separator
							orientation="vertical"
							class="bg-albi-500 min-h-3 w-[2px]"
						/>

						<div class="flex items-center gap-1">
							<Checkbox
								class="size-4"
								disabled={!sections.salesTotalByDivisionSubdetailProductlineSection.open}
								bind:checked={pageStates.value[routeId].resizablePageSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open}
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
								disabled={!sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open}
								bind:checked={pageStates.value[routeId].resizablePageSections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.open}
							/>
							<p>po kusech</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		{#if activeTable}
			<FilterAndPresetButtons
				bind:table={activeTable}
				{routeId}
			/>

			<Fulltext bind:table={activeTable}>
		{/if}
	</TabFulltextWrapper>


	<MainContentWrapper border={false}>
		{#if !destroy && sections && pageStates.value[routeId].resizablePageSections}
			<PaneGroup
				direction="vertical"
				class="rounded"
				onLayoutChange={(sizes: number[]) => {
					if (pageStates.value[routeId].resizablePageSections) {
						handlePaneLayoutChange(
							pageStates.value[routeId].resizablePageSections,
							sizes
						);
					}
				}}
			>
				<Pane
					defaultSize={sections.salesTotalByDivisionSection.size || 50}
					minSize={18}
					class={`${sections.salesTotalByDivisionSection.focused && sections.salesTotalByDivisionSubdetailProductlineSection.open ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
					onclick={() => setPaneFocus(sections, routeId, 'salesTotalByDivisionSection')}
				>
					{#if salesTotalByDivisionTable}
						<AgGridCSWrapper
							bind:table={salesTotalByDivisionTable}
							gridOptionsCustom={{ ...SalesTotalByDivisionAgGridDef, ...divisionCustomGridOptions }}
							headerTranslations={salesTotalByDivisionHeaderTranslations}
							allowRibbonActions={sections.salesTotalByDivisionSection.focused}
						/>
					{/if}
				</Pane>

				{#if sections.salesTotalByDivisionSubdetailProductlineSection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.salesTotalByDivisionSubdetailProductlineSection.size || 50}
						minSize={18}
						class={`${sections.salesTotalByDivisionSubdetailProductlineSection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'salesTotalByDivisionSubdetailProductlineSection')}
					>
						{#if salesTotalByDivisionSubdetailProductlineTable}
							<AgGridCSWrapper
								bind:table={salesTotalByDivisionSubdetailProductlineTable}
								gridOptionsCustom={{
									...SalesTotalByDivisionSubdetailProductlineAgGridDef,
									...linieCustomGridOptions
								}}
								headerTranslations={SalesTotalByDivisionSubdetailProductlineHeaderTranslations}
								allowRibbonActions={sections.salesTotalByDivisionSubdetailProductlineSection.focused}
								bind:clearRowData={salesTotalByDivisionSubdetailProductlineClearRowData}
								disableLoading={true}
							/>
						{/if}
					</Pane>
				{/if}

				{#if sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.size || 50}
						minSize={18}
						class={`${sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection')}
					>
						{#if salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable}
							<AgGridCSWrapper
								bind:table={salesTotalByDivisionSubdetailProductlineSubdetailCostlevelTable}
								gridOptionsCustom={{
								...SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef,
								...klpCustomGridOptions
							}}
								headerTranslations={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations}
								allowRibbonActions={sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelSection.focused}
								bind:clearRowData={salesTotalByDivisionSubdetailProductlineSubdetailCostlevelClearRowData}
								disableLoading={true}
							/>
						{/if}
					</Pane>
				{/if}

				{#if sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.size || 50}
						minSize={13}
						class={`${sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection')}
					>
						{#if salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityTable}
							<AgGridCSWrapper
								bind:table={salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityTable}
								gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef}
								headerTranslations={
									SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations
								}
								allowRibbonActions={sections.salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantitySection.focused}
								bind:clearRowData={salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityClearRowData}
								disableLoading={true}
							/>
						{/if}
					</Pane>
				{/if}
			</PaneGroup>
		{/if}
	</MainContentWrapper>
</PageWrapper>
