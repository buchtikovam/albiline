export function tableFulltextFilter(filterValue: string, value: string): boolean {
	if (!filterValue) return true;

	const inputParams = filterValue.toLowerCase().split(" ");

	return inputParams.every((param) => value.toLowerCase().includes(param));
}
