export const zakazniciColDef = [
	{ 
		headerName: "",
		checkboxSelection: true,
		headerCheckboxSelection: true,
		suppressHeaderMenuButton: true,
		suppressMovable: true,
		filter: false,
		lockPosition: "left",
		maxWidth: 36,
	},
	{ 
		field: "customerAddressCode",
		headerName: "ID zákazníka",
		editable: true,
		cellDataType: "number",
		filter: 'agNumberColumnFilter',
		// filterParams: {
		// 	filters: [
		// 		{
		// 			filter: 'agNumberColumnFilter',
		// 		},
				// {
				// 	filter: 'agSetColumnFilter',
				// },
		// 	]
		// }
	},
	{ 
		field: "customerNodeCode",
		headerName: "Řetězec",
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
		field: "addressType",
		headerName: "Typ adresy",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "name",
		headerName: "Jméno",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "city",
		headerName: "Město",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "street",
		headerName: "Ulice",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "postalCode",
		headerName: "PSČ",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "countryCode", 
		headerName: "Země",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "companyName", 
		headerName: "Název společnosti",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "enabled",
		headerName: "Aktivní",
		editable: true,
		cellDataType: "boolean",
	},
	{ 
		field: "consignmentSaleEnabled",
		headerName: "Komise",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "paymentTypeCode",
		headerName: "Typ platby",
		editable: true,				
		cellDataType: "text",
	},
	{ 
		field: "dueDays", 
		headerName: "Splatnost",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "invoiceCopies",
		headerName: "FA kopie",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "deliveryNoteCopies",
		headerName: "DL kopie",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "customerRank",
		headerName: "Bonita",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "retailStoreTypeId",
		headerName: "",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "dealerCode",
		headerName: "OZ",
		editable: true,
		cellDataType: "text",
	},
	{
		field: "isReturnAllowed",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "customerStoreCode",
		// headerName: "",
		editable: true,
		cellDataType: ""
	},
	{
		field: "customerStoreEan",
		// headerName: "EAN",
		editable: true,
		cellDataType: ""
	},
	{
		field: "dateCreated",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "note",
		// headerName: "",
		editable: true,
		cellDataType: "text"
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
		cellDataType: "datetime"
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
		// headerName: "",
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
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_DIC",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "i_IcDph",
		// headerName: "",
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
		// headerName: "",
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
		// headerName: "",
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
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "b2BeshopEnabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	}
]

