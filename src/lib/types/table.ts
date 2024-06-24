export type Column = {
	id: number,
	accessor: string,
	header: string,
	type: string,
	size: string,
}

export type TableRowData = Record<string, any>[]
