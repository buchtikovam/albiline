import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesCustomerorstoreByProductline(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesCustomerorstoreByProductline",
		requiredFields: ["productLineId"],
		identificationKey: "productLineId",
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
