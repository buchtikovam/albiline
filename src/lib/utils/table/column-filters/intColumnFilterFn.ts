import { IntColumnFilterEnum } from '$lib/enums/column-filters/intColumnFilterEnum';
import { currentFiltersStore } from '$lib/stores/tableStore';


export const intColumnFilterFn = (accessor: string) => {
	let currentFilter: IntColumnFilterEnum;

	currentFiltersStore.subscribe((filters) => {
		if (filters) {
			if (filters[accessor]) {
				currentFilter = filters[accessor].colFilter;
			}
		}
	})

	return ({ filterValue, value }: { filterValue: number, value: number }) => {

		if (filterValue === null) {
			return true
		}

		if (filterValue) {
			if (currentFilter === IntColumnFilterEnum.EQUALS) {
				return value === Number(filterValue)
			}

			if (currentFilter === IntColumnFilterEnum.SMALLER_THAN) {
				return value < Number(filterValue)
			}

			if (currentFilter === IntColumnFilterEnum.BIGGER_THAN) {
				return value > Number(filterValue)
			}
		}

		return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
	};
};
