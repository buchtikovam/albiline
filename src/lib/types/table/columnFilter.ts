export type ColumnFilters = {
	[key: string]: any
}

export type FetchedFilter = {
	id: number,
	pageOrigin: string,
	filterName: string,
	filters: ColumnFilters 
}
