export type Column = {
	id: number,
	accessor: string,
	header: string,
	type: string,
	size: string,
	sortDisabled: 0 | 1,
	resizeDisabled: 0 | 1,
}

export type TableRowData = Record<string, any>[]
