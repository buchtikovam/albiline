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
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "CustomerNodeCode",
		headerName: "Řetězec",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "AddressType",
		headerName: "Typ adresy",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "Name",
		headerName: "Jméno",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "Street",
		headerName: "Ulice",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "PostalCode",
		headerName: "PSČ",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "CountryCode", 
		headerName: "Země",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "CompanyName", 
		headerName: "Název společnosti",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "Enabled",
		headerName: "Aktivní",
		editable: true,
		cellDataType: "boolean",
	},
	{ 
		field: "ConsignmentSaleEnabled",
		headerName: "Komise",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "PaymentTypeCode",
		headerName: "Typ platby",
		editable: true,				
		cellDataType: "text",
	},
	{ 
		field: "DueDays", 
		headerName: "Splatnost",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "InvoiceCopies",
		headerName: "FA kopie",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "DeliveryNoteCopies",
		headerName: "DL kopie",
		editable: true,
		cellDataType: "number",
	},
	{ 
		field: "CustomerRank",
		headerName: "Bonita",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "RetailStoreTypeId",
		headerName: "",
		editable: true,
		cellDataType: "text",
	},
	{ 
		field: "DealerCode",
		headerName: "OZ",
		editable: true,
		cellDataType: "text",
	},
	{
		field: "IsReturnAllowed",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "CustomerStoreCode",
		// headerName: "",
		editable: true,
		cellDataType: ""
	},
	{
		field: "CustomerStoreEan",
		// headerName: "EAN",
		editable: true,
		cellDataType: ""
	},
	{
		field: "DateCreated",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "Note",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "FirstOrderDate",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "LastOrderDate",
		// headerName: "",
		editable: true,
		cellDataType: "date"
	},
	{
		field: "AreaId",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "MerchandiserCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "Description",
		headerName: "Popis",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "ResponsiblePerson",
		headerName: "Zodpovědná osoba",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "LastChangeUserCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "LastChangeDateTime",
		// headerName: "",
		editable: true,
		cellDataType: "datetime"
	},
	{
		field: "UseAssortedEanCodes",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "SendInvoiceViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "EmailForInvoicing",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "SendDeliveryNoteViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "EmailForDeliveryNotes",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "SendShippingNotificationViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "SendReturnsShippingNotificationViaEmail",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "SmailForShippingNotifications",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_ID",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CustomerAddressCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CustomerNodeCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_AddressType",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_Name",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_Street",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_City",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_PostalCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CountryCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CompanyName",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_Enabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "I_ConsignmentSaleEnabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "I_PaymentTypeCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_DueDays",
		// headerName: "",
		editable: true,
		cellDataType: "number"
	},
	{
		field: "I_ICO",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_DIC",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_IcDph",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CustomerStoreCode",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "I_CustomerStoreEan",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "IsBadPayer",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "OM",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "NodeEmail",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "RetailStoreTypeName",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "PickingBoxPacking",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "PackingNote",
		// headerName: "",
		editable: true,
		cellDataType: "text"
	},
	{
		field: "IsForConsignmentReturn",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "SplitOrderByFood",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	},
	{
		field: "B2BeshopEnabled",
		// headerName: "",
		editable: true,
		cellDataType: "boolean"
	}
]

