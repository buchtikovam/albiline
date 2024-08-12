import { currentColumnFiltersStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { apiServicePOST } from '$lib/api/apiService';
import { customToast } from '$lib/utils/toast/customToast';


export async function saveFilters(inputValue: string, url: string): Promise<void> {
	try {
		const columnFilters = get(currentColumnFiltersStore);

		const toSave = {
			pageOrigin: url,
			filterName: inputValue,
			filters: columnFilters
		};
		
		const response = await apiServicePOST('filters', toSave);

		response?.ok
			? customToast('Success', 'Filtry byly uloženy.')
			: customToast('Critical', 'Nepodařilo se uložit filtry.');

		currentColumnFiltersStore.set({})
	} catch (error) {
		customToast('Critical', 'Nepodařilo se uložit filtry.')
		console.log(error);
	}
}
