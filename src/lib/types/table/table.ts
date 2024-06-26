export type Column = {
	id: number,
	accessor: string,
	header: string,
	type: string,
	size: string,
	sortDisabled: boolean,
	resizeDisabled: boolean,
}

export type TableRowData = Record<string, any>[]
