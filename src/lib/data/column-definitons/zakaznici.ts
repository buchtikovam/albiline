export const zakazniciColDef = [
	{ 
		headerName: "",
		checkboxSelection: true,
		suppressMovable: true,
		lockPosition: "left",
		maxWidth: 50,
	},
	{ 
		field: "customerAddressCode",
		headerName: "ID zákazníka",
		cellDataType: "number",
	},
	{ 
		field: "customerNodeCode",
		headerName: "Řetězec",
		cellDataType: "number",
	},
	{ 
		field: "addressType",
		headerName: "Typ adresy",
		cellDataType: "text",
	},
	{ 
		field: "name",
		headerName: "Jméno",
		cellDataType: "text",
	},
	{ 
		field: "street",
		headerName: "Ulice",
		cellDataType: "text",
	},
	{ 
		field: "postalCode",
		headerName: "PSČ",
		cellDataType: "text",
	},
	{ 
		field: "countryCode", 
		headerName: "Země",
		cellDataType: "text",
	},
	{ 
		field: "companyName", 
		headerName: "Název společnosti",
		cellDataType: "text",
	},
	{ 
		field: "enabled",
		headerName: "Aktivní",
		cellDataType: "boolean",
	},
	{ 
		field: "consignmentSaleEnabled",
		headerName: "Komise",
		cellDataType: "text",
	},
	{ 
		field: "paymentTypeCode",
		headerName: "Typ platby",				
		cellDataType: "text",
	},
	{ 
		field: "dueDays", 
		headerName: "Splatnost",
		cellDataType: "number",
	},
	{ 
		field: "invoiceCopies",
		headerName: "FA kopie",
		cellDataType: "number",
	},
	{ 
		field: "deliveryNoteCopies",
		headerName: "DL kopie",
		cellDataType: "number",
	},
	{ 
		field: "customerRank",
		headerName: "Bonita",
		cellDataType: "text",
	},
	{ 
		field: "retailStoreTypeId",
		headerName: "",
		cellDataType: "text",
	},
	{ 
		field: "dealerCode",
		headerName: "OZ",
		cellDataType: "text",
	},
	{
		field: "isReturnAllowed",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "customerStoreCode",
		// headerName: "",
		cellDataType: ""
	},
	{
		field: "customerStoreEan",
		// headerName: "EAN",
		cellDataType: ""
	},
	{
		field: "dateCreated",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "note",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "firstOrderDate",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "lastOrderDate",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "areaId",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "merchandiserCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "description",
		headerName: "Popis",
		cellDataType: "text"
	},
	{
		field: "responsiblePerson",
		headerName: "Zodpovědná osoba",
		cellDataType: "text"
	},
	{
		field: "lastChangeUserCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "lastChangeDateTime",
		// headerName: "",
		cellDataType: "datetime"
	},
	{
		field: "useAssortedEanCodes",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "sendInvoiceViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "emailForInvoicing",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "sendDeliveryNoteViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "emailForDeliveryNotes",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "sendShippingNotificationViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "sendReturnsShippingNotificationViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "emailForShippingNotifications",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_id",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_customerAddressCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_customerNodeCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_addressType",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_name",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_street",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_city",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_postalCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_countryCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_companyName",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_enabled",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "i_consignmentSaleEnabled",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "i_paymentTypeCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_dueDays",
		// headerName: "",
		cellDataType: "number"
	},
	{
		field: "i_ico",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_dic",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_icDph",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_customerStoreCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "i_customerStoreEan",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "isBadPayer",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "om",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "nodeEmail",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "retailStoreTypeName",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "pickingBoxPacking",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "packingNote",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "isForConsignmentReturn",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "splitOrderByFood",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "b2beshopEnabled",
		// headerName: "",
		cellDataType: "boolean"
	}
]

