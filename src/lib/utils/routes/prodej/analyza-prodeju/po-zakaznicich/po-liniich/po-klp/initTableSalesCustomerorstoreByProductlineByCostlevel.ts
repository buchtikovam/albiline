import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesCustomerorstoreByProductlineByCostlevel(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesCustomerorstoreByProductlineByCostlevel",
		requiredFields: ["costLevelCode"],
		identificationKey: "costLevelCode",
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
