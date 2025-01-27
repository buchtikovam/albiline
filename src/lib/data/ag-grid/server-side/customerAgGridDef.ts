import type { ValueFormatterParams, ColDef } from 'ag-grid-enterprise';

export const customerAgGridDef: ColDef[] = [
	{ 
		field: "rowNumber",
		headerName: "Číslo řádku",
		headerClass: 'ag-header-checkbox',
		cellClass: 'ag-cell-class',
		editable: false,
		filter: false,
		resizable: false, 
		pinned: true,
		suppressHeaderMenuButton: true,
		suppressHeaderFilterButton: true, 
		suppressMovable: true,
		checkboxSelection: true,
		maxWidth: 34,
	},
	{ 
		field: "customerAddressCode",
		headerName: "ID prodejny",
		cellDataType: "number",
		editable: false,
		hide: false,
		width: 68,
		filter: 'agNumberColumnFilter',
		// filterParams: {
		// 	filters: [
		// 		{
		// 			filter: 'agNumberColumnFilter',
		// 		},
		// 	],
		// },
	},
	{
		field: "name",
		headerName: "Prodejna",
		width: 240,
		cellDataType: "text",
		editable: true,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		},
	},
	{
		field: "customerNodeCode",
		headerName: "ID zákazníka",
		width: 68,
		cellDataType: "number",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			]
		}
	},
	{
		field: "i_Name",
		headerName: "Zákazník",
		width: 240,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "street",
		headerName: "Ulice",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "city",
		headerName: "Město",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "postalCode",
		headerName: "PSČ",
		width: 66,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "countryCode", // select
		headerName: "Země",
		width: 68,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "customerRank", // select
		headerName: "Bonita",
		width: 70,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "isBadPayer",
		headerName: "Neplatič",
		width: 68,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter', // custom boolean filter
				},
			]
		}
	},
	{ 
		field: "dealerCode",
		headerName: "OZ",
		width: 60,
		editable: false,
		cellDataType: "number",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			]
		}
	},
	{
		field: "areaCode",
		headerName: "OM",
		width: 60,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "responsiblePerson",
		headerName: "Zodpovědná osoba",
		width: 78,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "i_ICO",
		headerName: "IČO",
		width: 85,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "i_DIC",
		headerName: "DIČ",
		width: 135,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}

	},
	{
		field: "i_IcDph",
		headerName: "IčDPH",
		width: 135,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "paymentTypeCode", // select
		headerName: "Typ platby",
		width: 68,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},

	{
		field: "dueDays", 
		headerName: "Splatnost",
		width: 68,
		cellDataType: "number",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			]
		}
	},
	{
		field: "consignmentSaleEnabled",
		headerName: "Komise",
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter',
				},
			]
		}
	},

	{
		field: "retailStoreTypeName", // select
		headerName: "Typ prodejny",
		width: 180,
		editable: false,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "areaId",
		headerName: "Oblast",
		width: 76,
		cellDataType: "number",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			]
		}

	},
	{ // bool
		field: "useAssortedEanCodes",
		headerName: "Asortní EANy",
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter', // make custom
				},
			]
		}
	},
	{ // bool
		field: "b2BeshopEnabled",
		headerName: "B2B",
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter', // make custom
				},
			]
		}
	},
	{
		field: "i_Street",
		headerName: "Ulice FA",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "i_City",
		headerName: "Město FA",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "i_PostalCode",
		headerName: "PSČ FA",
		width: 70,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "i_CountryCode", // select
		headerName: "Země FA",
		width: 70,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},
	{
		field: "note",
		headerName: "Poznámka",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}

	},
	{
		field: "dateCreated",
		headerName: "Datum vytvoření",
		width: 100,
		cellDataType: "date",
		valueFormatter: (params: ValueFormatterParams) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agDateColumnFilter',
				},
			]
		}
	},
	{
		field: "firstOrderDate",
		headerName: "První objednávka",
		width: 100,
		cellDataType: "date",
		valueFormatter: (params: ValueFormatterParams) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agDateColumnFilter',
				},
			]
		}
	},
	{
		field: "lastOrderDate",
		headerName: "Poslední objednávka",
		width: 100,
		cellDataType: "date",
		valueFormatter: (params: ValueFormatterParams) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agDateColumnFilter',
				},
			]
		}
	},





	{
		field: "companyName",
		headerName: "Název společnosti",
		width: 200,
		cellDataType: "text",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
				},
			]
		}
	},

	{ // bool
		field: "isReturnAllowed",
		headerName: "Vratka povolena",
		cellDataType: "boolean",
		hide: true,
		editable: false,
	},

	{
		field: "customerStoreCode",
		hide: true,
		headerName: "ID zákazníka dle zákazníka",
		editable: false,
	},
	{
		field: "customerStoreEan",
		headerName: "EAN zákazníka",
		hide: true,
		editable: false,
	},
	{
		field: "splitOrderByFood",
		headerName: "Food / NonFood",
		hide: true,
		editable: false,
	},
]
