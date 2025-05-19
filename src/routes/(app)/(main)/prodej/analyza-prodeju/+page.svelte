<script lang="ts">
	import {
		salesAnalyticsAgGridDef, salesAnalyticsHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/ag-grid-cs/salesAnalyticsAgGridDef.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {getContext} from "svelte";
	import { PaneGroup, Pane, PaneResizer } from "paneforge";
	import {
		salesAnalyticsLinieAgGridDef, salesAnalyticsLinieHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/ag-grid-cs/salesAnalyticsLinieAgGridDef.svelte.js";


	let pageSections: {
		linieSection: boolean;
		kspSection: boolean;
		ksSection: boolean;
	} = getContext("pageSections")

	$inspect(pageSections)
</script>



<PaneGroup direction="vertical">
	<Pane
		defaultSize={50}
		class="border-b border-slate-300"
	>
		<AgGridCSWrapper
			pageKey="SalesAnalytics"
			gridOptionsCustom={salesAnalyticsAgGridDef}
			headerTranslations={salesAnalyticsHeaderTranslations}
		/>
	</Pane>


	{#if pageSections.linieSection}
		<PaneResizer class="bg-slate-100 h-0.5" />

		<Pane
			defaultSize={50}
			class="bg-white border-y border-slate-300"
		>
			<AgGridCSWrapper
				pageKey="SalesAnalytics"
				gridOptionsCustom={salesAnalyticsLinieAgGridDef}
				headerTranslations={salesAnalyticsLinieHeaderTranslations}
			/>
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
