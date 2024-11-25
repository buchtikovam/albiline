import { editedTableDataStore } from "$lib/stores/tableStore";
import { get } from "svelte/store";

export function addToEditedData(params: Record<string, never>, key: string, newValue: never) {
	const editedData = get(editedTableDataStore);
	let foundMatch = false;
	const newRecord: Record<string, never> = {};

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
