<script lang="ts">
	import {activeTabIndex, pageCodes, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {beforeNavigate, goto} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";
	import {
		SalesCustomerorstoreByProductlineAgGridDef, SalesCustomersorStoreByProductlineHeaderTranslations
	} from "$lib/definitions/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/ag-grid-cs/salesCustomerorstoreByProductlineAgGridDef";
	import type {CellDoubleClickedEvent, GridOptions} from "ag-grid-enterprise";
	import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
	import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
	import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
	import {page} from "$app/state";

	pageKeys.value = {
		value: pageCodes.value.get(page.route.id||"")||[],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let destroy = $state(false);



	const customGridOptions: GridOptions = {
		onCellDoubleClicked: (event: CellDoubleClickedEvent) => {
			let inputs = table.loadedInputParams.inputs;
			let columnField = event.colDef.field;
			let rowData = event.data;

			if (inputs && columnField) {
				const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
				const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
				const formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
				const formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");

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
							value: String(inputs.find(f => f.field === 'salescountrycode')?.value),
						},
						{
							field: "currency",
							type: "text",
							value: String(inputs.find(f => f.field === 'currency')?.value),
						},
						{
							field: "customernodecode",
							type: "number",
							value: Number(inputs.find(f => f.field === 'customernodecode')?.value),
						},
						{
							field: "customernodename",
							type: "text",
							value: String(inputs.find(f => f.field === 'customernodename')?.value),
						},
						{
							field: "deliveryaddresscode",
							type: "number",
							value: Number(inputs.find(f => f.field === 'deliveryaddresscode')?.value),
						},
						{
							field: "onlyconsignments",
							type: "boolean",
							value: Boolean(inputs.find(f => f.field === 'onlyconsignments')?.value),
						},
						{
							field: "covercreditnotes",
							type: "boolean",
							value: Boolean(inputs.find(f => f.field === 'covercreditnotes')?.value),
						},
						{
							field: "productlineid",
							type: "number",
							value: rowData["productLineId"],
						},
						{
							field: "productLineName",
							type: "text",
							value: rowData['productLineName'].trim(),
						},
					],
				}

				loadInputParamsInTable(
					agGridTables.value["SalesCustomerorstoreByProductlineByCostlevel"],
					salesCustomerorstoreByProductlineInputParams,
					"clientSide",
					{fulltextEnabled: true, columnFiltersEnabled: true}
				)

				console.log(JSON.stringify(salesCustomerorstoreByProductlineInputParams, null, 1));
				goto("/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp");

				handleTabClick(
					{
						field: 'analyza-prodeju-po-zakaznicich-a-klp',
						href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp',
						open: false,
						hide: false,
						translation: () => "Po zákaznících a KLP", // todo
						disabled: false,
						popoverOpen: false,
						icon: null,
						children: [],
					},
				3)
			}

		}
	}
</script>



<svelte:head>
	<title>
		Analýza prodejů - Po zákaznících a liniích | Albiline
	</title>
</svelte:head>



{#if !destroy && table}
	<AgGridCSWrapper
		gridOptionsCustom={{...SalesCustomerorstoreByProductlineAgGridDef, ...customGridOptions}}
		table={table}
		headerTranslations={SalesCustomersorStoreByProductlineHeaderTranslations}
	/>
{/if}
