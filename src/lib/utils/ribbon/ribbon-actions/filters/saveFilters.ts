import { currentFiltersStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { apiServicePOST } from '$lib/api/apiService';
import { customToast } from '$lib/utils/toast/customToast';


export async function saveFilters(inputValue: string, url: string): Promise<void> {
	const currentFilters = get(currentFiltersStore);

	const toSave = currentFilters ? {
		pageOrigin: url,
		filterName: inputValue,
		filters: currentFilters
	} : undefined;

	const response = toSave ? await apiServicePOST('filters', toSave) : undefined;

	response?.ok
		? customToast('Success', 'Filtry byly uloženy.')
		: customToast('Critical', 'Nepodařilo se uložit filtry.')
	;
}
