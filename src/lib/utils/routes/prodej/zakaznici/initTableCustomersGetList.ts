import type {AgGridTableType} from "$lib/types/components/table/table";
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableCustomersGetList(): AgGridTableType {
	return {
		url: "customers",
		type: "serverSide",
		name: "CustomersGetList",
		requiredFields: ["customerAddressCode", "customerNodeCode", "i_Name"],
		identificationKey: "rowNumber",
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
