<script lang="ts">
	import {
		SalesCustomerorstoreByProductlineByCostLevelAgGridDef,
		SalesCustomerorstoreByProductlineByCostLevelHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp/ag-grid-cs/salesCustomerorstoreByProductlineByCostlevelAgGridDef";
	import {activeTabIndex, pageCodes, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {page} from "$app/state";
	import type {CellDoubleClickedEvent, GridApi, GridOptions, IRowNode, ModelUpdatedEvent} from "ag-grid-enterprise";
	import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {goto} from "$app/navigation";
	import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";

	pageKeys.value = {
		value: pageCodes.value.get(page.route.id||"")||[],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);

	let gridContext = $state({
		totalSalesLY: 0,
		totalSalesAY: 0
	});


	function calculateAndRefreshTotals(api: GridApi | null) {
		if (!api) return;

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

		gridContext.totalSalesLY = currentTotalLY;
		gridContext.totalSalesAY = currentTotalAY;

		// Force the grid to re-run valueGetters and cellRenderers for the computed columns.
		api.refreshCells({
			columns: ['_computedColumn1', '_computedColumn2'],
			force: true
		});
	}


	const customGridOptions: GridOptions = {
		context: gridContext,

		onModelUpdated: (event: ModelUpdatedEvent) => {
			calculateAndRefreshTotals(event.api);
		},
	}
</script>



<svelte:head>
	<title>
		Analýza prodejů - Po zákaznících a klp | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={{...customGridOptions, ...SalesCustomerorstoreByProductlineByCostLevelAgGridDef}}
		table={table}
		headerTranslations={SalesCustomerorstoreByProductlineByCostLevelHeaderTranslations}
	/>
{/if}
