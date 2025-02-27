import type {ColDef, ICellRendererParams} from "ag-grid-community";
import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte";
import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte";
import {pageCompact} from "$lib/runes/page.svelte";
import type {GetRowIdParams, GridOptions} from "ag-grid-enterprise";



export const inputParamsCustomGridOptions = (
	handleDelete: any,
	loadInputParam: any,
): GridOptions => {
	return {
		getRowId: (params: GetRowIdParams) => {
			return String(params.data.paramId);
		},

		columnDefs: [
			{
				field: 'paramName',
				editable: true,
				flex: 1
			},
			{
				field: 'select',
				pinned: 'right',
				width: pageCompact.value ? 28 : 36,
				minWidth: pageCompact.value ? 28 : 36,
				cellRenderer: (params: ICellRendererParams) => {
					return selectButton(params, loadInputParam);
				}
			},
			{
				field: 'delete',
				pinned: 'right',
				width: pageCompact.value ? 28 : 36,
				minWidth: pageCompact.value ? 28 : 36,
				cellRenderer: (params: ICellRendererParams) => deleteButton(params, handleDelete)
			}
		],
	}
}
