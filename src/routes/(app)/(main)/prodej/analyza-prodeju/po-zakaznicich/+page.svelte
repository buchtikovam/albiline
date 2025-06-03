<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {beforeNavigate, goto} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesCustomdetailByCustomersAgGridDefSvelte, SalesCustomdetailByCustomersHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/ag-grid-cs/salesCustomdetailByCustomersAgGridDef.svelte";
	import type {CellDoubleClickedEvent, GridOptions, RowDoubleClickedEvent} from "ag-grid-enterprise";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
	//
	// interface Props {
	// 	data: { pageMetaData: PageMetaDataType }
	// }
	//
	// let { data }: Props = $props();

	pageKeys.value = {
		value: ["SalesCustomdetailByCustomers"],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);

	beforeNavigate(() => {
		destroy = true;
	})


	$inspect(table.loadedInputParams)

	const gridOptionsExtra: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent<any>) {
			let inputs = table.loadedInputParams.inputs;
			let columnField = event.colDef.field;
			let rowData = event.data;

			if (inputs && columnField) {
				const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
				const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
				const formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
				const formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");
				const currency = inputs.find(f => f.field === 'currency')?.value || '';
				const divisionId = inputs.find(f => f.field === 'divisionid')?.value;

				console.log(inputs)

				let salesCustomerorstoreByProductlineInputParams: InputParamsType = {
					inputs: [
						{
							field: "datefrom",
							type: "date",
							value: formattedDateFrom
						},
						{
							field: "dateto",
							type: "date",
							value: formattedDateTo
						},
						{
							field: "salescountrycode",
							type: "text",
							value: rowData["salesCountryCode"]
						},
						{
							field: "currency",
							type: "text",
							value: currency
						},
						{
							field: "customerNodeCode",
							type: "number",
							value: rowData["customerNodeCode"]
						},
						{
							field: "deliveryaddresscode",
							type: "number",
							value: -1,
						},
						{
							field: "onlyconsignments",
							type: "boolean",
							value: false,
						},
						{
							field: "covercreditnotes",
							type: "boolean",
							value: true,
						},
						{
							field: "divisionid",
							type: "number",
							value: divisionId,
						},
					],
				}

				loadInputParamsInTable(
					agGridTables.value["SalesCustomerorstoreByProductline"],
					salesCustomerorstoreByProductlineInputParams,
					"clientSide",
					{fulltextEnabled: true, columnFiltersEnabled: true}
				)

				console.log(JSON.stringify(salesCustomerorstoreByProductlineInputParams, null, 1));
				goto("/prodej/analyza-prodeju/po-zakaznicich/po-liniich");
			}
		},
	}
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
		headerTranslations={SalesCustomdetailByCustomersHeaderTranslations}
	/>
{/if}
