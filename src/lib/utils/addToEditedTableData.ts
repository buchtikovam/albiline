import { get, type Writable } from 'svelte/store';
import { disableNavigationStore } from '$lib/stores/pageStore';
import type { CellValueChangedEvent } from 'ag-grid-enterprise';
import { editedTableDataStore } from '$lib/stores/tableStore';

export function addToEditedTableData(
	event: CellValueChangedEvent,
	requiredFields: string[],
	store: Writable<any[]>
): void {
	const colId: string = event.column.getColId();
	const editedData: any[] = get(store);
	let foundMatch: boolean = false;

	// function to check if record already exists by comparing all required fields
	function checkForMatch(record: string) {
		return requiredFields.every((field: string) => {
			return record[field] === event.data[field]
		});
	}

	// if record exists, update value in store and set foundMatch to true
	editedData.forEach((record) => {
		if (checkForMatch(record)) {
			foundMatch = true;
			record[colId] = event.newValue;
			editedTableDataStore.set(editedData)
		}
	})

	// if no match, create record and update store
	if (!foundMatch) {
		const newRow: Record<string, string|number|boolean|Date> = {};

		requiredFields.forEach((reqField) => {
			newRow[reqField] = event.data[reqField]
		})

		newRow[colId] = event.newValue;
		store.update((records) => records.concat(newRow));
	}

	// disable navigation on page
	disableNavigationStore.set(true);
	console.log(get(store));
}
