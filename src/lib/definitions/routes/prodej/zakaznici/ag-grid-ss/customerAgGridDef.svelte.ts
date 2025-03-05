import {currentPageKey, agGridTables} from "$lib/runes/table.svelte";
import {i18n} from "$lib/i18n";
import {parseStringToDate} from "$lib/utils/formatting/parseStringToDate";
import {BooleanFilter} from "$lib/utils/components/ag-grid/column-filters/booleanFilter";
import {goto} from "$app/navigation";
import type {ValueFormatterParams, GridOptions} from 'ag-grid-enterprise';
import type {CellDoubleClickedEvent} from "ag-grid-community";
import * as m from '$lib/paraglide/messages.js'
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn";

let pageKey = $derived(currentPageKey.value);

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





export const customerGridOptions: GridOptions = {
	onCellDoubleClicked(event: CellDoubleClickedEvent) {
		agGridTables[pageKey].selectedRows = [{
			customerAddressCode: event.data.customerAddressCode,
			customerNodeCode: event.data.customerNodeCode
		}]

		if (event.column.getColId() === "customerAddressCode") {
			goto(i18n.resolveRoute(`/prodej/zakaznici/${event.data.customerNodeCode}/prodejny/${event.data.customerAddressCode}`));
		}

		if (event.column.getColId() === "customerNodeCode") {
			goto(i18n.resolveRoute(`/prodej/zakaznici/${event.data.customerNodeCode}`));
		}
	},


	columnDefs: [
		getAgColumn("customerAddressCode", "number", 68, false, false),
		getAgColumn("name", "text", 240, false, false),
		getAgColumn("customerNodeCode", "number", 68, false, false),
		getAgColumn("i_Name", "text", 240, false, false),
		getAgColumn("street", "text", 200, false, false),
		getAgColumn("city", "text", 200, false, false),
		getAgColumn("postalCode", "text", 66, false, false),
		getAgColumn("countryCode", "text", 68, false, false), // todo: enum
		getAgColumn("customerRank", "text", 70, false, false), // todo: enum
		getAgColumn("isBadPayer", "boolean", 68, false, false),
		getAgColumn("dealerCode", "number", 60, false, false),
		getAgColumn("areaCode", "text", 60, false, false),
		getAgColumn("responsiblePerson", "text", 78, false, false),
		getAgColumn("i_ICO", "text", 85, false, false),
		getAgColumn("i_DIC", "text", 135, false, false),
		getAgColumn("i_IcDph", "text", 135, false, false),
		getAgColumn("paymentTypeCode", "text", 68, false, false),
		getAgColumn("dueDays", "number", 68, false, false),
		getAgColumn("consignmentSaleEnabled", "boolean", 70, false, false),
		getAgColumn("retailStoreTypeName", "text", 180, false, false), // todo: enum

		{
			field: "areaId",
			width: 76,
			cellDataType: "number",
			editable: false,
			filter: 'agMultiColumnFilter',
			hide: false,
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
			hide: false,
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
			hide: false,
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
			hide: false,
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
			hide: false,
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
			hide: false,
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
			hide: false,
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
			hide: false,
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
				if (params.value === null) {
					return "";
				}
				return parseStringToDate(params.value);
			},
			editable: true,
			hide: false,
			cellClass: ['text-right'],
			filter: 'agMultiColumnFilter',
			filterParams: {
				filters: [
					{
						filter: 'agDateColumnFilter',
						filterParams: {
							inRangeFloatingFilterDateFormat: "DD-MM-YYYY",
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
				if (params.value === null) {
					return "";
				}
				return parseStringToDate(params.value);
			},
			editable: false,
			hide: false,
			cellClass: ['text-right'],
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
				if (params.value === null) {
					return "";
				}
				return parseStringToDate(params.value);
			},
			editable: false,
			hide: false,
			cellClass: ['text-right'],
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
			hide: false,
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
	],
}
