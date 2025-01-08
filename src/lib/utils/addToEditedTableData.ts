import type { CellValueChangedEvent } from 'ag-grid-enterprise';
import { disableNavigation } from '$lib/runes/navigation.svelte';


export function addToEditedTableData(
	event: CellValueChangedEvent,
	requiredFields: string[],
	editedData: any[]
) {
	const colId: string = event.column.getColId();
	let foundMatch: boolean = false;

	// function to check if record already exists by comparing all required fields
	function checkForMatch(record: string) {
		return requiredFields.every((field: string) => {
			// @ts-expect-error ...
			return record[field] === event.data[field]
		});
	}

	// if record exists, update value in store and set foundMatch to true
	editedData.forEach((record) => {
		if (checkForMatch(record)) {
			foundMatch = true;
			record[colId] = event.newValue;
		}
	})

	// if no match, create record and update store
	if (!foundMatch) {
		const newRow: Record<string, string|number|boolean|Date> = {};

		requiredFields.forEach((reqField) => {
			newRow[reqField] = event.data[reqField]
		})

		newRow[colId] = event.newValue;
		editedData.push(newRow);
	}

	// disable navigation on page
	disableNavigation.value = true;

	return editedData;
}
