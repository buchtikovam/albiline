import type {CellDoubleClickedEvent} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {agGridTables} from "$lib/runes/table.svelte";
import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
import {goto} from "$app/navigation";



export function onCellDoubleClickedSalesTotalByStoreDetail(
	table: AgGridTableType,
	event:CellDoubleClickedEvent
) {
	const inputs = table.loadedInputParams.inputs;
	const row = table.selectedRows[0];

	if (inputs) {
		const inputParams: InputParamsType = {
			inputs: [
				{
					field: "datefrom",
					type: "date",
					value: inputs.find(f => f.field === 'datefrom')?.value.toString().replace(" 00:00:00:000", "") || '',
				},
				{
					field: "dateto",
					type: "date",
					value: inputs.find(f => f.field === 'dateto')?.value.toString().replace(" 00:00:00:000", "") || '',
				},
				{
					field: "salescountrycode",
					type: "text",
					value: inputs.find(f => f.field === 'salescountrycode')?.value.toString() || '',
				},
				{
					field: "currency",
					type: "text",
					value: inputs.find(f => f.field === 'currency')?.value.toString() || '',
				},
				{
					field: "customernodecode",
					type: "number",
					value: inputs.find(f => f.field === 'customernodecode')?.value || -1,
				},
				{
					field: "customernodename",
					type: "text",
					value: String(inputs.find(f => f.field === 'customernodename')?.value),
				},
				{
					field: "deliveryaddresscode",
					type: "number",
					value: inputs.find(f => f.field === 'deliveryaddresscode')?.value || -1
				},
				{
					field: "onlyconsignments",
					type: "boolean",
					value: Boolean(inputs.find(f => f.field === 'onlyconsignments')?.value)
				},
				{
					field: "covercreditnotes",
					type: "boolean",
					value: Boolean(inputs.find(f => f.field === 'covercreditnotes')?.value)
				},
				{
					field: "divisionid",
					type: "number",
					value: row.divisionId
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
			translation: () => "Po zákaznících a liniích",
			disabled: false,
			popoverOpen: false,
			icon: null,
			children: []
		}, 3)

		goto("/prodej/analyza-prodeju/po-zakaznicich/po-liniich").then(r => r);
	}
}
