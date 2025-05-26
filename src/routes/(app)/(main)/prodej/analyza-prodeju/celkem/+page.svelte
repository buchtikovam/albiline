<script lang="ts">
	import {
		SalesTotalByDivisionAgGridDef, salesTotalByDivisionHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionAgGridDef.svelte.js";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {getContext, onMount} from "svelte";
	import { PaneGroup, Pane, PaneResizer } from "paneforge";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {beforeNavigate} from "$app/navigation";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {
		InputParamsSalesTotalByDivision
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/input-params/salesTotalByDivisionInputParams";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import deepcopy from "deepcopy";
	import {
		SalesTotalByDivisionSubdetailProductlineAgGridDef, SalesTotalByDivisionSubdetailProductlineHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineAgGridDef.svelte";
	import {
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef,
		SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef.svelte";


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
	let kspTable: AgGridTableType = $state(agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"]);

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

			// if (
			// 	divisionTable.selectedRows.length > 0 &&
			// 	linieTable.selectedRows.length > 0 &&
			// 	pageSections.linieSection &&
			// 	pageSections.kspSection
			// ) {
			// 	let kspInputParams = deepcopy(linieTable.loadedInputParams);
			//
			// 	if (kspInputParams.inputs) {
			// 		kspInputParams.inputs = kspInputParams.inputs.concat([{
			// 			field: "productlineid",
			// 			type: "number",
			// 			value: linieTable.selectedRows[0][linieTable.identificationKey],
			// 		}])
			// 	}
			//
			// 	loadInputParamsInTable(
			// 		kspTable,
			// 		kspInputParams,
			// 		"clientSide",
			// 		{ fulltextEnabled: true, columnFiltersEnabled: true }
			// 	);
			// }
		}
	})

	let open = $state(false);
	let destroy = $state(false);
	let divisionPaneFocused = $state(true);
	let liniePaneFocused = $state(false);
	let kspPaneFocused = $state(false);
	let ksPaneFocused = $state(false);

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
			(liniePaneFocused || kspPaneFocused || ksPaneFocused)
		) {
			divisionPaneFocused = true;
			liniePaneFocused = false;
			kspPaneFocused = false;
			ksPaneFocused = false;
			pageKeys.value.index = 0;
		}

		if (
			pageSections.kspSection === false &&
			(kspPaneFocused || ksPaneFocused)
		) {
			divisionPaneFocused = false;
			liniePaneFocused = true;
			kspPaneFocused = false;
			ksPaneFocused = false;
			pageKeys.value.index = 1;
		}

		if (
			pageSections.ksSection === false &&
			ksPaneFocused
		) {
			divisionPaneFocused = false;
			liniePaneFocused = false;
			kspPaneFocused = true;
			ksPaneFocused = false;
			pageKeys.value.index = 2;
		}
	})
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
				kspPaneFocused = false;
				ksPaneFocused = false;
				pageKeys.value.index = 0;
			}}
		>
			<AgGridCSWrapper
				table={divisionTable}
				gridOptionsCustom={SalesTotalByDivisionAgGridDef}
				headerTranslations={salesTotalByDivisionHeaderTranslations}
				allowRibbonActions={divisionPaneFocused}
			/>
		</Pane>


		{#if pageSections.linieSection && divisionTable.selectedRows.length > 0}
			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				defaultSize={50}
				minSize={10}
				onclick={() => {
					divisionPaneFocused = false;
					liniePaneFocused = true;
					kspPaneFocused = false;
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
					kspPaneFocused = true;
					ksPaneFocused = false;
					pageKeys.value.index = 2;
				}}
				class={`${kspPaneFocused ? "border-albi-500 " : "border-slate-300"} rounded-lg border bg-white`}
			>
				<AgGridCSWrapper
					bind:table={agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"]}
					gridOptionsCustom={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelAgGridDef}
					headerTranslations={SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelHeaderTranslations}
					allowRibbonActions={kspPaneFocused}
				/>
			</Pane>
		{/if}


		{#if pageSections.ksSection}
			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				defaultSize={10}
				minSize={10}
				onclick={() => {
					divisionPaneFocused = false;
					liniePaneFocused = false;
					kspPaneFocused = false;
					ksPaneFocused = true;
					pageKeys.value.index = 3;
				}}
				class={`${ksPaneFocused ? "border-albi-500 " : "border-slate-300"} rounded-lg border bg-white`}
			>
				ks
			</Pane>
		{/if}
	</PaneGroup>
{/if}
