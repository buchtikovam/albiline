<script lang="ts">
	import {activeTabIndex, pageCodes, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type { AgGridTableType } from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesCustomdetailByCustomersAgGridDefSvelte,
		SalesCustomdetailByCustomersHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/ag-grid-cs/salesCustomdetailByCustomersAgGridDef.svelte";
	import type {CellDoubleClickedEvent, GridApi, GridOptions, IRowNode, ModelUpdatedEvent} from "ag-grid-enterprise";
	import {
		onCellDoubleClickedSalesCustomerorstoreByProductline
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/onCellDoubleClickedSalesCustomerorstoreByProductline";
	import {beforeNavigate} from "$app/navigation";
	import {page} from "$app/state";

	pageKeys.value = {
		value: pageCodes.value.get(page.route.id||"")||[],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);

	beforeNavigate(() => {
		if (table) table.openInputParams = false;
	});


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

	// These options are merged with the base grid definition.
	const gridOptionsExtra: GridOptions = {
		context: gridContext,

		onModelUpdated: (event: ModelUpdatedEvent) => {
			calculateAndRefreshTotals(event.api);
		},

		// --- Cell Click Handler for Navigation ---
		onCellDoubleClicked(event: CellDoubleClickedEvent<any>) {
			onCellDoubleClickedSalesCustomerorstoreByProductline(table, event);

		},
	};
</script>



<svelte:head>
	<title>
		Analýza prodejů - Po zákaznících | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={{...SalesCustomdetailByCustomersAgGridDefSvelte, ...gridOptionsExtra}}
		table={table}
		headerTranslations={SalesCustomdetailByCustomersHeaderTranslations} />
{/if}
