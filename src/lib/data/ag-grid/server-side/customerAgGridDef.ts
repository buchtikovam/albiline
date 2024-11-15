
export const customerAgGridDef = [
	{ 
		field: "rowNumber",
		headerName: "Číslo řádku",
		headerClass: 'ag-header-checkbox',
		cellClass: 'ag-cell-class',
		headerCheckboxSelection: true,
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
		width: 68,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agNumberColumnFilter',
				},
			],
		}
	},
	{
		field: "name",
		headerName: "Prodejna",
		width: 240,
		cellDataType: "text",
		changeEditable: true,
		editable: true,
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
		field: "customerNodeCode",
		headerName: "ID zákazníka",
		width: 68,
		cellDataType: "number",
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		width: 105,
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		width: 120,
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
		cellDataType: "string",
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		changeEditable: true,
		editable: true,
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
		valueFormatter: (params) => {
			return params.value === null ? undefined : new Date(params.value).toLocaleDateString(); // Format as desired
		},
		changeEditable: true,
		editable: true,
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
		valueFormatter: (params) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		changeEditable: true,
		editable: true,
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
		valueFormatter: (params) => {
			return new Date(params.value).toLocaleDateString(); // Format as desired
		},
		changeEditable: true,
		editable: true,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agDateColumnFilter',
				},
			]
		}
	},





	// {
	// 	field: "companyName",
	// 	headerName: "Název společnosti",
	// 	width: 200,
	// 	cellDataType: "text",
	// 	blockEditable: false,
	// 	editable: true,
	// 	filter: 'agMultiColumnFilter',
	// 	filterParams: {
	// 		filters: [
	// 			{
	// 				filter: 'agTextColumnFilter',
	// 			},
	// 		]
	// 	}
	// },
	//
	// { // bool
	// 	field: "isReturnAllowed",
	// 	headerName: "Vratka povolena",
	// },
	//
	// {
	// 	field: "customerStoreCode",
	// 	headerName: "ID zákazníka dle zákazníka",
	// },
	// {
	// 	field: "customerStoreEan",
	// 	headerName: "EAN zákazníka",
	// },
	// {
	// 	field: "splitOrderByFood",
	// 	headerName: "Food / NonFood",
	// },

]
