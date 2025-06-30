<script lang="ts">
	import {PaneGroup, Pane, PaneResizer} from "paneforge";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {pageCodes, pageStates, showFulltextSearch} from "$lib/runes/page.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import FilterAndPresetButtons from "$lib/components/button/FilterAndPresetButtons.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
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
	import deepcopy from "deepcopy";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import PageTitle from "$lib/components/page/PageTitle.svelte";
	import type {CellDoubleClickedEvent, GridApi, GridOptions, IRowNode, ModelUpdatedEvent} from "ag-grid-enterprise";
	import Fulltext from "$lib/components/form/Fulltext.svelte";
	import {
		getPageTitleSalesTotalByStore
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/getPageTitleSalesTotalByStore";
	import {
		onCellDoubleClickedSalesTotalByStore
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/onCellDoubleClickedSalesTotalByStore";
	import {
		onCellDoubleClickedSalesTotalByStoreDetail
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/onCellDoubleClickedSalesTotalByStoreDetail";


	// Use the reactive page state to get the routeId
	const routeId = $state(page.route.id || "");
	let open = $state(false);
	let destroy = $state(false);

	// Initialize runes and other state variables
	showFulltextSearch.value = true;

	// Initialize pageCodes for all tables on current page
	pageKeys.value = {
		value: pageCodes.value.get(routeId)||[],
		index: 0,
	}


	// state for tables and UI
	let salesTotalByStoreTable: AgGridTableType = $state(agGridTables.value['SalesTotalByStore'])

	let salesTotalByStoreDetailTable: AgGridTableType = $state(agGridTables.value['SalesTotalByStoreDetail'])
	let clearSalesTotalByStoreDetailTable = $state(false);

	let clearsalesSubdetailByCostLevelTable = $state(false);
	let salesSubdetailByCostLevelTable: AgGridTableType = $state(agGridTables.value['SalesSubdetailByCostlevel'])

	let activeTable: AgGridTableType = $derived(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);


	//  Reactive page title based on salesTotalByStore table inputParams
	let title = $derived.by(() => {
		if (salesTotalByStoreTable) {
			return getPageTitleSalesTotalByStore(salesTotalByStoreTable.loadedInputParams.inputs)
		}

		return "";
	})


	// initialize the state for current page if it doesn't exist
	if (routeId && !pageStates.value[routeId]?.resizablePageSections) {
		pageStates.value[routeId] = {
			resizablePageSections: {
				salesTotalByStoreSection: { open: true, size: 50, focused: true, index: 0 },
				salesTotalSubdetailGroupSection: { open: false, size: 50, focused: false, index: -1 }, // wrapper section
				salesTotalByStoreDetailSection: { open: true, size: 50, focused: false, index: 1 },
				salesSubdetailByCostlevelSection: { open: true, size: 50, focused: false, index: 2 }
			}
		};
	}


	// Derived rune for easy, reactive access to the current page's sections state
	let sections = $derived.by(() => {
		return pageStates.value[routeId]?.resizablePageSections;
	});


	// Effect to load data for detail section tables
	$effect(() => {
		if (sections) {
			if (
				sections.salesTotalSubdetailGroupSection.open &&
				salesTotalByStoreTable.selectedRows.length > 0
			) {
				const mainInputs = deepcopy(salesTotalByStoreTable.loadedInputParams);
				const selectedRow = salesTotalByStoreTable.selectedRows[0];
				let salesTotalByStoreDetailSectionInputParams = mainInputs;

				if (mainInputs.inputs) {
					clearSalesTotalByStoreDetailTable = true;
					clearsalesSubdetailByCostLevelTable = true;

					const dateFrom = mainInputs.inputs.find(f => f.field === 'datefrom')?.value || '';
					const dateTo = mainInputs.inputs.find(f => f.field === 'dateto')?.value || '';
					const formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
					const formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");
					const onlyconsignments = mainInputs.inputs.find(f => f.field === 'onlyconsignments')?.value || false;
					const covercreditnotes = mainInputs.inputs.find(f => f.field === 'covercreditnotes')?.value || false;

					delete salesTotalByStoreDetailSectionInputParams.inputs;

					salesTotalByStoreDetailSectionInputParams.inputs = [
						{
							field: "datefrom",
							type: "date",
							value: formattedDateFrom,
						},
						{
							field: "dateto",
							type: "date",
							value: formattedDateTo,
						},
						{
							field: "salescountrycode",
							type: "enum",
							value: selectedRow.salesCountryCode,
						},
						{
							field: "currency",
							type: "text",
							value: selectedRow.currency,
						},
						{
							field: "customernodecode",
							type: "number",
							value: selectedRow.customerNodeCode
						},
						{
							field: "customernodename",
							type: "text",
							value: selectedRow.customerNodeName,
						},
						{
							field: "deliveryaddresscode",
							type: "number",
							value: selectedRow.deliveryAddressCode
						},
						{
							field: "onlyconsignments",
							type: "boolean",
							value: Boolean(onlyconsignments),
						},
						{
							field: "covercreditnotes",
							type: "boolean",
							value: Boolean(covercreditnotes),
						},
					]

					loadInputParamsInTable(
						salesTotalByStoreDetailTable,
						salesTotalByStoreDetailSectionInputParams,
						'clientSide',
						{
							fulltextEnabled: true,
							columnFiltersEnabled: true
						}
					);

					loadInputParamsInTable(
						salesSubdetailByCostLevelTable,
						salesTotalByStoreDetailSectionInputParams,
						'clientSide',
						{
							fulltextEnabled: true,
							columnFiltersEnabled: true
						}
					);
				}

			}
		}
	});


	$effect(() => {
		open = salesTotalByStoreTable.openInputParams;
	})

	onMount(() => {
		open = !salesTotalByStoreTable.hasInputParams;
	})

	beforeNavigate(() => {
		salesTotalByStoreTable.openInputParams = false;
	})

	let gridContext = $state({
		totalSalesLY: 0,
		totalSalesAY: 0
	});

	function calculateAndRefreshTotals(api: GridApi | null) {
		if (!api) {
			return;
		}

		let currentTotalLY = 0;
		let currentTotalAY = 0;

		// Use forEachNodeAfterFilter to only consider rows that are currently displayed.
		api.forEachNodeAfterFilter((node: IRowNode) => {
			if (node.data) {
				// Safely add to totals, ensuring the value is a valid number.
				if (typeof node.data.sales_LY === 'number' && isFinite(node.data.sales_LY)) {
					currentTotalLY += node.data.sales_LY;
				}
				if (typeof node.data.sales_AY === 'number' && isFinite(node.data.sales_AY)) {
					currentTotalAY += node.data.sales_AY;
				}
			}
		});

		// Update the reactive context object
		gridContext.totalSalesLY = currentTotalLY;
		gridContext.totalSalesAY = currentTotalAY;

		// Force the grid to re-run valueGetters and cellRenderers for the computed columns.
		api.refreshCells({
			columns: ['_computedColumn1', '_computedColumn2'],
			force: true
		});
	}


	// Custom grid options with double-click handlers
	const salesTotalByStoreCustomGridOptions: GridOptions = {
		context: gridContext,

		onModelUpdated: (event: ModelUpdatedEvent) => {
			calculateAndRefreshTotals(event.api);
		},

		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByStore(salesTotalByStoreTable, event);
		},
	};


	const salesTotalByStoreDetailCustomGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent<any>) => {
			onCellDoubleClickedSalesTotalByStoreDetail(salesTotalByStoreDetailTable, event);
		},
	}
</script>


<svelte:head>
	<title>
		Analýza prodejů - Po zákaznících a prodejnách | Albiline
	</title>
</svelte:head>



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
		<PageTitle {title}/>

		{#if pageStates.value[routeId].resizablePageSections}
			<div class="flex items-center gap-1 h-8 bg-white px-2 mr-2 rounded-md border border-slate-300">
				<Checkbox
					class="size-4"
					bind:checked={pageStates.value[routeId].resizablePageSections.salesTotalSubdetailGroupSection.open}
				/>

				<p class="text-xs font-bold">Zobrazit detail </p>
			</div>
		{/if}


		{#if activeTable}
			<FilterAndPresetButtons
				bind:table={activeTable}
				{routeId}
			/>

			<Fulltext bind:table={activeTable} />
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
					{#if salesTotalByStoreTable}
						<AgGridCSWrapper
							table={salesTotalByStoreTable}
							gridOptionsCustom={{...salesTotalByStoreCustomGridOptions, ...SalesTotalByStoreAgGridDef}}
							headerTranslations={SalesTotalByStoreHeaderTranslations}
						/>
					{/if}
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
								{#if salesTotalByStoreDetailTable}
									<AgGridCSWrapper
										table={salesTotalByStoreDetailTable}
										gridOptionsCustom={{...salesTotalByStoreDetailCustomGridOptions, ...SalesTotalByStoreDetailAgGridDef}}
										headerTranslations={SalesTotalByStoreDetailHeaderTranslations}
										clearRowData={clearSalesTotalByStoreDetailTable}
									/>
								{/if}
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
								{#if salesSubdetailByCostLevelTable}
									<AgGridCSWrapper
										table={salesSubdetailByCostLevelTable}
										gridOptionsCustom={SalesSubdetailByCostlevelAgGridDef}
										headerTranslations={SalesSubdetailByCostlevelHeaderTranslations}
										clearRowData={clearsalesSubdetailByCostLevelTable}
									/>
								{/if}
							</Pane>
						</PaneGroup>
					</Pane>
				{/if}
			</PaneGroup>
		{/if}
	</MainContentWrapper>
</PageWrapper>

