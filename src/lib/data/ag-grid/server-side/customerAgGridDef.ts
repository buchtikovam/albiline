import type { ValueFormatterParams, ColDef } from 'ag-grid-enterprise';
import * as m from '$lib/paraglide/messages.js'
import {BooleanFilter} from "$lib/utils/components/ag-grid/booleanFilter";

export const customerHeaderTranslations = {
	customerAddressCode: m.routes_prodej_zakaznici_table_column_customer_address_code,
	name: m.routes_prodej_zakaznici_table_column_name,
	customerNodeCode: m.routes_prodej_zakaznici_table_column_customer_node_code,
	i_Name: m.routes_prodej_zakaznici_table_column_i_name,
	street: m.routes_prodej_zakaznici_table_column_street,
	city: m.routes_prodej_zakaznici_table_column_city,
	postalCode: m.routes_prodej_zakaznici_table_column_postal_code,
	countryCode: m.routes_prodej_zakaznici_table_column_country_code,
	customerRank: m.routes_prodej_zakaznici_table_column_customer_rank,
	isBadPayer: m.routes_prodej_zakaznici_table_column_is_bad_payer,
	dealerCode: m.routes_prodej_zakaznici_table_column_dealer_code,
	areaCode: m.routes_prodej_zakaznici_table_column_area_code,
	responsiblePerson: m.routes_prodej_zakaznici_table_column_responsible_person,
	i_ICO: m.routes_prodej_zakaznici_table_column_i_ico,
	i_DIC: m.routes_prodej_zakaznici_table_column_i_dic,
	i_IcDph: m.routes_prodej_zakaznici_table_column_i_icdph,
	paymentTypeCode: m.routes_prodej_zakaznici_table_column_payment_type_code,
	dueDays: m.routes_prodej_zakaznici_table_column_due_days,
	consignmentSaleEnabled: m.routes_prodej_zakaznici_table_column_consignment_sale_enabled,
	retailStoreTypeName: m.routes_prodej_zakaznici_table_column_retail_store_type_name,
	areaId: m.routes_prodej_zakaznici_table_column_area_id,
	useAssortedEanCodes: m.routes_prodej_zakaznici_table_column_use_assorted_ean_codes,
	b2BeshopEnabled: m.routes_prodej_zakaznici_table_column_b2b_eshop_enabled,
	i_Street: m.routes_prodej_zakaznici_table_column_i_street,
	i_City: m.routes_prodej_zakaznici_table_column_i_city,
	i_PostalCode: m.routes_prodej_zakaznici_table_column_i_postal_code,
	i_CountryCode: m.routes_prodej_zakaznici_table_column_i_country_code,
	note: m.routes_prodej_zakaznici_table_column_note,
	dateCreated: m.routes_prodej_zakaznici_table_column_date_created,
	firstOrderDate: m.routes_prodej_zakaznici_table_column_first_order_date,
	lastOrderDate: m.routes_prodej_zakaznici_table_column_last_order_date,
	companyName: m.routes_prodej_zakaznici_table_column_company_name,
	isReturnAllowed: m.routes_prodej_zakaznici_table_column_is_return_allowed,
	customerStoreCode: m.routes_prodej_zakaznici_table_column_customer_store_code,
	customerStoreEan: m.routes_prodej_zakaznici_table_column_customer_store_ean,
	splitOrderByFood: m.routes_prodej_zakaznici_table_column_split_order_by_food,
};


export const customerAgGridDef: ColDef[] = [
	{
		field: "customerAddressCode",
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
		width: 68,
		cellDataType: "number",
		editable: true,
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
		}
	},
	{
		field: "street",
		width: 200,
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
		}
	},
	{
		field: "city",
		width: 200,
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
		}
	},
	{
		field: "postalCode",
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
		width: 68,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}// custom boolean filter
				},
			]
		}
	},
	{ 
		field: "dealerCode",
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
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},

	{
		field: "retailStoreTypeName", // select
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
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}// make custom
				},
			]
		}
	},
	{ // bool
		field: "b2BeshopEnabled",
		width: 70,
		cellDataType: "boolean",
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}// make custom
				},
			]
		}
	},
	{
		field: "i_Street",
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
		cellDataType: "boolean",
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
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
		hide: true,
		editable: false,
		filter: 'agMultiColumnFilter',
		filterParams: {
			filters: [
				{
					filter: BooleanFilter,
					filterParams: {
						buttons: ["apply", "reset"],
					}
				},
			]
		}
	},
]




