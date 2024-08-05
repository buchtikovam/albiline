export const zakazniciColDef = [
	{ 
		headerName: "",
		checkboxSelection: true,
		headerCheckboxSelection: true,
		suppressHeaderMenuButton: true,
		suppressMovable: true,
		filter: false,
		lockPosition: "left",
		maxWidth: 50,
	},
	{ 
		field: "CustomerAddressCode",
		headerName: "ID zákazníka",
		cellDataType: "number",
	},
	{ 
		field: "CustomerNodeCode",
		headerName: "Řetězec",
		cellDataType: "number",
	},
	{ 
		field: "AddressType",
		headerName: "Typ adresy",
		cellDataType: "text",
	},
	{ 
		field: "Name",
		headerName: "Jméno",
		cellDataType: "text",
	},
	{ 
		field: "Street",
		headerName: "Ulice",
		cellDataType: "text",
	},
	{ 
		field: "PostalCode",
		headerName: "PSČ",
		cellDataType: "text",
	},
	{ 
		field: "CountryCode", 
		headerName: "Země",
		cellDataType: "text",
	},
	{ 
		field: "CompanyName", 
		headerName: "Název společnosti",
		cellDataType: "text",
	},
	{ 
		field: "Enabled",
		headerName: "Aktivní",
		cellDataType: "boolean",
	},
	{ 
		field: "ConsignmentSaleEnabled",
		headerName: "Komise",
		cellDataType: "text",
	},
	{ 
		field: "PaymentTypeCode",
		headerName: "Typ platby",				
		cellDataType: "text",
	},
	{ 
		field: "DueDays", 
		headerName: "Splatnost",
		cellDataType: "number",
	},
	{ 
		field: "InvoiceCopies",
		headerName: "FA kopie",
		cellDataType: "number",
	},
	{ 
		field: "DeliveryNoteCopies",
		headerName: "DL kopie",
		cellDataType: "number",
	},
	{ 
		field: "CustomerRank",
		headerName: "Bonita",
		cellDataType: "text",
	},
	{ 
		field: "RetailStoreTypeId",
		headerName: "",
		cellDataType: "text",
	},
	{ 
		field: "DealerCode",
		headerName: "OZ",
		cellDataType: "text",
	},
	{
		field: "IsReturnAllowed",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "CustomerStoreCode",
		// headerName: "",
		cellDataType: ""
	},
	{
		field: "CustomerStoreEan",
		// headerName: "EAN",
		cellDataType: ""
	},
	{
		field: "DateCreated",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "Note",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "FirstOrderDate",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "LastOrderDate",
		// headerName: "",
		cellDataType: "date"
	},
	{
		field: "AreaId",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "MerchandiserCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "Description",
		headerName: "Popis",
		cellDataType: "text"
	},
	{
		field: "ResponsiblePerson",
		headerName: "Zodpovědná osoba",
		cellDataType: "text"
	},
	{
		field: "LastChangeUserCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "LastChangeDateTime",
		// headerName: "",
		cellDataType: "datetime"
	},
	{
		field: "UseAssortedEanCodes",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "SendInvoiceViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "EmailForInvoicing",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "SendDeliveryNoteViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "EmailForDeliveryNotes",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "SendShippingNotificationViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "SendReturnsShippingNotificationViaEmail",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "SmailForShippingNotifications",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_ID",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CustomerAddressCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CustomerNodeCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_AddressType",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_Name",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_Street",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_City",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_PostalCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CountryCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CompanyName",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_Enabled",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "I_ConsignmentSaleEnabled",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "I_PaymentTypeCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_DueDays",
		// headerName: "",
		cellDataType: "number"
	},
	{
		field: "I_ICO",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_DIC",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_IcDph",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CustomerStoreCode",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "I_CustomerStoreEan",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "IsBadPayer",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "OM",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "NodeEmail",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "RetailStoreTypeName",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "PickingBoxPacking",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "PackingNote",
		// headerName: "",
		cellDataType: "text"
	},
	{
		field: "IsForConsignmentReturn",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "SplitOrderByFood",
		// headerName: "",
		cellDataType: "boolean"
	},
	{
		field: "B2BeshopEnabled",
		// headerName: "",
		cellDataType: "boolean"
	}
]

