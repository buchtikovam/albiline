export const zakazniciColDef = [ // TODO: add widths
	{ 
		field: "rowNumber",
		headerName: "Číslo řádku",
		headerClass: 'ag-header-checkbox',
		headerCheckboxSelection: true,
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
		editable: true,
		width: 140,
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
		headerName: "Řetězec",
		cellDataType: "number",
		editable: true,
		width: 120,
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
		field: "addressType",
		headerName: "Typ adresy",
		cellDataType: "text",
		editable: true,
		width: 130,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "name",
		headerName: "Jméno",
		cellDataType: "text",
		editable: true,
		width: 280,
		cellEditor: 'agLargeTextCellEditor',
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "city",
		headerName: "Město",
		editable: true,
		cellDataType: "text",
		width: 160,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
				{
					filter: 'agSetColumnFilter',
					filterParams: {
						values: ["Praha", "Brno", "Brno", "brno", "Kroměříž", "Zlechov", "Červený Kostelec"]
					}
				},
			]
		}
	},
	{ 
		field: "street",
		headerName: "Ulice",
		editable: true,
		cellDataType: "text",
		cellEditor: 'agLargeTextCellEditor',
		width: 280,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "postalCode",
		headerName: "PSČ",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "countryCode", 
		headerName: "Země",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "companyName", 
		headerName: "Název společnosti",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "enabled",
		headerName: "Aktivní",
		editable: true,
		cellDataType: "boolean",
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
		field: "consignmentSaleEnabled",
		headerName: "Komise",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "paymentTypeCode",
		headerName: "Typ platby",
		editable: true,				
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "dueDays", 
		headerName: "Splatnost",
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
		field: "invoiceCopies",
		headerName: "FA kopie",
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
		field: "deliveryNoteCopies",
		headerName: "DL kopie",
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
		field: "customerRank",
		headerName: "Bonita",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "retailStoreTypeId",
		headerName: "",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{ 
		field: "dealerCode",
		headerName: "OZ",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{
		field: "isReturnAllowed",
		// headerName: "",
		editable: true,
		cellDataType: "boolean",
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
		field: "customerStoreCode",
		// headerName: "",
		editable: true,
		cellDataType: "",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{
		field: "customerStoreEan",
		headerName: "EAN",
		editable: true,
		cellDataType: ""
	},
	{
		field: "dateCreated",
		headerName: "Datum vytvoření",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "note",
		headerName: "Poznámka",
		editable: true,
		cellDataType: "text",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: 'agStringColumnFilter',
				},
			]
		}
	},
	{
		field: "firstOrderDate",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "lastOrderDate",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "areaId",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "aerchandiserCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "description",
		headerName: "Popis",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "responsiblePerson",
		headerName: "Zodpovědná osoba",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "lastChangeUserCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "lastChangeDateTime",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "lseAssortedEanCodes",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "sendInvoiceViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "emailForInvoicing",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "sendDeliveryNoteViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "emailForDeliveryNotes",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "sendShippingNotificationViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "sendReturnsShippingNotificationViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "smailForShippingNotifications",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_ID",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CustomerAddressCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CustomerNodeCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_AddressType",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_Name",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_Street",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_City",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_PostalCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CountryCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CompanyName",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_Enabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "i_ConsignmentSaleEnabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "i_PaymentTypeCode",
		headerName: "Typ platby",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_DueDays",
		// headerName: "",
		editable: true,
		cellDataType: "number"
	},
	{
		field: "i_ICO",
		headerName: "IČO",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_DIC",
		headerName: "DIČ",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_IcDph",
		headerName: "IčDPH",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CustomerStoreCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_CustomerStoreEan",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "isBadPayer",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "om",
		headerName: "OM",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "nodeEmail",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "retailStoreTypeName",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "pickingBoxPacking",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "packingNote",
		headerName: "Poznámka pro balení",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "isForConsignmentReturn",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "splitOrderByFood",
		headerName: "Food / NonFood",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "b2BeshopEnabled",
		headerName: "Aktivní B2B",
		editable: true,
		cellDataType: "boolean"
	}
]

