import type { FilterModel } from "ag-grid-enterprise";

export type StoredFilters = {
	filterId: number;
	filterName: string;
	filters: FilterModel;
}
