<script lang="ts">
	import {
		SalesTotalByDivisionAgGridDef, salesTotalByDivisionHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionAgGridDef.js";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {getContext, onMount} from "svelte";
	import { PaneGroup, Pane, PaneResizer } from "paneforge";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {beforeNavigate, goto} from "$app/navigation";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {
		InputParamsSalesTotalByDivision
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/input-params/salesTotalByDivisionInputParams";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import deepcopy from "deepcopy";
	import {
		SalesTotalByDivisionSubdetailProductlineAgGridDef, SalesTotalByDivisionSubdetailProductlineHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineAgGridDef.js";
	import {
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef,
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef.js";
	import {
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef,
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef.js";
	import type {CellDoubleClickedEvent, GridOptions, RowDoubleClickedEvent} from "ag-grid-enterprise";
	import {redirect} from "@sveltejs/kit";


	let pageSections: {
		linieSection: boolean;
		kspSection: boolean;
		ksSection: boolean;
	} = getContext("pageSections")


	showFulltextSearch.value = true;
	pageKeys.value = {
		value: [
			"SalesTotalByDivision",
			"SalesTotalByDivisionSubdetailProductline",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"
		],
		index: 0
	};

	let divisionTable: AgGridTableType = $state(agGridTables.value["SalesTotalByDivision"]);
	let linieTable: AgGridTableType = $state(agGridTables.value["SalesTotalByDivisionSubdetailProductline"])
	let klpTable: AgGridTableType = $state(agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"]);
	let ksTable: AgGridTableType = $state(agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"]);

	$effect(() => {
		if (
			divisionTable.selectedRows.length > 0 &&
			pageSections.linieSection
		) {
			let linieInputParams = deepcopy(divisionTable.loadedInputParams);

			if (linieInputParams.inputs) {
				linieInputParams.inputs = linieInputParams.inputs.concat([{
					field: "divisionId",
					type: "number",
					value: divisionTable.selectedRows[0][divisionTable.identificationKey],
				}])
			}

			loadInputParamsInTable(
				linieTable,
				linieInputParams,
				"clientSide",
				{ fulltextEnabled: true, columnFiltersEnabled: true }
			);
		}
	})


	$effect(() => {
		if (linieTable.selectedRows.length > 0) {
			if (pageSections.kspSection) {
				let klpInputParams = deepcopy(linieTable.loadedInputParams);

				if (klpInputParams.inputs) {
					klpInputParams.inputs = klpInputParams.inputs.concat([{
						field: "productlineid",
						type: "number",
						value: linieTable.selectedRows[0][linieTable.identificationKey],
					}])
				}

				loadInputParamsInTable(
					klpTable,
					klpInputParams,
					"clientSide",
					{fulltextEnabled: true, columnFiltersEnabled: true}
				);
			}
		} else {
			klpClearRowData = true;
		}
	})

	$effect(() => {
		if (klpTable.selectedRows.length > 0) {
			if (pageSections.ksSection) {
				let ksInputParams = deepcopy(divisionTable.loadedInputParams);

				if (ksInputParams.inputs) {
					ksInputParams.inputs = ksInputParams.inputs.concat([{
						field: "costlevelcode",
						type: "text",
						value: klpTable.selectedRows[0][klpTable.identificationKey],
					}])
				}

				loadInputParamsInTable(
					ksTable,
					ksInputParams,
					"clientSide",
					{fulltextEnabled: true, columnFiltersEnabled: true}
				);
			}
		} else {
			ksClearRowData = true
		}
	})

	let open = $state(false);
	let destroy = $state(false);
	let divisionPaneFocused = $state(true);
	let liniePaneFocused = $state(false);
	let klpPaneFocused = $state(false);
	let ksPaneFocused = $state(false);
	let klpClearRowData = $state(false);
	let ksClearRowData = $state(false);

	$effect(() => {
		open = divisionTable.openInputParams;
	})

	onMount(() => {
		open = !divisionTable.hasInputParams;
	})

	beforeNavigate(() => {
		divisionTable.openInputParams = false;
		destroy = true;
	})


	$effect(() => {
		if (
			pageSections.linieSection === false &&
			(liniePaneFocused || klpPaneFocused || ksPaneFocused)
		) {
			divisionPaneFocused = true;
			liniePaneFocused = false;
			klpPaneFocused = false;
			ksPaneFocused = false;
			pageKeys.value.index = 0;
		}

		if (
			pageSections.kspSection === false &&
			(klpPaneFocused || ksPaneFocused)
		) {
			divisionPaneFocused = false;
			liniePaneFocused = true;
			klpPaneFocused = false;
			ksPaneFocused = false;
			pageKeys.value.index = 1;
		}

		if (
			pageSections.ksSection === false &&
			ksPaneFocused
		) {
			divisionPaneFocused = false;
			liniePaneFocused = false;
			klpPaneFocused = true;
			ksPaneFocused = false;
			pageKeys.value.index = 2;
		}
	})



	const divisionCustomGridOptions: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent<any>) {

			goto("/prodej/analyza-prodeju/po-zakaznicich")
		},
	}
</script>





{#if open}
	<InputParams
		bind:open
		type="clientSide"
		defaultInputParams={InputParamsSalesTotalByDivision}
		selectOptions={[]}
	/>
{/if}



{#if !destroy}
	<PaneGroup direction="vertical" class="rounded">
		<Pane
			defaultSize={50}
			minSize={10}
			class={`${divisionPaneFocused && pageSections.linieSection ? "border-albi-500 " : "border-slate-300"} bg-white rounded-lg border`}
			onclick={() => {
				divisionPaneFocused = true;
				liniePaneFocused = false;
				klpPaneFocused = false;
				ksPaneFocused = false;
				pageKeys.value.index = 0;
			}}
		>
			<AgGridCSWrapper
				table={divisionTable}
				gridOptionsCustom={{...SalesTotalByDivisionAgGridDef, ...divisionCustomGridOptions}}
				headerTranslations={salesTotalByDivisionHeaderTranslations}
				allowRibbonActions={divisionPaneFocused}
			/>
		</Pane>


		{#if pageSections.linieSection}
			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				defaultSize={50}
				minSize={10}
				onclick={() => {
					divisionPaneFocused = false;
					liniePaneFocused = true;
					klpPaneFocused = false;
					ksPaneFocused = false;
					pageKeys.value.index = 1;
				}}

				class={`${liniePaneFocused ? "border-albi-500 " : "border-slate-300"} rounded-lg border bg-white`}
			>
				<AgGridCSWrapper
					bind:table={agGridTables.value["SalesTotalByDivisionSubdetailProductline"]}
					gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineAgGridDef}
					headerTranslations={SalesTotalByDivisionSubdetailProductlineHeaderTranslations}
					allowRibbonActions={liniePaneFocused}
				/>
			</Pane>
		{/if}


		{#if pageSections.kspSection}
			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				minSize={10}
				defaultSize={50}
				onclick={() => {
					divisionPaneFocused = false;
					liniePaneFocused = false;
					klpPaneFocused = true;
					ksPaneFocused = false;
					pageKeys.value.index = 2;
				}}
				class={`${klpPaneFocused ? "border-albi-500 " : "border-slate-300"} rounded-lg border bg-white`}
			>
				<AgGridCSWrapper
					bind:table={agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"]}
					gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef}
					headerTranslations={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations}
					allowRibbonActions={klpPaneFocused}
					bind:clearRowData={klpClearRowData}
				/>
			</Pane>
		{/if}


		{#if pageSections.ksSection}
			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				defaultSize={20}
				minSize={10}
				onclick={() => {
					divisionPaneFocused = false;
					liniePaneFocused = false;
					klpPaneFocused = false;
					ksPaneFocused = true;
					pageKeys.value.index = 3;
				}}
				class={`${ksPaneFocused ? "border-albi-500 " : "border-slate-300"} rounded-lg border bg-white`}
			>
				<AgGridCSWrapper
					bind:table={agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"]}
					gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityAgGridDef}
					headerTranslations={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantityHeaderTranslations}
					allowRibbonActions={ksPaneFocused}
					bind:clearRowData={ksClearRowData}
				/>
			</Pane>
		{/if}
	</PaneGroup>
{/if}
