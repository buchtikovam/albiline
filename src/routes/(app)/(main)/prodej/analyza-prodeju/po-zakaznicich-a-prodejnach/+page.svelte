<script lang="ts">
	import {PaneGroup, Pane, PaneResizer} from "paneforge";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {
		SalesTotalByDivisionAgGridDef,
		salesTotalByDivisionHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/celkem/ag-grid-cs/salesTotalByDivisionAgGridDef";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesTotalByStoreAgGridDef, SalesTotalByStoreHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/ag-grid-cs/SalesTotalByStoreAgGridDef";

	pageKeys.value = {
		value: [
			"SalesTotalByStore",
			"SalesTotalByStoreDetail",
			"SalesSubdetailByCostlevel"
		],
		index: 0,
	}

	let salesTotalByStoreTable: AgGridTableType = $state(agGridTables.value["SalesTotalByStore"]);

</script>


<PaneGroup
	direction="horizontal"
	class="rounded bg-slate-100"
>
	<Pane
		minSize={10}
		defaultSize={66}
		class={`rounded-lg border bg-white`}
	>
		<AgGridCSWrapper
			table={salesTotalByStoreTable}
			gridOptionsCustom={SalesTotalByStoreAgGridDef}
			headerTranslations={SalesTotalByStoreHeaderTranslations}
		/>
	</Pane>

	<PaneResizer class="bg-slate-100 w-1" />

	<Pane
		minSize={10}
		defaultSize={33}
		class={`rounded-lg `}
	>
		<PaneGroup direction="vertical">
			<Pane
				minSize={10}
				defaultSize={50}
				class={`rounded-lg border bg-pink-50`}
			>
			</Pane>

			<PaneResizer class="bg-slate-100 h-1" />

			<Pane
				minSize={10}
				defaultSize={50}
				class={`rounded-lg border bg-green-50`}
			>
			</Pane>
		</PaneGroup>
	</Pane>
</PaneGroup>
