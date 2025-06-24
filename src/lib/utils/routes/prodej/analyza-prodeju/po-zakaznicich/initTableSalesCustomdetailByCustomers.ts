import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesCustomdetailByCustomers(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesCustomdetailByCustomers",
		requiredFields: ["customerNodeCode"],
		identificationKey: "customerNodeCode",
		necessaryDataColumns: ["returnQuantity_LY", "returnQuantity_AY", "returnSales_LY", "returnSales_AY", ],
		...getAgGridTableFields(),
	}
}
