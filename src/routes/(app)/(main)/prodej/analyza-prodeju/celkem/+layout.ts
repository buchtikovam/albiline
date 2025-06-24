import {agGridTables, pageKeys} from "$lib/runes/table.svelte.js";
import type {LayoutLoad} from "../../../../../../../.svelte-kit/types/src/routes/(app)/$types";
import {
	initTableSalesTotalByDivision
} from "$lib/utils/routes/prodej/analyza-prodeju/celkem/initTableSalesTotalByDivision";
import {
	initTableSalesTotalByDivisionSubdetailProductline
} from "$lib/utils/routes/prodej/analyza-prodeju/celkem/initTableSalesTotalByDivisionSubdetailProductline";
import {
	initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevel
} from "$lib/utils/routes/prodej/analyza-prodeju/celkem/initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevel";
import {
	initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity
} from "$lib/utils/routes/prodej/analyza-prodeju/celkem/initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity";
import {
	initTableSalesCustomdetailByCustomers
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/initTableSalesCustomdetailByCustomers";



export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: [
			"SalesTotalByDivision",
			"SalesTotalByDivisionSubdetailProductline",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel",
			"SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"
		],
		index: 0
	};

	// *Po divizích
	if (!agGridTables.value["SalesTotalByDivision"]) {
		agGridTables.value["SalesTotalByDivision"] = initTableSalesTotalByDivision();
	}

	// Detail po liniích
	if (!agGridTables.value["SalesTotalByDivisionSubdetailProductline"]) {
		agGridTables.value["SalesTotalByDivisionSubdetailProductline"] = initTableSalesTotalByDivisionSubdetailProductline();
	}

	// Detail po KLP
	if (!agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"]) {
		agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevel"] = initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevel();
	}

	// Detail po KS
	if (!agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"]) {
		agGridTables.value["SalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity"] = initTableSalesTotalByDivisionSubdetailProductlineSubdetailCostlevelQuantity();
	}


	// 	Table definitions for redirect to /prodej/analyza-prodeju/po-zakaznicich


	// Po zákaznících
	if (!agGridTables.value["SalesCustomdetailByCustomers"]) {
		agGridTables.value["SalesCustomdetailByCustomers"] = initTableSalesCustomdetailByCustomers();
	}
};
