import {agGridTables, currentPageKey} from '$lib/runes/table.svelte.js';
import {page} from '$app/state';
import {i18n} from "$lib/i18n";
import {selectButtonWithUrl} from "$lib/utils/components/ag-grid/cell-renderers/selectButtonWithUrl.svelte";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn";
import type {ICellRendererParams, CellClassParams} from 'ag-grid-community';
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


const bgHEX = "#fff7df";


export const customerAddressCustomGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"customerAddressCode", // Číslo prodejny
			"number", 115,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"name", // Název
			"text", 280,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"street", // Ulice
			"text", 200,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"city", // Město
			"text", 200,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"postalCode", // PSČ
			"text", 90,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"countryCode", // Země
			"text", 90,
			false, false, false,
			[],
			customColumnDefs(),
		),

		getAgColumn(
			"customerRank", // Bonita // TODO: enum
			"text", 90,
			false, false, false,
			[],
			customColumnDefs(),
		),

		{
			field: "selectBtn",
			headerName: "",
			filter: false,
			resizable: false,
			sortable: false,
			pinned: "left",
			minWidth: 40,
			width: 40,
			cellRenderer: (params: ICellRendererParams) => selectButtonWithUrl(
				params,
				i18n.resolveRoute("/prodej/zakaznici/" + params.data.customerNodeCode + "/prodejny/" +  params.data.customerAddressCode),
				onAddressClick
			),
			cellStyle: (params: CellClassParams) => {
				if (
					params.data.customerNodeCode === Number(page.params.customerNodeCode) &&
					params.data.customerAddressCode === Number(page.params.customerAddressCode)
				) {
					return {
						backgroundColor: bgHEX
					};
				}
				return null;
			},
		}
	]
}



function customColumnDefs() {
	return {
		cellStyle: (params: CellClassParams) => {
			if (
				params.data.customerNodeCode === Number(page.params.customerNodeCode) &&
				params.data.customerAddressCode === Number(page.params.customerAddressCode)
			) {
				return {
					backgroundColor: bgHEX
				};
			}
			return null;
		},
	}
}



function onAddressClick(params: ICellRendererParams) {
	const selectedRow = {
		customerNodeCode: Number(params.data.customerNodeCode),
		customerAddressCode: Number(params.data.customerAddressCode)
	}

	let match = false;
	let table = agGridTables[currentPageKey.value];
	let storedRows = table.selectedRows;

	// check if is already in stored rows
	storedRows.forEach((item) => {
		if (
			item.customerNodeCode === selectedRow.customerNodeCode &&
			item.customerAddressCode === selectedRow.customerAddressCode
		) {
			match = true;
		}
	})


	if (!match) {
		// add new row behind current one
		const newStoredRows = [
			...storedRows.slice(0, table.activeSelectedRowIndex + 1),
			selectedRow,
			...storedRows.slice(table.activeSelectedRowIndex + 1)
		]


		table.activeSelectedRowIndex = table.activeSelectedRowIndex + 1;
		table.selectedRows = newStoredRows;
	}
}



export const customerAddressHeaderTranslations = {
	customerAddressCode: m.routes_prodej_zakaznici_address_detail_form_input_customer_address_code,
	name: m.routes_prodej_zakaznici_address_detail_form_input_name,
	street: m.routes_prodej_zakaznici_address_detail_form_input_street,
	city: m.routes_prodej_zakaznici_address_detail_form_input_city,
	postalCode: m.routes_prodej_zakaznici_address_detail_form_input_postal_code,
	countryCode: m.routes_prodej_zakaznici_address_detail_form_input_country_code,
	customerRank: m.routes_prodej_zakaznici_address_detail_form_input_customer_rank,
}
