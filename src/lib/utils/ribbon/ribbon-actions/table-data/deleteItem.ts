import { rowDataStore, selectedRowsStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';
import type { TableRows } from '$lib/types/table/table';


export async function deleteItem() {
	const selectedRows: Record<number, boolean> | undefined = get(selectedRowsStore);
	let rowData: TableRows = get(rowDataStore);


	const idsToRemove: number[] = [];

	if (selectedRows) {

		console.log(selectedRows);
		selectedRowsStore.set({ })


		for (const [key] of Object.entries(selectedRows)) {
			idsToRemove.push(Number(key));
		}

		idsToRemove.forEach((id) => {
			rowData.splice(id, 1);
		})

		rowDataStore.set(rowData)

		// // TODO: remove checkboxes
		//
		// customToast('Success', 'Úspěšně smazáno.');
	}
}
