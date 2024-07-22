import { StringColumnFilterEnum } from '$lib/enums/column-filters/stringColumnFilterEnum';
import { currentFiltersStore } from '$lib/stores/tableStore';


export const stringColumnFilterFn = (accessor: string) => {
	let currentFilter: StringColumnFilterEnum;

	currentFiltersStore.subscribe((filters) => {
		if (filters) {
			if (filters[accessor]) {
				currentFilter = filters[accessor].colFilter;
			}
		}
	})

	return ({ filterValue, value }: { filterValue: string, value: string }) => {

		if (currentFilter === StringColumnFilterEnum.CONTAINS) {
			return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
		}

		if (currentFilter === StringColumnFilterEnum.STARTS_WITH) {
			return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
		}

		if (currentFilter === StringColumnFilterEnum.ENDS_WITH) {
			return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
		}

		return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
	};
};
