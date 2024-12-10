import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/runes/table.svelte';
import { get } from 'svelte/store';
import { page } from '$app/stores';
import type { ICellRendererParams, CellClassParams } from 'ag-grid-community';

const bgHEX = "#fff7df";

export const customerAddressesAgGridDef = [
	{
		field: "customerAddressCode",
		headerName: "ID prodejny",
		width: 115,
		cellStyle: (params: CellClassParams) => {
			if (
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
			console.log(params);
			if (
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
		movable: false,
		sortable: false,
		suppressMovable: true,
		pinned: "left",
		minWidth: 40,
		width: 40,
		cellRenderer: (params: ICellRendererParams) => selectBtn(params),
		cellStyle: (params: CellClassParams) => {
			if (
				params.data.customerNodeCode === Number(get(page).params.customerNodeCode) &&
				params.data.customerAddressCode === Number(get(page).params.customerAddressCode)
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
	const divClasses = ["h-full", "mt-1.5", "ml-0.5"];
	div.classList.add(...divClasses);

	const link = document.createElement('a');
	const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700"];
	div.classList.add(...linkClasses);

	link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
	link.href = "/prodej/zakaznici/" + params.data.customerNodeCode + "/prodejny/" +  params.data.customerAddressCode

	const selectedRow = {
		customerNodeCode: params.data.customerNodeCode,
		customerAddressCode: params.data.customerAddressCode
	}

	link.addEventListener("click", () => {
		let match = false;

		selectedRowsStore.update((data) => {
			data.forEach((item) => {
				if (
					item.customerNodeCode === selectedRow.customerNodeCode &&
					item.customerAddressCode === selectedRow.customerAddressCode
				) {
					match = true;
				}
			})

			if (!match) {
				return data.concat(selectedRow);
			}

			return data;
		})

		const selectedRows = get(selectedRowsStore);

		const currentIndex = selectedRows.findIndex((id) =>
			id.customerNodeCode === selectedRow.customerNodeCode &&
			id.customerAddressCode === selectedRow.customerAddressCode
		);

		activeSelectedRowIndexStore.set(currentIndex)
	})

	div.appendChild(link)
	return div;
}
