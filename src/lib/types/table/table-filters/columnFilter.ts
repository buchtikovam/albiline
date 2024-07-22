import type { IntColumnFilter } from "./intColumnFilter"
import type { StringColumnFilter } from "./stringColumnFilter"

export type StoredFilters = {
	[key: string]: StringColumnFilter | IntColumnFilter;
}

export type FetchedFilter = {
	id: number,
	pageOrigin: string,
	filterName: string,
	filters: StoredFilters 
}
