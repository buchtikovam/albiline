import {agGridTables} from "$lib/runes/table.svelte";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
import {goto} from "$app/navigation";
import type {ICellRendererParams} from "ag-grid-community";
import type {AgGridTableType} from "$lib/types/components/table/table";
import type {InputParamsType} from "$lib/types/components/input-params/inputParams";



export function onCellDocumentsButtonClickedSalesTotalByStore(
	table: AgGridTableType,
	params: ICellRendererParams
) {
	const inputs = table.loadedInputParams.inputs;
	const row = params.node.data;

	if (inputs && row) {
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
					value: row.deliveryAddressCode,
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
			],
		}


		loadInputParamsInTable(
			agGridTables.value["SalesDocumentByCustomerorstore"],
			inputParams,
			"clientSide",
			{fulltextEnabled: true, columnFiltersEnabled: true}
		).then(r => r)


		handleTabClick({
			field: 'analyza-prodeju-po-zakaznicich-a-prodejnach-po-fakturach',
			href: '/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach',
			open: false,
			hide: false,
			translation: () => "Po zákaznících a fakturách",
			disabled: false,
			popoverOpen: false,
			icon: null,
			children: []
		}, 3)

		goto(`/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach`).then(r => r);
	}
}
