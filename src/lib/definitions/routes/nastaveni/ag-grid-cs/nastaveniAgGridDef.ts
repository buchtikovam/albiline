import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";
import type {GridOptions} from "ag-grid-enterprise";
import * as m from '$lib/paraglide/messages.js'


export const nastaveniGridOptions: GridOptions = {
	columnDefs: [
		getAgColumn(
			"name",
			"text", 200,
			false, false, false,
			[]
		),

		getAgColumn(
			"prepTimeMinutes",
			"number", 80,
			false, false, false,
			[]
		),

		getAgColumn(
			"cookTimeMinutes",
			"number", 80,
			false, false, false,
			[]
		),

		getAgColumn(
			"mealType",
			"text", 120,
			false, false, false,
			[]
		),


		getAgColumn(
			"servings",
			"number", 80,
			false, false, false,
			[]
		),


		getAgColumn(
			"difficulty",
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"cuisine",
			"text", 120,
			false, false, false,
			[]
		),

		getAgColumn(
			"caloriesPerServing",
			"number", 80,
			false, false, false,
			[]
		),
	],
}



export const nastaveniHeaderTranslations = {
	validFrom: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_valid_from,
	validTo: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_valid_to,
	ico: m.routes_prodej_zakaznici_customer_detail_invoice_address_column_ico,
}
