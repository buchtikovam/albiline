import { editedDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { customToast } from '$lib/utils/customToast';

export async function save(): Promise<void> {
	const editedData = get(editedDataStore);

	for (const row of editedData) {
		const editedId = row.id;

		try {
			const response = await fetch(`http://localhost:3000/pruvodni-list-data/${editedId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(row)
			});

			if (!response.ok) {
				customToast("Critical", "Nepodařilo se uložit data.")
			} else {
				customToast("Success", "Data byla úspěšně uložena.")
				editedDataStore.set([]);
			}
		} catch (error) {
			console.error('Error saving data:', error);
			customToast("Critical", "Nepodařilo se uložit data.")
		}
	}
}
