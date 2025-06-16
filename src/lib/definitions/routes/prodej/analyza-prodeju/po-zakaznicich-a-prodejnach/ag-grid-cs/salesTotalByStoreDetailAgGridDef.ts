import type {GridOptions} from "ag-grid-enterprise";


export const SalesTotalByStoreDetailAgGridDef: GridOptions = {
	statusBar: undefined,
	grandTotalRow: "bottom",

	rowSelection: {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
		checkboxes: false,
	},

	columnDefs: [
	]
}


export const SalesTotalByStoreDetailHeaderTranslations = {

}
