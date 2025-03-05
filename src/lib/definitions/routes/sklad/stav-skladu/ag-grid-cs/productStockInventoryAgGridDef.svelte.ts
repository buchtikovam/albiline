import type {GridOptions} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn";



export const productStockInventoryAgGridDef: GridOptions = {
	columnDefs: [
		{
			headerName: "Výrobek",
			children: [
				getAgColumn("productCode", "text", 100, false, false), // KSP
				getAgColumn("productName", "text", 100, false, false), // Název
				getAgColumn("costLevelCode", "text", 100, false, false), // KLP
			]
		},

		getAgColumn("quantity", "number", 100, false, false), // Skladem
		getAgColumn("quantityAvailable", "number", 100, false, false), // K dispozici
		getAgColumn("qunatityReservation", "number", 100, false, false), // Blokováno
		getAgColumn("quantityAfterReservation", "number", 100, false, false), // Po blokacích

		{
			headerName: "Expedice",
			children: [
				getAgColumn("quantity_997", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_997", "number", 100, false, false), // Očekávané
			]
		},

		{
			headerName: "Krabicový sklad",
			children: [
				getAgColumn("quantity_996", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_996", "number", 100, false, false), // Očekávané
			]
		},

		{
			headerName: "Paletový sklad",
			children: [
				getAgColumn("quantity_999", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_999", "number", 100, false, false), // Očekávané
			]
		},

		{
			headerName: "Externí sklady",
			children: [
				getAgColumn("quantity_ExternalWH", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_ExternalWH", "number", 100, false, false), // Očekávané
			]
		},

		{
			headerName: "Akční sklad",
			children: [
				getAgColumn("quantity_840", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_840", "number", 100, false, false), // Očekávané
			]
		},

		{
			headerName: "Mezisklad",
			children: [
				getAgColumn("quantity_InterimWH", "number", 100, false, false), // Skladem
				getAgColumn("expectedQuantity_InterimWH", "number", 100, false, false), // Očekávané
			]
		},

		getAgColumn("supplierOrderQuantity", "number", 100, false, false), // Objednáno
		getAgColumn("enabledCz", "boolean", 100, false, false), // CZ
		getAgColumn("enabledSk", "boolean", 100, false, false), // SK
		getAgColumn("enabledPl", "boolean", 100, false, false), // PL
		getAgColumn("isForExport", "boolean", 100, false, false), // Export

		{
			headerName: "Výrobek",
			children: [
				getAgColumn("divisionName", "text", 100, false, false), // Divize
				getAgColumn("costLevelName", "text", 100, false, false), // Listovací položka
				getAgColumn("productGroupName", "text", 100, false, false), // Skupina
				getAgColumn("conceptionName", "text", 100, false, false), // Koncepce
				getAgColumn("productTypeName", "text", 100, false, false), // Typ
				getAgColumn("seasonCode", "text", 100, false, false), // Sezóna
				getAgColumn("phaseCode", "text", 100, false, false), // Fáze
				getAgColumn("preferenceCode", "text", 100, false, false), // Preference
			]
		},

		getAgColumn("releaseDate", "date", 100, false, true), // Uvedení na trh
		getAgColumn("exportCountryStringAgg", "text", 100, false, true), // Export
	]
}
