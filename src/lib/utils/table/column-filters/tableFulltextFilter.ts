export function tableFulltextFilter(filterValue: string, value: string): boolean {
	if (!filterValue) {
		return true;
	}

  	const filterValueArr = filterValue.toLowerCase().split(/\s+/);
  	return filterValueArr.some(filterWord => value.toLowerCase().includes(filterWord));
}
