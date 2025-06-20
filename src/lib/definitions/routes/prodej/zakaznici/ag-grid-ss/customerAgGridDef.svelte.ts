import {pageKeys, agGridTables} from "$lib/runes/table.svelte";
import {getDeliveryCountryCodes, getInvoiceCountryCodes} from "$lib/utils/dropdowns/countryCodes";
import {getRetailStoreTypeName} from "$lib/utils/dropdowns/retailStoreType";
import {getPaymentTypeCode} from "$lib/utils/dropdowns/paymentTypeCode";
import {getCustomerRanks} from "$lib/utils/dropdowns/customerRank";
import {getAgColumnEnum} from "$lib/utils/components/ag-grid/getAgColumnEnum";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
// import {goto} from "$app/navigation";
// import type {CellDoubleClickedEvent} from "ag-grid-community";
import type {BodyScrollEndEvent, GridOptions} from 'ag-grid-enterprise';
import * as m from '$lib/paraglide/messages.js'



let pageKey = $derived(pageKeys.value.value[pageKeys.value.index]);



export const customerGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"customerAddressCode",
			"number", 68,
			false, false, false,
			[]
		),

		getAgColumn(
			"name",
			"text", 240,
			false, false, false,
			[]
		),

		getAgColumn(
			"customerNodeCode",
			"number", 68,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_Name",
			"text", 240,
			false, false, false,
			[]
		),

		getAgColumn(
			"street",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"city",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"postalCode",
			"text", 66,
			false, false, false,
			[]
		),

		getAgColumnEnum(
			"countryCode",
			68,
			true, false,
			'serverSide',
			[],
			{},
			[],
			getDeliveryCountryCodes
		),

		getAgColumnEnum(
			"customerRank",
			70,
			true, false,
			'serverSide',
			[],
			{},
			[],
			getCustomerRanks
		),


		getAgColumn(
			"isBadPayer",
			"boolean", 68,
			false, false, false,
			[]
		),

		getAgColumn(
			"dealerCode",
			"number", 60,
			false, false, false,
			[]
		),

		getAgColumn(
			"areaCode",
			"text", 60,
			false, false, false,
			[]
		),

		getAgColumn(
			"responsiblePerson",
			"text", 78,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_ICO",
			"text", 85,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_DIC",
			"text", 135,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_IcDph",
			"text", 135,
			false, false, false,
			[]
		),

		getAgColumnEnum(
			"paymentTypeCode",
			68,
			true, false,
			'serverSide',
			[], {}, [],
			getPaymentTypeCode
		),

		getAgColumn(
			"dueDays",
			"number", 68,
			false, false, false,
			[]
		),

		getAgColumn(
			"consignmentSaleEnabled",
			"boolean", 70,
			false, false, false,
			[]
		),

		getAgColumnEnum(
			"retailStoreTypeName",
			180,
			true, false,
			'serverSide',
			[], {}, [],
			getRetailStoreTypeName
		),

		getAgColumn(
			"areaId",
			"number", 76,
			false, false, false,
			[]
		),

		getAgColumn(
			"useAssortedEanCodes",
			"boolean", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"b2BeshopEnabled",
			"boolean", 70,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_Street",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_City",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"i_PostalCode",
			"text", 70,
			false, false, false,
			[]
		),

		getAgColumnEnum(
			"i_CountryCode",
			70,
			true, false,
			'serverSide',
			[], {}, [],
			getInvoiceCountryCodes
		),


		getAgColumn(
			"note",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"dateCreated",
			"date", 100,
			false, false, false,
			['text-right']
		),

		getAgColumn(
			"firstOrderDate",
			"date", 100,
			false, false, false,
			['text-right']
		),

		getAgColumn(
			"lastOrderDate",
			"date", 100,
			false, false, false,
			['text-right']
		),

		getAgColumn(
			"companyName",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"isReturnAllowed",
			"boolean", 90,
			false, true, false,
			[]
		),

		getAgColumn(
			"customerStoreCode",
			"text", 140,
			false, true, false,
			[]
		),

		getAgColumn(
			"customerStoreEan",
			"text", 140,
			false, true, false,
			[]
		),
	],
}



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

