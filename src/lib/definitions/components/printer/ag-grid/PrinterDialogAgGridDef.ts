
import type {ColDef, GridOptions} from "ag-grid-enterprise";
import {pageCompact} from "$lib/runes/page.svelte.js";
import type {ICellRendererParams} from "ag-grid-community";
import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte.js";
import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";



export const printerDialogAgGridDef: GridOptions =  {
	columnDefs: [
		{
			field: "description", // Popis
			headerName: "Popis",
			width: 150,
			editable: false,
		},
		{
			field: "sestava", // Sestava
			editable: false,
			flex: 1,
		},
	]
}
