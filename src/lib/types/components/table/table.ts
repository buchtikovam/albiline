import type { IServerSideGetRowsRequest } from "ag-grid-enterprise";

export interface TableRowRequest extends IServerSideGetRowsRequest {
	fulltext?: string,
	lastRow?: number | null,
	rowBatchSize?: number
}

export type ColumnOrder = ColId[]

type ColId = {
	colId: string
}