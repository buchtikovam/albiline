import { editedDataStore } from "$lib/stores/tableStore";
import { get } from "svelte/store";

export function addToEditedData(params: Record<string, any>, column: string, newValue: any) {
		const editedData = get(editedDataStore);
		let foundMatch = false;
		const newRecord: Record<string, any> = {};

		editedData.forEach((record) => {
			if (record.id === params["customerAddressCode"]) {
				foundMatch = true;
				record[column] = newValue;
				editedDataStore.set(editedData);
			}	
		})

		if (!foundMatch) {
			newRecord["id"] = params["customerAddressCode"];
			newRecord[column] = newValue;
			
			editedDataStore.update((records) => records.concat(newRecord));
		}
	}