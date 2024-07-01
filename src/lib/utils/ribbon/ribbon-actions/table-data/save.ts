import { editedDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/toast/customToast';

export async function save(): Promise<void> {
	const editedData = get(editedDataStore);

	if (editedData.length !== 0) {
		let response;

		for (const row of editedData) {
			const editedId = row.id;

			console.log(editedId);

			response = await fetch(`http://localhost:3000/pruvodni-list-data/${editedId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(row)
			});
		}

		if (response?.ok) {
			customToast("Success", "Data byla uložena.")
			editedDataStore.set([])
		} else {
			customToast("Warning", "Nepodařilo se uložit data.")
		}
	}
}
