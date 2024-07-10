import { rowDataStore, selectedRowsStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';
import type { TableRows } from '$lib/types/table/table';


export async function deleteItem() {
	const selectedRows: Record<number, boolean> | undefined = get(selectedRowsStore);
	const rowData: TableRows = get(rowDataStore);
	const idsToRemove: number[] = [];

	if (Object.keys(selectedRows).length > 0) {
		selectedRowsStore.set({ })

		for (const [key] of Object.entries(selectedRows)) {
			const rowId: number = (rowData[key as unknown as number]).id;
			idsToRemove.push(rowId);
		}

		rowDataStore.set(
			rowData.filter(
				(record) => !idsToRemove.includes(record.id)
			)
		);

		customToast(
			'Success',
			'Úspěšně smazáno.'
		);
	}
}
