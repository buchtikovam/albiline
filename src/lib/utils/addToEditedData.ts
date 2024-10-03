import { editedColumnsStore } from "$lib/stores/tableStore";
import { get } from "svelte/store";

export function addToEditedData(params: Record<string, any>, column: string, newValue: any) {
		const editedData = get(editedColumnsStore);
		let foundMatch = false;
		const newRecord: Record<string, any> = {};

		editedData.forEach((record) => {
			if (record.id === params["customerAddressCode"]) {
				foundMatch = true;
				record[column] = newValue;
				editedColumnsStore.set(editedData);
			}	
		})

		if (!foundMatch) {
			newRecord["id"] = params["customerAddressCode"];
			newRecord[column] = newValue;
			
			editedColumnsStore.update((records) => records.concat(newRecord));
		}
	}