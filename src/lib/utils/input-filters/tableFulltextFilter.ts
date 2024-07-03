export function tableFulltextFilter(filterValue: string, value: string): boolean {
	// const inputParams = filterValue.split(" ")

	// TODO: fulltext functionality - split by space and if match, return true

	return value.toLowerCase().includes(filterValue.toLowerCase())
}
