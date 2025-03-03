import type {ColDef} from "ag-grid-enterprise";

export const customerAndAddressContactsAgGridDef: ColDef<any, any>[] = [
	{
		field: "isDefault",
		headerName: "Výchozí",
		cellDataType: "boolean",
		width: 64,
	},
	{
		field: "enabled",
		headerName: "Aktivní",
		cellDataType: "boolean",
		width: 56,
	},
	{
		field: "name",
		headerName: "Jméno",
		cellDataType: "text",
		width: 120,
	},
	{
		field: "surname",
		headerName: "Příjmení",
		cellDataType: "text",
		width: 170,
	},
	{
		field: "mobile",
		headerName: "Telefon",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "phone",
		headerName: "Pevná linka",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "email",
		headerName: "E-mail",
		cellDataType: "text",
		width: 200,
	},
	{
		field: "note",
		headerName: "Poznámka",
		cellDataType: "text",
		width: 140,
	},
	{
		field: "pdfInvoice",
		headerName: "FA emailem v PDF",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "pdfDeliveryNote",
		headerName: "DL emailem v PDF",
		cellDataType: "boolean",
		width: 84,
	},
	{
		field: "csvInvoice",
		headerName: "FA emailem v CSV",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "csvDeliveryNote",
		headerName: "DL emailem v CSV",
		cellDataType: "boolean",
		width: 84,
	},
	{
		field: "consignmentReturnInfo",
		headerName: "AZ o svozu zásilky",
		cellDataType: "boolean",
		width: 82,
	},
	{
		field: "consignmentInfo",
		headerName: "AZ o expedici zásilky",
		cellDataType: "boolean",
		width: 94,
	},
	{
		field: "carrierInfo",
		headerName: "Kontakt pro přepravce",
		cellDataType: "boolean",
		width: 82,
	},
]
