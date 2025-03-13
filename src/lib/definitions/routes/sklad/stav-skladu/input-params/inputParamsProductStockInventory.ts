import type {
	InputParamsOptions,
	InputParamsSelectOption,
	InputParamsType
} from "$lib/types/components/input-params/inputParams";
import * as m from '$lib/paraglide/messages.js'


export const InputParamsProductStockInventory: InputParamsType = {
	fulltext: "",

	inputs : [{
		field: "onStock",
		type: "boolean",
		label: () => "Pouze zboží skladem",
		value: false
	}],

	columnFilters : [{
		id: 0,
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



export const InputParamsProductStockInventorySelectOptions: InputParamsOptions[] = [
	{
		label: m.routes_sklad_stav_skladu_table_column_group_vyrobek,
		children: [
			{
				field: "productCode", // KSP
				label: m.routes_sklad_stav_skladu_table_column_product_code,
				type: "number",
			},
			{
				field: "productName", // Název
				label: m.routes_sklad_stav_skladu_table_column_product_name,
				type: "text",
			},
			{
				field: "costLevelCode",  // KLP
				label: m.routes_sklad_stav_skladu_table_column_cost_level_code,
				type: "text",
			},
		]
	},


	{
		field: "quantity", // Skladem
		label: m.routes_sklad_stav_skladu_table_column_quantity,
		type: "number",
	},
	{
		field: "quantityAvailable", // K dispozici
		label: m.routes_sklad_stav_skladu_table_column_quantity_available,
		type: "number",
	},
	{
		field: "quantityReservation", // Blokováno
		label: m.routes_sklad_stav_skladu_table_column_quantity_reservation,
		type: "number",
	},
	{
		field: "quantityAfterReservation", // Po blokacích
		label: m.routes_sklad_stav_skladu_table_column_quantity_after_reservation,
		type: "number",
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_expedice,
		children: [
			{
				field: "quantity_997", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_997", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_krabicovy_sklad,
		children: [
			{
				field: "quantity_996", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_996", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_paletovy_sklad,
		children: [
			{
				field: "quantity_999", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_999", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_externi_sklady,
		children: [
			{
				field: "quantity_ExternalWH", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_ExternalWH", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_akcni_sklad,
		children: [
			{
				field: "quantity_840", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_840", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_mezisklad,
		children: [
			{
				field: "quantity_InterimWH", // Skladem
				label: m.routes_sklad_stav_skladu_table_column_quantity,
				type: "number",
			},
			{
				field: "expectedQuantity_InterimWH", // Očekávané
				label: m.routes_sklad_stav_skladu_table_column_expected_quantity,
				type: "number",
			},
		]
	},

	{
		field: "supplierOrderQuantity", // Objednáno
		label: m.routes_sklad_stav_skladu_table_column_supplier_order_quantity,
		type: "number",
	},
	{
		field: "enabledCZ", // CZ
		label: m.routes_sklad_stav_skladu_table_column_enabled_cz,
		type: "boolean",
	},
	{
		field: "enabledSK", // SK
		label: m.routes_sklad_stav_skladu_table_column_enabled_sk,
		type: "boolean",
	},
	{
		field: "enabledPL", // PL
		label: m.routes_sklad_stav_skladu_table_column_enabled_pl,
		type: "boolean",
	},
	{
		field: "isForExport", // Export
		label: m.routes_sklad_stav_skladu_table_column_is_for_export,
		type: "boolean",
	},

	{
		label: m.routes_sklad_stav_skladu_table_column_group_vyrobek,
		children: [
			{
				field: "divisionName", // Divize
				label: m.routes_sklad_stav_skladu_table_column_division_name,
				type: "text",
			},
			{
				field: "costLevelName", // Listovací položka
				label: m.routes_sklad_stav_skladu_table_column_cost_level_name,
				type: "text",
			},
			{
				field: "productGroupName", // Skupina
				label: m.routes_sklad_stav_skladu_table_column_product_group_name,
				type: "text",
			},
			{
				field: "conceptionName", // Koncepce
				label: m.routes_sklad_stav_skladu_table_column_conception_name,
				type: "text",
			},
			{
				field: "productTypeName", // Typ
				label: m.routes_sklad_stav_skladu_table_column_product_type_name,
				type: "text",
			},
			{
				field: "seasonCode", // Sezóna
				label: m.routes_sklad_stav_skladu_table_column_season_code,
				type: "text",
			},
			{
				field: "phaseCode", // Fáze
				label: m.routes_sklad_stav_skladu_table_column_phase_code,
				type: "text",
			},
			{
				field: "preferenceCode", // Preference
				label: m.routes_sklad_stav_skladu_table_column_preference_code,
				type: "text",
			},
		]
	},

	{
		field: "releaseDate", // Uvedení na trh
		label: m.routes_sklad_stav_skladu_table_column_release_date,
		type: "date",
	},

]
