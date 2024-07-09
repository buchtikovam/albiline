export type TextFilters = 'default' | 'contains' | 'starts-with' | 'ends-with'

export type Filter = {
	value: string,
	colFilter: TextFilters
}

export type StoredFilters = {
	[key: string]: Filter
}

export type FetchedFilter = {
	id: number,
	pageOrigin: string,
	filterName: string,
	filters: StoredFilters | null
}
