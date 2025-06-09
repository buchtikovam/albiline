import type {AgGridTableType} from "$lib/types/components/table/table";
import type {CellDoubleClickedEvent} from "ag-grid-enterprise";
import type {InputParamsType} from "$lib/types/components/input-params/inputParams";
import {loadInputParamsInTable} from "$lib/utils/components/input-params/loadInputParamsInTable";
import {agGridTables} from "$lib/runes/table.svelte";
import {goto} from "$app/navigation";

export function onDoubleClickedSalesTotalByDivision(
	origin: "division"|"linie"|"costLevel",
	divisionTable: AgGridTableType,
	linieTable: AgGridTableType,
	klpTable: AgGridTableType,
	event:CellDoubleClickedEvent
) {

	let inputs = divisionTable.loadedInputParams.inputs;
	let columnField = event.colDef.field;
	console.log(columnField)

	if (inputs && columnField) {
		const dateFrom = inputs.find(f => f.field === 'datefrom')?.value || '';
		const dateTo = inputs.find(f => f.field === 'dateto')?.value || '';
		const formattedDateFrom = dateFrom.toString().replace(" 00:00:00:000", "");
		const formattedDateTo = dateTo.toString().replace(" 00:00:00:000", "");
		const kinokoAndBakery = inputs.find(f => f.field === 'coverkinokoandbakery')?.value || '';

		let countryCode = inputs.find(f => f.field === 'salescountrycode')?.value || '';
		let decidedCountryCode = countryCode === "Vše" ? "" : countryCode;
		if (columnField.includes("CZ")) decidedCountryCode = "CZ";
		if (columnField.includes("SK")) decidedCountryCode = "SK";
		if (columnField.includes("PL")) decidedCountryCode = "PL";

		let salesChannel = "";

		if (columnField.toLocaleLowerCase().includes("wholesale")) {
			if (columnField.toLocaleLowerCase().includes("export")) {
				salesChannel = "WholesaleExport"
			} else {
				salesChannel = "Wholesale"
			}
		}

		if (columnField.toLocaleLowerCase().includes("eshop")) {
			if (columnField.toLocaleLowerCase().includes("kinoko")) {
				salesChannel = "EshopKinoko";
			} else {
				salesChannel = "Eshop";
			}
		}

		if (columnField.toLocaleLowerCase().includes("retail")) {
			if (columnField.toLocaleLowerCase().includes("bakery")) {
				salesChannel = "RetailBakery";
			} else if (columnField.toLocaleLowerCase().includes("kinoko")) {
				salesChannel = "RetailKinoko";
			} else {
				salesChannel = "Retail";
			}
		}

		let currency = "CZK";

		if (countryCode === "CZ") currency = "CZK";
		if (countryCode === "SK") currency = "EUR";
		if (countryCode === "PL") currency = "PLN";


		let detailByCustomersInputParams: InputParamsType = {
			inputs: [
				{
					field: "datefrom",
					type: "date",
					value: formattedDateFrom
				},
				{
					field: "dateto",
					type: "date",
					value: formattedDateTo,
				},
				{
					field: "salescountrycode",
					type: "text",
					value: decidedCountryCode.toString()
				},
				{
					field: "coverkinokoandbakery",
					type: "boolean",
					value: Boolean(kinokoAndBakery),
				},
				{
					field: "saleschannel",
					type: "text",
					value: salesChannel
				},
				{
					field: "currency",
					type: "text",
					value: currency
				},
				{
					field: "divisionid",
					type: "number",
					value: divisionTable.selectedRows[0][divisionTable.identificationKey]
				},
				{
					field: "productlineid",
					type: "number",
					value: origin === "linie" || origin === "costLevel" ? linieTable.selectedRows[0][linieTable.identificationKey] : -1
				},
				{
					field: "costlevelcode",
					type: "text",
					value: origin === "costLevel" ? klpTable.selectedRows[0][klpTable.identificationKey] : ""
				},
			],
		}

		loadInputParamsInTable(
			agGridTables.value["SalesCustomdetailByCustomers"],
			detailByCustomersInputParams,
			"clientSide",
			{fulltextEnabled: true, columnFiltersEnabled: true}
		).then(r => r)

		goto("/prodej/analyza-prodeju/po-zakaznicich").then(r => r);
	}
}
