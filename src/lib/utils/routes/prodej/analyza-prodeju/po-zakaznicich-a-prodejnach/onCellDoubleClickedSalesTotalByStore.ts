import type {CellDoubleClickedEvent} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {agGridTables} from "$lib/runes/table.svelte";
import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
import {goto} from "$app/navigation";



export function onCellDoubleClickedSalesTotalByStore(
	table: AgGridTableType,
	event:CellDoubleClickedEvent
) {
	const inputs = table.loadedInputParams.inputs;
	const columnField = event.colDef.field;
	const row = table.selectedRows[0];

	if (inputs && columnField) {
		const dateFrom = inputs.find(f => f.field === 'datefrom')?.value.toString().replace(" 00:00:00:000", "") || '';
		const dateTo = inputs.find(f => f.field === 'dateto')?.value.toString().replace(" 00:00:00:000", "") || '';
		const onlyConsignments = inputs.find(f => f.field === 'onlyconsignments')?.value || false;
		const coverCreditNotes = inputs.find(f => f.field === 'covercreditnotes')?.value || false;

		let divisionId = -1;

		// Regular expression to match 'sales_{num}_', 'margin_{num}_', or 'profit_{num}_'
		// It captures the numeric part of the field name.
		const match = columnField.match(/^(sales|margin|profit)_(\d+)_/);

		// If a match is found, parse the captured number (the second element in the match array)
		if (match && match[2]) {
			const parsedId = parseInt(match[2], 10);
			// Check if parsing was successful (result is not NaN)
			if (!isNaN(parsedId)) {
				divisionId = parsedId;
			}
		}


		const inputParams: InputParamsType = {
			inputs: [
				{
					field: "datefrom",
					type: "date",
					value: dateFrom
				},
				{
					field: "dateto",
					type: "date",
					value: dateTo
				},
				{
					field: "salescountrycode",
					type: "text",
					value: row.salesCountryCode,
				},
				{
					field: "currency",
					type: "text",
					value: row.currency,
				},
				{
					field: "customernodecode",
					type: "number",
					value: row.customerNodeCode,
				},
				{
					field: "customernodename",
					type: "number",
					value: row.customerNodeName,
				},
				{
					field: "deliveryaddresscode",
					type: "number",
					value: row.deliveryAddressCode
				},
				{
					field: "onlyconsignments",
					type: "boolean",
					value: Boolean(onlyConsignments)
				},
				{
					field: "covercreditnotes",
					type: "boolean",
					value: Boolean(coverCreditNotes)
				},
				{
					field: "divisionid",
					type: "number",
					value: divisionId
				},
			],
		}


		loadInputParamsInTable(
			agGridTables.value["SalesCustomerorstoreByProductline"],
			inputParams,
			"clientSide",
			{fulltextEnabled: true, columnFiltersEnabled: true}
		).then(r => r)

		handleTabClick({
			field: 'analyza-prodeju-po-zakaznicich-a-liniich',
			href: '/prodej/analyza-prodeju/po-zakaznicich/po-liniich',
			open: false,
			hide: false,
			translation: () => "Po zákaznících a liniích", // todo
			disabled: false,
			popoverOpen: false,
			icon: null,
			children: []
		}, 3)

		goto("/prodej/analyza-prodeju/po-zakaznicich/po-liniich").then(r => r);
	}
}
