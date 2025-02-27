import {serverSideTables} from '$lib/runes/table.svelte.js';
import {pageCompact} from "$lib/runes/page.svelte.js";
import {page} from '$app/state';
import {i18n} from "$lib/i18n";
import type { ICellRendererParams, CellClassParams } from 'ag-grid-community';
import type {ColDef} from "ag-grid-enterprise";


const bgHEX = "#fff7df";


export const customerAddressesAgGridDef: ColDef<any, any>[] = [
	{
		field: "customerAddressCode",
		headerName: "ID prodejny",
		width: 115,
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
	},
	{
		field: "name",
		headerName: "Jméno",
		width: 280,
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
	},
	{
		field: "street",
		headerName: "Ulice",
		width: 200,
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
	},
	{
		field: "city",
		headerName: "Město",
		width: 200,
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
	},
	{
		field: "postalCode",
		headerName: "PSČ",
		width: 90,
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
	},
	{
		field: "countryCode",
		headerName: "Země",
		width: 90,
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
	},
	{
		field: "customerRank",
		headerName: "Bonita",
		width: 90,
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
	},
	{
		field: "selectBtn",
		headerName: "",
		filter: false,
		resizable: false,
		sortable: false,
		pinned: "left",
		minWidth: 40,
		width: 40,
		cellRenderer: (params: ICellRendererParams) => selectBtn(params),
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



function selectBtn(params: ICellRendererParams) {
	const div = document.createElement('div');

	let divClasses = pageCompact.value
		? ["h-full", "mt-[3px]", "ml-2"]
		: ["h-full", "mt-1.5", "ml-1"]

	div.classList.add(...divClasses);


	const link = document.createElement('a');
	const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700"];
	div.classList.add(...linkClasses);

	link.href = i18n.resolveRoute("/prodej/zakaznici/" + params.data.customerNodeCode + "/prodejny/" +  params.data.customerAddressCode);
	link.innerHTML = pageCompact.value
		? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
		:  "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>";


	const selectedRow = {
		customerNodeCode: Number(params.data.customerNodeCode),
		customerAddressCode: Number(params.data.customerAddressCode)
	}


	link.addEventListener("click", () => {
		let match = false;
		let table = serverSideTables[btoa("/(app)/prodej/zakaznici")];
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
	})

	div.appendChild(link);
	return div;
}
