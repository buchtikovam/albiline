import { activeSelectedRowIndexStore, selectedRowsStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';

export const customerAddressesAgGridDef = [
	{
		field: "customerAddressCode",
		headerName: "ID prodejny",
		width: 115,
	},
	{
		field: "name",
		headerName: "Jméno",
		width: 280,
	},
	{
		field: "street",
		headerName: "Ulice",
		width: 200,
	},
	{
		field: "city",
		headerName: "Město",
		width: 200,
	},
	{
		field: "postalCode",
		headerName: "PSČ",
		width: 90,
	},
	{
		field: "countryCode",
		headerName: "Země",
		width: 90,
	},
	{
		field: "customerRank",
		headerName: "Bonita",
		width: 90,
	},
	{
		field: "selectBtn", // todo: color row that is selected
		headerName: "",
		filter: false,
		resizable: false,
		movable: false,
		sortable: false,
		suppressMovable: true,
		pinned: "left",
		minWidth: 40,
		width: 40,
		cellRenderer: (params) => selectBtn(params)
	}
]

function selectBtn(params) { // todo: replace selectedRows on that position
	const div = document.createElement('div');
	const divClasses = ["h-full", "mt-1.5", "ml-0.5"];
	div.classList.add(...divClasses);

	const link = document.createElement('a');
	const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700"];
	div.classList.add(...linkClasses);

	link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
	link.href = "/prodej/zakaznici/" + params.data.customerNodeCode + "/prodejny/" +  params.data.customerAddressCode

	link.addEventListener("click", () => {
		const selectedRow = {
			customerNodeCode: params.data.customerNodeCode,
			customerAddressCode: params.data.customerAddressCode
		}

		selectedRowsStore.update((data) => {
			let match = false;

			data.forEach((item) => {
				if (item.customerNodeCode === selectedRow.customerNodeCode && item.customerAddressCode === selectedRow.customerAddressCode) {
					match = true;
				}
			})

			if (!match) {
				return data.concat(selectedRow);
			}

			return data;
		})
		activeSelectedRowIndexStore.set(get(selectedRowsStore).length - 1);
	})

	div.appendChild(link)
	return div;
}
