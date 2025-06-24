import type { AgGridTableType } from '$lib/types/components/table/table';
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesDocumentByCustomerorstore(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesDocumentByCustomerorstore",
		identificationKey: "documentCode",
		requiredFields: [],
		necessaryDataColumns: [],
		...getAgGridTableFields()
	}
}
