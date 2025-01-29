import type { ValueFormatterParams, ColDef } from 'ag-grid-enterprise';

export const customerAgGridDef: ColDef[] = [
	{
		field: "customerAddressCode",
		headerName: "ID prodejny",
		cellDataType: "number",
		editable: false,
		hide: false,
		width: 68,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			],
		},
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filter: 'agBooleanColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}// custom boolean filter
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filter: 'agBooleanColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}// make custom
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
					filter: 'agBooleanColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}// make custom
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
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
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},

	{ // bool
		field: "isReturnAllowed",
		headerName: "Vratka povolena",
		cellDataType: "boolean",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		},
		hide: true,
		editable: false,

	},

	{
		field: "customerStoreCode",
		hide: true,
		headerName: "ID zákazníka dle zákazníka",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},
	{
		field: "customerStoreEan",
		headerName: "EAN zákazníka",
		hide: true,
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agTextColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},
	{
		field: "splitOrderByFood",
		headerName: "Food / NonFood",
		hide: true,
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agBooleanColumnFilter',
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},
]
