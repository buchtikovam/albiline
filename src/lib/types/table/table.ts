export type TableColumn = {
	id: number,
	accessor: string,
	header: string,
	type: string,
	size: string,
	sortDisabled: 0 | 1,
	resizeDisabled: 0 | 1,
}

export type TableRows = Record<string, any>[]

export type TableType = {
	items: TableRows,
	columnInfo: TableColumn[]
}
