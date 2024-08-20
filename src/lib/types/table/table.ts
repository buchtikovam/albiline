import type { IServerSideGetRowsRequest } from "ag-grid-enterprise";

export interface TableRowRequest extends IServerSideGetRowsRequest {
	fulltext?: string,
	lastStoredIndex?: number | null,
	rowAmount?: number
}

export type ColumnOrder = ColId[]

type ColId = {
	colId: string
}