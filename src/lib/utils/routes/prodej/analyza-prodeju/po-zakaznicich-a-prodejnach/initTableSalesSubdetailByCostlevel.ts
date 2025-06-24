import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";
import type {AgGridTableType} from "$lib/types/components/table/table";

export function initTableSalesSubdetailByCostlevel(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesSubdetailByCostlevel",
		identificationKey: "costLevelCode",
		requiredFields: [],
		necessaryDataColumns: [],
		...getAgGridTableFields()
	}
}
