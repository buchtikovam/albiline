import { editedDataStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { toastStore } from '$lib/stores/toastStore';

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
				toastStore.set([
					{
						type: 'Critical',
						content: 'Nepodařilo se uložit data'
					}
				]);
			} else {
				toastStore.set([
					{
						type: 'Success',
						content: 'Úspěšně uloženo'
					}
				]);
				editedDataStore.set([]);
			}
		} catch (error) {
			console.error('Error saving data:', error);
			toastStore.set([
				{
					type: 'Critical',
					content: 'Nepodařilo se uložit data'
				}
			]);
		}
	}
}
