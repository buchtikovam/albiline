import type { AgGridTableType } from '$lib/types/components/table/table';
import {getAgGridTableFields} from "$lib/utils/components/ag-grid/getAgGridTableFields";

export function initTableProductStockInventory(): AgGridTableType {
	return {
		type: "clientSide",
		name: "ProductStockInventory",
		requiredFields: ["productId"],
		identificationKey: "productId",
		necessaryDataColumns: [],
		...getAgGridTableFields(),
	}
}
