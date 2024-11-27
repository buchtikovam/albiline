import { get, type Writable } from 'svelte/store';
import { disableNavigationStore } from '$lib/stores/pageStore';
import type { CellValueChangedEvent } from 'ag-grid-enterprise';
import { editedTableDataStore } from '$lib/stores/tableStore';

export function addToEditedTableDataBetter(
	event: CellValueChangedEvent,
	requiredFields: string[],
	store: Writable<any[]>,
) {
	const colId = event.column.colId;
	console.log(" ");
	console.log("colId", event.column.colId);

	const editedData = get(store);
	console.log("edited data", editedData);

	let foundMatch = false;

	function checkForMatch(record) {
		return requiredFields.every((field) => {
			return record[field] === event.data[field]
		});
	}

	editedData.forEach((record) => {
		if (checkForMatch(record)) {
			foundMatch = true;
			record[colId] = event.newValue;
			editedTableDataStore.set(editedData)
		}
	})

	console.log(foundMatch);


	if (!foundMatch) {
		const newRow = {};

		requiredFields.forEach((reqField) => {
			newRow[reqField] = event.data[reqField]
		})

		newRow[colId] = event.newValue;
		store.update((records) => records.concat(newRow));
	}


	disableNavigationStore.set(true);
	console.log(get(store));
}
