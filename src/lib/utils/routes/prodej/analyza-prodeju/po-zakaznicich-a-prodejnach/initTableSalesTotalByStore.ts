import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";
import type {AgGridTableType} from "$lib/types/components/table/table";

export function initTableSalesTotalByStore(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesTotalByStore",
		identificationKey: "deliveryAddressCode",
		requiredFields: [],
		necessaryDataColumns: [],
		...getAgGridTableFields()
	}
}
