import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {agGridTables} from "$lib/runes/table.svelte";
import {goto} from "$app/navigation";
import {localizeHref} from "$lib/paraglide/runtime";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {CellDoubleClickedEvent} from "ag-grid-enterprise";

export function onCellDoubleClickedSalesCustomerorstoreByProductline( // todo: move to ag grid def
	table: AgGridTableType,
	event:CellDoubleClickedEvent
) {
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
					field: "customerNodeName",
					type: "text",
					value: rowData["customerNodeName"]
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
		).then(r => r)

		goto("/prodej/analyza-prodeju/po-zakaznicich").then(r => r);
	}
}
