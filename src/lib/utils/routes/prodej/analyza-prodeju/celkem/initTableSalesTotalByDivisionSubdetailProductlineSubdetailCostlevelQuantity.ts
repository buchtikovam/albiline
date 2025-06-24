import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity(): AgGridTableType {
	return {
		type: "clientSide",
		name: "SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity",
		requiredFields: ["itemId"],
		identificationKey: "itemId",
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
