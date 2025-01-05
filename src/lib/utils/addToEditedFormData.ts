import { editedFormValues } from '$lib/runes/autoformStore.svelte';


export function addToEditedFormData(
	initialValue: string | number | Date | boolean,
	field: string,
	newValue: string | number | Date | boolean
) {
	const editedData = editedFormValues.value;
	editedData[field] = newValue

	if (initialValue === newValue) {
		delete editedData[field]
	}

	editedFormValues.value = editedData;
}
