import { selectedRowsStore, rowDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';
import type { TableRows } from '$lib/types/table/table';


export async function deleteItem() {
	const selectedRows: Record<number, boolean> | undefined = get(selectedRowsStore);
	const data: TableRows = get(rowDataStore);

	const idsToRemove: number[] = [];

	if (selectedRows) {
		for (const [key] of Object.entries(selectedRows)) {
			const rowId: number = (data[key as unknown as number]).id;
			idsToRemove.push(rowId);
		}

			rowDataStore.set(
				data.filter(
					(record) => !idsToRemove.includes(record.id)
				)
			);

			customToast('Success', 'Úspěšně smazáno.');

			selectedRowsStore.set(undefined)
	}

	console.log(idsToRemove);
}
