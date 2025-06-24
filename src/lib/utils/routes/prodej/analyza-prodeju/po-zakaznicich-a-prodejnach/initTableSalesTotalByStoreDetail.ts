import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesTotalByStoreDetail(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesTotalByStoreDetail",
		identificationKey: "divisionId",
		requiredFields: [],
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
