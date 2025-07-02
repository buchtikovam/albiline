import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {agGridTables} from "$lib/runes/table.svelte.js";
import {goto} from "$app/navigation";
import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {CellDoubleClickedEvent} from "ag-grid-enterprise";

export function onCellDoubleClickedSalesCustomerorstoreByProductline(
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
					field: "customernodecode",
					type: "number",
					value: rowData["customerNodeCode"]
				},
				{
					field: "customernodename",
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
		).then(r => r);

		handleTabClick(
			{
				field: 'analyza-prodeju-po-zakaznicich-a-liniich',
				href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich',
				open: false, hide: false,
				translation: () => "Po zákaznících a liniích",
				disabled: false, popoverOpen: false, icon: null, children: [],
			},
			3
		);

		goto("/prodej/analyza-prodeju/po-zakaznicich/po-liniich").then(r => r);
	}
}
