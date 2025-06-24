import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/$types";
import {
	initTableSalesCustomerorstoreByProductline
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/initTableSalesCustomerorstoreByProductline";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomdetailByCustomers"],
		index: 0,
	}


	// 	Table definitions for redirect to /prodej/analyza-prodeju/po-zakaznicich/po-liniich


	// Po zákaznících a liniích
	if (!agGridTables.value["SalesCustomerorstoreByProductline"]) {
		agGridTables.value["SalesCustomerorstoreByProductline"] = initTableSalesCustomerorstoreByProductline();
	}
};
