import type { ValueFormatterParams } from 'ag-grid-community';

export const customerInvoiceAddressesAgGridDef = [
	{
		field: "validFrom",
		headerName: "Platnost od",
		cellDataType: "date",
		valueFormatter: (params: ValueFormatterParams) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		width: 120,
	},
	{
		field: "validTo",
		headerName: "Platnost do",
		cellDataType: "date",
		valueFormatter: (params: ValueFormatterParams) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		width: 120,
	},
	{
		field: "ico",
		headerName: "IČO",
		width: 90,
	},

	{
		field: "name",
		headerName: "Jméno",
		width: 240,
	},
	{
		field: "street",
		headerName: "Ulice",
		width: 200,
	},
	{
		field: "city",
		headerName: "Město",
		width: 200,
	},
	{
		field: "postalCode",
		headerName: "PSČ",
		width: 90,
	},
	{
		field: "countryCode",
		headerName: "Země",
		width: 90,
	},
]
