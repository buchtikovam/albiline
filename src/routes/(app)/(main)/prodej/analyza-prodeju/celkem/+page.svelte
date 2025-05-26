<script lang="ts">
	import {
		SalesTotalByDivisionAgGridDef, salesTotalByDivisionHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionAgGridDef.svelte.js";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {getContext, onMount} from "svelte";
	import { PaneGroup, Pane, PaneResizer } from "paneforge";
	import {showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {beforeNavigate} from "$app/navigation";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {
		InputParamsSalesTotalByDivision
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/input-params/salesTotalByDivisionInputParams";


	let pageSections: {
		linieSection: boolean;
		kspSection: boolean;
		ksSection: boolean;
	} = getContext("pageSections")

	$inspect(pageSections)

	showFulltextSearch.value = true;
	currentPageKey.value = "SalesTotalByDivision";

	let table: AgGridTableType = $state(agGridTables.value["SalesTotalByDivision"]);
	let open = $state(false);
	let destroy = $state(false);

	$effect(() => {
		open = table.openInputParams;
	})

	onMount(() => {
		open = !table.hasInputParams;
	})

	beforeNavigate(() => {
		table.openInputParams = false;
		destroy = true;
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
	<PaneGroup direction="vertical">
		<Pane
			defaultSize={50}
			class="border-b border-slate-300"
		>
			<AgGridCSWrapper
				pageKey="SalesTotalByDivision"
				gridOptionsCustom={SalesTotalByDivisionAgGridDef}
				headerTranslations={salesTotalByDivisionHeaderTranslations}
			/>
		</Pane>


		{#if pageSections.linieSection}
			<PaneResizer class="bg-slate-100 h-0.5" />

			<Pane
				defaultSize={50}
				class="bg-white border-y border-slate-300"
			>
	<!--			<AgGridCSWrapper-->
	<!--				pageKey="SalesTotalByDivision"-->
	<!--				gridOptionsCustom={salesAnalyticsLinieAgGridDef}-->
	<!--				headerTranslations={salesAnalyticsLinieHeaderTranslations}-->
	<!--			/>-->
			</Pane>
		{/if}


		{#if pageSections.kspSection}
			<PaneResizer class="bg-slate-100 h-0.5" />

			<Pane
				defaultSize={50}
				class="bg-white border-y border-slate-300"
			>
				ksp
			</Pane>
		{/if}


		{#if pageSections.ksSection}
			<PaneResizer class="bg-slate-100 h-0.5" />

			<Pane
				defaultSize={10}
				class="bg-white border-y border-slate-300"
			>
				ks
			</Pane>
		{/if}
	</PaneGroup>
{/if}
