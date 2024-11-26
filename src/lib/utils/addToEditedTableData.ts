import { editedTableDataStore } from "$lib/stores/tableStore";
import { get } from "svelte/store";
import { disableNavigationStore } from '$lib/stores/pageStore';

export function addToEditedTableData(params: Record<string, string|number|Date|boolean>, key: string, newValue: string|number|Date|boolean) {
	const editedData = get(editedTableDataStore);
	const newRecord: Record<string, string|number|Date|boolean> = {};
	let foundMatch = false;

	disableNavigationStore.set(true);

	editedData.forEach((record) => {
		if (record.id === params["customerAddressCode"]) {
			foundMatch = true;
			record[key] = newValue;
			editedTableDataStore.set(editedData);
		}
	})

	if (!foundMatch) {
		newRecord["id"] = params["customerAddressCode"];
		newRecord[key] = newValue;
		editedTableDataStore.update((records) => records.concat(newRecord));
	}
}
