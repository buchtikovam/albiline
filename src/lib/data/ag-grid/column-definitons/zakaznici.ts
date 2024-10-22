export const zakazniciColDef = [
	{ 
		field: "rowNumber",
		headerName: "Číslo řádku",
		headerClass: 'ag-header-checkbox',
		cellClass: 'ag-cell-class',
		headerCheckboxSelection: true,
		blockEditable: true,
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
		headerName: "ID zákazníka",
		cellDataType: "number",
		blockEditable: true,
		editable: false,
		width: 140,
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
		field: "dealerCode",
		headerName: "OZ",
		blockEditable: true,
		editable: false,
		cellDataType: "number",
		width: 80,
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
		field: "om",
		headerName: "OM",
		blockEditable: true,
		editable: false,
		cellDataType: "number",
		width: 80,
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
		field: "customerNodeCode",
		headerName: "NodeCode",
		width: 124,
		cellDataType: "number",
		blockEditable: true,
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
		headerName: "Název FA",
		width: 240,
		cellDataType: "text",
		blockEditable: true,
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
		field: "i_ICO",
		headerName: "IČO",
		width: 100,
		cellDataType: "text",
		blockEditable: true,
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
		headerName: "Ulice MD",
		width: 200,
		cellDataType: "text",
		blockEditable: false,
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
		headerName: "Město MD",
		width: 200,
		cellDataType: "text",
		blockEditable: false,
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
		headerName: "PSČ MD",
		width: 90,
		cellDataType: "text",
		blockEditable: false,
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
		field: "countryCode",
		headerName: "Země MD",
		width: 100,
		cellDataType: "text",
		blockEditable: false,
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
		field: "name",
		headerName: "Název MD",
		width: 240,
		cellDataType: "text",
		blockEditable: false,
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
		field: "companyName", 
		headerName: "Název společnosti",
		width: 200,
		cellDataType: "text",
		blockEditable: false,
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
		width: 120,
		cellDataType: "number",
		blockEditable: true,
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
		// valueFormatter: (params) => {
		// 	console.log(params.value === 1);
		// 	return Boolean(params.value);
		// },
		headerName: "Komise",
		width: 100,
		cellDataType: "boolean",
		// cellRenderer: params => {
		// 	return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
		// },
		blockEditable: true,
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
		field: "paymentTypeCode", 
		headerName: "Typ platby",
		width: 100,
		cellDataType: "text",
		cellEditor: 'agSelectCellEditor',
		cellEditorParams: {
            values: [], 
        },
		blockEditable: true,
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
		field: "invoiceCopies",
		headerName: "FA kopie",
	},
	{
		field: "deliveryNoteCopies",
		headerName: "DL kopie",
	},
	{
		field: "customerRank",
		headerName: "Bonita",
	},
	{
		field: "retailStoreTypeId",
		headerName: "Typ prodejny",
	},
	{
		field: "retailStoreTypeName",
		headerName: "Název typu prodejny",
	},
	{
		field: "isReturnAllowed",
		headerName: "Vratka povolena",
	},
	{
		field: "responsiblePerson",
		headerName: "Zodpovědná osoba",
	},
	{
		field: "customerStoreCode",
		headerName: "ID zákazníka dle zákazníka",
	},
	{
		field: "customerStoreEan",
		headerName: "EAN zákazníka",
	},
	{
		field: "dateCreated",
		headerName: "Datum vytvoření",
	},
	{
		field: "firstOrderDate",
		headerName: "První objednávka",
	},
	{
		field: "lastOrderDate",
		headerName: "Poslední objednávka",
	},
	{
		field: "areaId",
		headerName: "Oblast",
	},
	{
		field: "merchandiserCode",
		headerName: "Merchendiser",
	},
	{
		field: "description",
		headerName: "Bližší popis",
	},
	{
		field: "note",
		headerName: "Poznámka",
	},
	{
		field: "splitOrderByFood",
		headerName: "Food / NonFood",
	},
	{
		field: "isBadPayer",
		headerName: "Neplatič",
	},
	{
		field: "b2BeshopEnabled",
		headerName: "Aktivní B2B",
	},
	{
		field: "i_Street",
		headerName: "Ulice FA",
	},
	{
		field: "i_City",
		headerName: "Město FA",
	},
	{
		field: "i_PostalCode",
		headerName: "PSČ FA",
	},
	{
		field: "i_CountryCode",
		headerName: "Země FA",
	},
	{
		field: "i_Enabled",
		headerName: "Aktivní FA",
	},
	{
		field: "i_DIC",
		headerName: "DIČ",
	},
	{
		field: "i_IcDph",
		headerName: "IčDPH",
	},
	{
		field: "useAssortedEanCodes",
		headerName: "Používat as. EANy",
	},
	{
		field: "pickingBoxPacking",
		headerName: "Balit do KLT",
	},
	{
		field: "packingNote",
		headerName: "Poznámka pro balení",
	},
]
