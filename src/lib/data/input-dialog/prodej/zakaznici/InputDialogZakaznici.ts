import type {InputDialogSelectOption, InputDialogType} from "$lib/types/components/dialog/inputDialog";
import * as m from '$lib/paraglide/messages.js'


export const InputDialogZakaznici: InputDialogType = {
	fulltext: "",

	// inputs : [],

	columnFilters : [{
		columnName: null,
		type: "text",
		filterModel: {
			operator: null,
			conditions: [
				{
					type: null,
					value: null,
				},
			]
		}
	}]
}



export const InputDialogZakazniciSelectOptions: InputDialogSelectOption[] = [
	{
		field: "customerAddressCode",
		label: m.routes_prodej_zakaznici_table_column_customer_address_code,
		type: "number",
	},
	{
		field: "name",
		label: m.routes_prodej_zakaznici_table_column_name,
		type: "text",
	},
	{
		field: "customerNodeCode",
		label: m.routes_prodej_zakaznici_table_column_customer_node_code,
		type: "number",
	},
	{
		field: "i_Name",
		label: m.routes_prodej_zakaznici_table_column_i_name,
		type: "text",
	},
	{
		field: "street",
		label: m.routes_prodej_zakaznici_table_column_street,
		type: "text",
	},
	{
		field: "city",
		label: m.routes_prodej_zakaznici_table_column_city,
		type: "text",
	},
	{
		field: "postalCode",
		label: m.routes_prodej_zakaznici_table_column_postal_code,
		type: "text",
	},
	{
		field: "countryCode",
		label: m.routes_prodej_zakaznici_table_column_country_code,
		type: "text",
	},
	{
		field: "customerRank",
		label: m.routes_prodej_zakaznici_table_column_customer_rank,
		type: "enum",
	},
	{
		field: "isBadPayer",
		label: m.routes_prodej_zakaznici_table_column_is_bad_payer,
		type: "boolean",
	},
	{
		field: "dealerCode",
		label: m.routes_prodej_zakaznici_table_column_dealer_code,
		type: "number",
	},
	{
		field: "areaCode",
		label: m.routes_prodej_zakaznici_table_column_area_code,
		type: "text",
	},
	{
		field: "responsiblePerson",
		label: m.routes_prodej_zakaznici_table_column_responsible_person,
		type: "text",
	},
	{
		field: "i_ICO",
		label: m.routes_prodej_zakaznici_table_column_i_ico,
		type: "text",
	},
	{
		field: "i_DIC",
		label: m.routes_prodej_zakaznici_table_column_i_dic,
		type: "text",
	},
	{
		field: "i_IcDph",
		label: m.routes_prodej_zakaznici_table_column_i_icdph,
		type: "text",
	},
	{
		field: "paymentTypeCode",
		label: m.routes_prodej_zakaznici_table_column_payment_type_code,
		type: "text",
	},
	{
		field: "dueDays",
		label: m.routes_prodej_zakaznici_table_column_due_days,
		type: "number",
	},
	{
		field: "consignmentSaleEnabled",
		label: m.routes_prodej_zakaznici_table_column_consignment_sale_enabled,
		type: "boolean",
	},
	{
		field: "retailStoreTypeName",
		label: m.routes_prodej_zakaznici_table_column_retail_store_type_name,
		type: "text",
	},
	{
		field: "areaId",
		label: m.routes_prodej_zakaznici_table_column_area_id,
		type: "number",
	},
	{
		field: "useAssortedEanCodes",
		label: m.routes_prodej_zakaznici_table_column_use_assorted_ean_codes,
		type: "boolean",
	},
	{
		field: "b2BeshopEnabled",
		label: m.routes_prodej_zakaznici_table_column_b2b_eshop_enabled,
		type: "boolean",
	},
	{
		field: "i_Street",
		label: m.routes_prodej_zakaznici_table_column_i_street,
		type: "text",
	},
	{
		field: "i_City",
		label: m.routes_prodej_zakaznici_table_column_i_city,
		type: "text",
	},
	{
		field: "i_PostalCode",
		label: m.routes_prodej_zakaznici_table_column_i_postal_code,
		type: "text",
	},
	{
		field: "i_CountryCode",
		label: m.routes_prodej_zakaznici_table_column_i_country_code,
		type: "enum",
	},
	{
		field: "note",
		label: m.routes_prodej_zakaznici_table_column_note,
		type: "text",
	},
	{
		field: "dateCreated",
		label: m.routes_prodej_zakaznici_table_column_date_created,
		type: "date",
	},
	{
		field: "firstOrderDate",
		label: m.routes_prodej_zakaznici_table_column_first_order_date,
		type: "date",
	},
	{
		field: "lastOrderDate",
		label: m.routes_prodej_zakaznici_table_column_last_order_date,
		type: "date",
	},
]
