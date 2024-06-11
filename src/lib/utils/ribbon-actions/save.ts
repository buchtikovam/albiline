import { editedDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';

export async function save(): Promise<void> {
	const editedData = get(editedDataStore);

	for (const row of editedData) {
		const editedId = row.id;

		try {
			await fetch(`http://localhost:3000/pruvodni-list-data/${editedId}`, {
				method: 'PATCH',
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(row)
			});

			console.log(`Data saved successfully for id: ${editedId}`);

		} catch (error) {
			console.error(`Failed to save data for id: ${editedId}`, error);
		}
	}
}
