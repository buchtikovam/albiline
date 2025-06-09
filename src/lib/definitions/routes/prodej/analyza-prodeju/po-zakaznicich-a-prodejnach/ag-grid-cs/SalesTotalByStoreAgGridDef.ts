import type {GridOptions} from "ag-grid-enterprise";
import {getAgColumn} from "$lib/utils/components/ag-grid/getAgColumn.svelte";


export const SalesTotalByStoreAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
		getAgColumn( // Země
			"salesCountryCode",
			"text", 100,
			false, false, false,
			[]
		),
	]

}


export const SalesTotalByStoreHeaderTranslations = {

}

/*



*/
