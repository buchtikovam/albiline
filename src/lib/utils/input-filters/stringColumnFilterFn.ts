import type { TextFilters } from '$lib/types/table/filter';
import { currentFiltersStore } from '$lib/stores/tableStore';

export const stringColumnFilterFn = (accessor: string) => {
	let currentFilter: TextFilters;

	currentFiltersStore.subscribe((filters) => {
		if (filters) {
			if (filters[accessor]) {
				currentFilter = filters[accessor].colFilter;
			}
		}
	})

	return ({ filterValue, value }: { filterValue: string, value: string }) => {

		if (currentFilter === 'contains') {
			return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
		}

		if (currentFilter === 'starts-with') {
			return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
		}

		if (currentFilter === 'ends-with') {
			return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
		}

		return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
	};
};
