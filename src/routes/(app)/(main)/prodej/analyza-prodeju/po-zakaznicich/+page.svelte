<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import type { AgGridTableType } from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesCustomdetailByCustomersAgGridDefSvelte,
		SalesCustomdetailByCustomersHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/ag-grid-cs/salesCustomdetailByCustomersAgGridDef.svelte";
	import type {CellDoubleClickedEvent, GridApi, GridOptions, IRowNode} from "ag-grid-enterprise";
	import {
		onCellDoubleClickedSalesCustomerorstoreByProductline
	} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/onCellDoubleClickedSalesCustomerorstoreByProductline";
	import {beforeNavigate} from "$app/navigation";
	import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";

	pageKeys.value = {
		value: ["SalesCustomdetailByCustomers"],
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

	beforeNavigate(() => {
		destroy = true;
	});

	/**
	 * Calculates total sales for LY and AY across all rows and updates the grid context.
	**/

	function calculateAndRefreshTotals(api: GridApi | null) {
		if (!api) {
			console.warn("calculateAndRefreshTotals called with null API");
			return;
		}

		let currentTotalLY = 0;
		let currentTotalAY = 0;

		api.forEachNodeAfterFilter((node: IRowNode) => {
			if (node.data) {
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

		api.refreshCells({
			columns: ['_computedColumn1', '_computedColumn2'],
			force: true
		});
	}

	const gridOptionsExtra: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent<any>) {
			onCellDoubleClickedSalesCustomerorstoreByProductline(table, event)

			handleTabClick(
			{
				field: 'analyza-prodeju-po-zakaznicich-a-liniich',
				href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich',
				open: false,
				hide: false,
				translation: () => "Po zákaznících a liniích", // todo
				disabled: false,
				popoverOpen: false,
				icon: null,
				children: [],
			},
			3)
		},

		context: gridContext,        // Reactive context with totals
		onModelUpdated: (params) => { // When rowData prop changes on the grid itself
			calculateAndRefreshTotals(params.api);
			if (SalesCustomdetailByCustomersAgGridDefSvelte.onRowDataUpdated) {
				SalesCustomdetailByCustomersAgGridDefSvelte.onRowDataUpdated(params);
			}
		},
	};
</script>



<svelte:head>
	<title>
		Analýza prodejů - po zákaznících | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={{...SalesCustomdetailByCustomersAgGridDefSvelte, ...gridOptionsExtra}}
		table={table}
		headerTranslations={SalesCustomdetailByCustomersHeaderTranslations} />
{/if}
