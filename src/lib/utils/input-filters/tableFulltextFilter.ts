export function tableFulltextFilter(filterValue: string, value: string): boolean {
	// const inputParams = filterValue.split(" ")

	// TODO: fulltext functionality

	return value.toLowerCase().includes(filterValue.toLowerCase())
}
