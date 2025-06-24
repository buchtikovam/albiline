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
	import {Input} from '$lib/components/ui/input';
	import {page} from '$app/state';
	import {onCellDoubleClickedSalesTotalByDivision} from '$lib/utils/routes/prodej/analyza-prodeju/celkem/onCellDoubleClickedSalesTotalByDivision';
	import {getPageTitleSalesTotalByDivision} from '$lib/utils/routes/prodej/analyza-prodeju/celkem/getPageTitleSalesTotalByDivision';
	import {Pane, PaneGroup, PaneResizer} from 'paneforge';
	import {loadInputParamsInTable} from '$lib/utils/components/input-params/loadInputParamsInTable';
	import {afterNavigate, beforeNavigate} from '$app/navigation';
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
	let salesTotalByDivisionTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivision']); // todo: rename all to page codes
	let linieTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductline']);
	let linieClearRowData = $state(false);
	let klpTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel']);
	let klpClearRowData = $state(false);
	let ksTable: AgGridTableType = $state(agGridTables.value['SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity']);
	let ksClearRowData = $state(false);
	let activeTable = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);


	// Safely initialize the state for the current page if it doesn't exist
	if (routeId && !pageStates.value[routeId]?.resizablePageSections) {
		pageStates.value[routeId] = {
			resizablePageSections: {
				salesTotalByDivisionSection: { open: true, size: 50, focused: true, index: 0 },
				linieSection: { open: false, size: 50, focused: false, index: 1 },
				klpSection: { open: false, size: 50, focused: false, index: 2 },
				ksSection: { open: false, size: 50, focused: false, index: 3 }
			}
		};
	}


	// Derived rune for easy, reactive access to the current page's sections state
	let sections = $derived.by(() => {
		return pageStates.value[routeId]?.resizablePageSections;
	});


	// Reactive page title based on division table inputParams
	let title = $derived.by(() => {
		return salesTotalByDivisionTable.loadedInputParams.inputs
			? getPageTitleSalesTotalByDivision(salesTotalByDivisionTable.loadedInputParams.inputs)
			: '';
	});


	// Effect to manage cascading checkbox logic
	$effect(() => {
		if (!routeId || !sections) return;
		const currentSections = pageStates.value[routeId].resizablePageSections;

		if (currentSections) {
			if (!currentSections.linieSection.open && currentSections.klpSection.open) {
				currentSections.klpSection.open = false;
			}

			if (!currentSections.klpSection.open && currentSections.ksSection.open) {
				currentSections.ksSection.open = false;
			}
		}
	});


	// Effect to load data for 'linie' section
	$effect(() => {
		if (salesTotalByDivisionTable.selectedRows.length > 0 && sections?.linieSection.open) {
			const linieInputParams = deepcopy(salesTotalByDivisionTable.loadedInputParams);
			linieClearRowData = true;
			klpClearRowData = true;
			ksClearRowData = true;

			if (linieInputParams.inputs) {
				linieInputParams.inputs.push({
					field: 'divisionId',
					type: 'number',
					value: salesTotalByDivisionTable.selectedRows[0][salesTotalByDivisionTable.identificationKey]
				});
			}
			loadInputParamsInTable(linieTable, linieInputParams, 'clientSide', {
				fulltextEnabled: true,
				columnFiltersEnabled: true
			});
		}
	});


	$effect(() => {
		if (salesTotalByDivisionTable.loadedInputParams) {
			linieClearRowData = true;
			klpClearRowData = true;
			ksClearRowData = true;

		}
	})


	// Effect to load data for 'ksp' (KLP) section
	$effect(() => {
		if (linieTable.selectedRows.length > 0) {
			if (sections?.klpSection.open) {
				const klpInputParams = deepcopy(linieTable.loadedInputParams);
				klpClearRowData = true;
				ksClearRowData = true;

				if (klpInputParams.inputs) {
					klpInputParams.inputs.push({
						field: 'productlineid',
						type: 'number',
						value: linieTable.selectedRows[0][linieTable.identificationKey]
					});
				}
				loadInputParamsInTable(klpTable, klpInputParams, 'clientSide', {
					fulltextEnabled: true,
					columnFiltersEnabled: true
				});
			}
		} else {
			klpClearRowData = true;
		}
	});


	// Effect to load data for 'ks' section
	$effect(() => {
		if (klpTable.selectedRows.length > 0) {
			if (sections?.ksSection.open) {
				const ksInputParams = deepcopy(salesTotalByDivisionTable.loadedInputParams);
				ksClearRowData = true;

				if (ksInputParams.inputs) {
					ksInputParams.inputs.push({
						field: 'costlevelcode',
						type: 'text',
						value: klpTable.selectedRows[0][klpTable.identificationKey]
					});
				}
				loadInputParamsInTable(ksTable, ksInputParams, 'clientSide', {
					fulltextEnabled: true,
					columnFiltersEnabled: true
				});
			}
		} else {
			ksClearRowData = true;
		}
	});


	$effect(() => {
		open = salesTotalByDivisionTable.openInputParams;
	});


	onMount(() => {
		open = !salesTotalByDivisionTable.hasInputParams;
		linieClearRowData = true;
		klpClearRowData = true;
		ksClearRowData = true;
	});


	beforeNavigate(() => {
		salesTotalByDivisionTable.openInputParams = false;
	})


	// Custom grid options with double-click handlers
	const divisionCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('division', salesTotalByDivisionTable, linieTable, klpTable, event)
		},
	};

	const linieCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('linie', salesTotalByDivisionTable, linieTable, klpTable, event)
		}
	};

	const klpCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByDivision('costLevel', salesTotalByDivisionTable, linieTable, klpTable, event)
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
								bind:checked={pageStates.value[routeId].resizablePageSections.linieSection.open}
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
								disabled={!sections.linieSection.open}
								bind:checked={pageStates.value[routeId].resizablePageSections.klpSection.open}
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
								disabled={!sections.klpSection.open}
								bind:checked={pageStates.value[routeId].resizablePageSections.ksSection.open}
							/>
							<p>po kusech</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>

		<FilterAndPresetButtons
			bind:table={activeTable}
			{routeId}
		/>

		{#if showFulltextSearch.value === true}
			<div class="hidden md:flex items-center h-8">
				<Input
					class="xl:w-80 lg:w-60 w-40 h-8 border border-slate-300 focus-visible:border-albi-500"
					placeholder={m.components_header_search_placeholder()}
					type="text"
					bind:value={activeTable.fulltextFilterValue}
				/>
			</div>
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
					class={`${sections.salesTotalByDivisionSection.focused && sections.linieSection.open ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
					onclick={() => setPaneFocus(sections, routeId, 'salesTotalByDivisionSection')}
				>
					<AgGridCSWrapper
						bind:table={salesTotalByDivisionTable}
						gridOptionsCustom={{ ...SalesTotalByDivisionAgGridDef, ...divisionCustomGridOptions }}
						headerTranslations={salesTotalByDivisionHeaderTranslations}
						allowRibbonActions={sections.salesTotalByDivisionSection.focused}
					/>
				</Pane>

				{#if sections.linieSection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.linieSection.size || 50}
						minSize={18}
						class={`${sections.linieSection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'linieSection')}
					>
						<AgGridCSWrapper
							bind:table={linieTable}
							gridOptionsCustom={{
								...SalesTotalByDivisionSubdetailProductlineAgGridDef,
								...linieCustomGridOptions
							}}
							headerTranslations={SalesTotalByDivisionSubdetailProductlineHeaderTranslations}
							allowRibbonActions={sections.linieSection.focused}
							bind:clearRowData={linieClearRowData}
							disableLoading={true}
						/>
					</Pane>
				{/if}

				{#if sections.klpSection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.klpSection.size || 50}
						minSize={18}
						class={`${sections.klpSection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'klpSection')}
					>
						<AgGridCSWrapper
							bind:table={klpTable}
							gridOptionsCustom={{
								...SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef,
								...klpCustomGridOptions
							}}
							headerTranslations={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations}
							allowRibbonActions={sections.klpSection.focused}
							bind:clearRowData={klpClearRowData}
							disableLoading={true}
						/>
					</Pane>
				{/if}

				{#if sections.ksSection.open}
					<PaneResizer class="bg-slate-100 h-1" />
					<Pane
						defaultSize={sections.ksSection.size || 50}
						minSize={13}
						class={`${sections.ksSection.focused ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
						onclick={() => setPaneFocus(sections, routeId, 'ksSection')}
					>
						<AgGridCSWrapper
							bind:table={ksTable}
							gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef}
							headerTranslations={
								SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations
							}
							allowRibbonActions={sections.ksSection.focused}
							bind:clearRowData={ksClearRowData}
							disableLoading={true}
						/>
					</Pane>
				{/if}
			</PaneGroup>
		{/if}
	</MainContentWrapper>
</PageWrapper>
