import { selectedRowsStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';

export async function deleteItem() {
	let rows = get(selectedRowsStore)

	let response;

	if (rows) {
		for (const [key] of Object.entries(rows)) {
			response = await fetch(`http://localhost:3000/pruvodni-list-data/${key}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			});
		}

		if (response?.ok) {
			customToast("Success", "Operace proběhla úspěšně.")
			selectedRowsStore.set(undefined)
		} else {
			customToast("Warning", "Operace neproběhla.")
		}
	}

	// get selected items
}


// TODO: reload after delete => remove from data in page.svelte or table
