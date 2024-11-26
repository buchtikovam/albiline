import { get } from 'svelte/store';
import { editedFormValuesStore } from '$lib/stores/autoformStore';

export function addToEditedFormData(
	initialValue: string | number | Date | boolean,
	field: string,
	newValue: string | number | Date | boolean
) {
	const editedData = get(editedFormValuesStore)
	editedData[field] = newValue

	if (initialValue === newValue) {
		delete editedData[field]
	}

	editedFormValuesStore.set(editedData)
}
