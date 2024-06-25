import { selectedRowsStore, rowDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';
import type { TableRowData } from '$lib/types/table';


export async function deleteItem() {
	const selectedRows: Record<number, boolean> | undefined = get(selectedRowsStore);
	const data: TableRowData = get(rowDataStore);
	let response;

	console.log(selectedRows);

	const idsToRemove: number[] = [];

	if (selectedRows) {
		for (const [key] of Object.entries(selectedRows)) {
			const rowId: number = (data[key as unknown as number]).id
			idsToRemove.push(rowId);


			response = await fetch(`http://localhost:3000/pruvodni-list-data/${rowId}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' }
			});


		}

		if (response?.ok) {
			idsToRemove.forEach((id) => {
				data.splice(id, 1)
			})
			rowDataStore.set(data)

			customToast('Success', 'Operace proběhla úspěšně.');

			selectedRowsStore.set(undefined)
		}
	}

	console.log(idsToRemove);
}


// TODO: reload after delete => remove from data in page.svelte or table
