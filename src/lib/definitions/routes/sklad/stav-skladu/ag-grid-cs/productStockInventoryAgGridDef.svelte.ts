import {apiServicePostHandled} from "$lib/api/apiService.svelte";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import type {GridOptions, RowSelectedEvent} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'
import {sideTableRowData} from "$lib/runes/table.svelte";
import {CustomStatsToolPanel} from "$lib/utils/components/ag-grid/customToolPanelWrapper";


export const productStockInventoryAgGridDef: GridOptions = {
	sideBar: {
		toolPanels: [
			"columns",
			"filters",
			{
				id: "customToolPanel",
				width: 350,
				maxWidth: 500,
				minWidth: 180,
				labelKey: "customPanel",
				labelDefault: "Pozice",
				iconKey: "menu",
				toolPanel: CustomStatsToolPanel
			}
		],
	},
	suppressDragLeaveHidesColumns: true,
	onRowSelected: async (event: RowSelectedEvent<any>) => {
		const selectedRows = event.api.getSelectedRows();

		// console.log(event.api.getColumnState())

		if (selectedRows.length > 0 && event.node.isSelected()) {
			const result = await apiServicePostHandled(
				'pageData',
					{
						fulltext: null,
						inputs: [{
							field: "productId",
							type: "number",
							value: event.data.productId
						}],
						columnFilters: []
					},
					'ProductStockInventoryItem'
				)

			const resultData = await result.data;

			sideTableRowData.value = resultData.items;
		} else {
			sideTableRowData.value = [];
		}
	},

	columnDefs: [
		{
			field: "group_vyrobek", // Výrobek
			groupId: "vyrobek_group",
			children: [
				getAgColumn(
					"productCode", // KSP
					"text", 68,
					false, false, false,
					[],
				),

				getAgColumn(
					"productName", // Název
					"text", 300,
					false, false, false,
					[],
				),

				getAgColumn(
					"costLevelCode", // KLP
					"text", 68,
					false, false, false,
					[],
				),
			]
		},

		getAgColumn(
			"quantity", // Skladem
			"number", 90,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantityAvailable", // K dispozici
			"number", 90,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantityReservation", // Blokováno
			"number", 96,
			false, false, false,
			[],
		),

		getAgColumn(
			"quantityAfterReservation", // Po blokacích
			"number", 96,
			false, false, false,
			[],
		),

		{
			field: "group_expedice", // Expedice
			children: [
				getAgColumn(
					"quantity_997", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_997", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_krabicovy_sklad", // Krabicový sklad
			children: [
				getAgColumn(
					"quantity_996", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_996", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_paletovy_sklad", // Paletový sklad
			children: [
				getAgColumn(
					"quantity_999", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_999", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_externi_sklady", // Externí sklady
			children: [
				getAgColumn(
					"quantity_ExternalWH", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_ExternalWH", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_akcni_sklad", // Akční sklad
			children: [
				getAgColumn(
					"quantity_840", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_840", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		{
			field: "group_mezisklad", // Mezisklad
			children: [
				getAgColumn(
					"quantity_InterimWH", // Skladem
					"number", 80,
					false, false, false,
					[],
				),

				getAgColumn(
					"expectedQuantity_InterimWH", // Očekávané
					"number", 80,
					false, false, false,
					[],
				),
			]
		},

		getAgColumn(
			"supplierOrderQuantity", // Objednáno
			"number", 100,
			false, false, false,
			[],
		),

		getAgColumn(
			"enabledCZ", // CZ
			"boolean", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"enabledSK", // SK
			"boolean", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"enabledPL", // PL
			"boolean", 60,
			false, false, false,
			[],
		),

		getAgColumn(
			"isForExport", // Export
			"boolean", 80,
			false, false, false,
			[],
		),

		{
			field: "group_vyrobek", // Výrobek
			groupId: "vyrobek_group",

			children: [
				getAgColumn(
					"divisionName", // Divize
					"text", 130,
					false, false, true,
					[],
				),

				getAgColumn(
					"costLevelName", // Listovací položka
					"text", 230,
					false, false, false,
					[],
				),

				getAgColumn(
					"productGroupName", // Skupina
					"text", 200,
					false, false, true,
					[],
				),

				getAgColumn(
					"conceptionName", // Koncepce
					"text", 230,
					false, false, true,
					[],
				),

				getAgColumn(
					"productTypeName", // Typ
					"text", 120,
					false, false, true,
					[],
				),

				getAgColumn(
					"seasonCode", // Sezóna
					"text", 80,
					false, false, true,
					[],
				),

				getAgColumn(
					"phaseCode", // Fáze
					"text", 80,
					false, false, true,
					[],
				),

				getAgColumn(
					"preferenceCode", // Preference
					"text", 80,
					false, false, true,
					[],
				),

			]
		},

		getAgColumn(
			"releaseDate", // Uvedení na trh
			"date", 110,
			false, true, false,
			[],
		),

		getAgColumn(
			"exportCountryStringAgg", // Export
			"text", 80,
			false, true, false,
			[],
		),
	]
}


export const productStockInventoryDetailGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"locationCode",
			"text", 150,
			false, false, false,
			[],
			{
				filter: false,
				// aggFunc: (params: IAggFuncParams) =>{ // sumarni radek s agg funkcema
				// 	params.api.forEachNode((node) => {
				// 		console.log(node)
				// 	})
				// }
			}
		),

		getAgColumn(
			"quantity",
			"number", 80,
			false, false, false,
			[],
			{ filter: false, aggFunc: "sum" }
		),

		getAgColumn(
			"expectedQuantityChange",
			"number", 60,
			false, false, false,
			[],
			{ filter: false, aggFunc: "sum" }
		),

		getAgColumn(
			"stockCode",
			"text", 60,
			false, false, false,
			[],
			{ filter: false }
		),
	]
}



export const productStockInventoryDetailHeaderTranslations = {
	locationCode: m.routes_sklad_stav_skladu_side_table_column_location_code,
	quantity: m.routes_sklad_stav_skladu_side_table_column_quantity,
	expectedQuantityChange: m.routes_sklad_stav_skladu_side_table_column_expected_quantity_change,
	stockCode: m.routes_sklad_stav_skladu_side_table_column_stock_code
};



export const productStockInventoryHeaderTranslations = {
	group_vyrobek: m.routes_sklad_stav_skladu_table_column_group_vyrobek,
	productCode: m.routes_sklad_stav_skladu_table_column_product_code,
	productName: m.routes_sklad_stav_skladu_table_column_product_name,
	costLevelCode: m.routes_sklad_stav_skladu_table_column_cost_level_code,

	quantity: m.routes_sklad_stav_skladu_table_column_quantity,
	quantityAvailable: m.routes_sklad_stav_skladu_table_column_quantity_available,
	quantityReservation: m.routes_sklad_stav_skladu_table_column_quantity_reservation,
	quantityAfterReservation: m.routes_sklad_stav_skladu_table_column_quantity_after_reservation,

	group_expedice: m.routes_sklad_stav_skladu_table_column_group_expedice,
	quantity_997: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_997: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	group_krabicovy_sklad: m.routes_sklad_stav_skladu_table_column_group_krabicovy_sklad,
	quantity_996: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_996: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	group_paletovy_sklad: m.routes_sklad_stav_skladu_table_column_group_paletovy_sklad,
	quantity_999: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_999: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	group_externi_sklady: m.routes_sklad_stav_skladu_table_column_group_externi_sklady,
	quantity_ExternalWH: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_ExternalWH: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	group_akcni_sklad: m.routes_sklad_stav_skladu_table_column_group_akcni_sklad,
	quantity_840: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_840: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	group_mezisklad: m.routes_sklad_stav_skladu_table_column_group_mezisklad,
	quantity_InterimWH: m.routes_sklad_stav_skladu_table_column_quantity,
	expectedQuantity_InterimWH: m.routes_sklad_stav_skladu_table_column_expected_quantity,

	supplierOrderQuantity: m.routes_sklad_stav_skladu_table_column_supplier_order_quantity,
	enabledCZ: m.routes_sklad_stav_skladu_table_column_enabled_cz,
	enabledSK: m.routes_sklad_stav_skladu_table_column_enabled_sk,
	enabledPL: m.routes_sklad_stav_skladu_table_column_enabled_pl,
	isForExport: m.routes_sklad_stav_skladu_table_column_is_for_export,

	divisionName: m.routes_sklad_stav_skladu_table_column_division_name,
	costLevelName: m.routes_sklad_stav_skladu_table_column_cost_level_name,
	productGroupName: m.routes_sklad_stav_skladu_table_column_product_group_name,
	conceptionName: m.routes_sklad_stav_skladu_table_column_conception_name,
	productTypeName: m.routes_sklad_stav_skladu_table_column_product_type_name,
	seasonCode: m.routes_sklad_stav_skladu_table_column_season_code,
	phaseCode: m.routes_sklad_stav_skladu_table_column_phase_code,
	preferenceCode: m.routes_sklad_stav_skladu_table_column_preference_code,

	releaseDate: m.routes_sklad_stav_skladu_table_column_release_date,
	exportCountryStringAgg: m.routes_sklad_stav_skladu_table_column_export_country_string_agg,
}
