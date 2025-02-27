import type {ColDef} from "ag-grid-enterprise";
import {pageCompact} from "$lib/runes/page.svelte.js";
import type {ICellRendererParams} from "ag-grid-community";
import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte.js";
import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";



export const ribbonFiltersAgGridDef = (
	handleClickSelect: any,
	handleDelete: any,
): ColDef<any, any>[] => {
	return [
		{
			field: "filterName",
			editable: true,
			flex: 1,
		},
		{
			field: "select",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => selectButton(params, handleClickSelect),
		},
		{
			field: "delete",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => deleteButton(params, handleDelete),
		},
	]
}
