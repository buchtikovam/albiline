export function tableFulltextFilter(filterValue: string, value: string): boolean {
	if (!filterValue) {
		return true;
	}

	const inputParams = filterValue.toLowerCase().split(" ");

	// TODO: make custom fulltext filter fn
	return inputParams.every((param) => value.toLowerCase().includes(param));
}
