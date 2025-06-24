import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/$types";
import {
	initTableSalesCustomerorstoreByProductlineByCostlevel
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp/initTableSalesCustomerorstoreByProductlineByCostlevel";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductline"],
		index: 0,
	}


	// Table definitions for redirect to /prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp


	// Po zákaznících a KLP
	if (!agGridTables.value["SalesCustomerorstoreByProductlineByCostlevel"]) {
		agGridTables.value["SalesCustomerorstoreByProductlineByCostlevel"] = initTableSalesCustomerorstoreByProductlineByCostlevel();
	}
};
