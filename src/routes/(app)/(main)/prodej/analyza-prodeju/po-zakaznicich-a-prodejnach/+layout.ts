import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import {
	initTableSalesTotalByStore
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/initTableSalesTotalByStore";
import {
	initTableSalesTotalByStoreDetail
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/initTableSalesTotalByStoreDetail";
import {
	initTableSalesSubdetailByCostlevel
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/initTableSalesSubdetailByCostlevel";
import {
	initTableSalesDocumentByCustomerorstore
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach/initTableSalesDocumentByCustomerorstore";
import type {LayoutLoad} from './$types';
import {
	initTableSalesCustomerorstoreByProductline
} from "$lib/utils/routes/prodej/analyza-prodeju/po-zakaznicich/po-liniich/initTableSalesCustomerorstoreByProductline";



export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: [
			"SalesTotalByStore",
			"SalesTotalByStoreDetail",
			"SalesSubdetailByCostlevel"
		],
		index: 0,
	}

	// *Celkové po divizích
	if (!agGridTables.value["SalesTotalByStore"]) {
		agGridTables.value["SalesTotalByStore"] = initTableSalesTotalByStore();
	}

	// Detail po divizích
	if (!agGridTables.value["SalesTotalByStoreDetail"]) {
		agGridTables.value["SalesTotalByStoreDetail"] = initTableSalesTotalByStoreDetail();
	}

	// Detail po KLP
	if (!agGridTables.value["SalesSubdetailByCostlevel"]) {
		agGridTables.value["SalesSubdetailByCostlevel"] = initTableSalesSubdetailByCostlevel();
	}


	// Table definitions for redirect to /prodej/analyza-prodeju/po-zakaznicich-a-prodejnach/po-fakturach

	// Po zákaznících a fakturách
	if (!agGridTables.value["SalesDocumentByCustomerorstore"]) {
		agGridTables.value["SalesDocumentByCustomerorstore"] = initTableSalesDocumentByCustomerorstore();
	}


	// 	Table definitions for redirect to /prodej/analyza-prodeju/po-zakaznicich/po-liniich

	// Po zákaznících a liniích
	if (!agGridTables.value["SalesCustomerorstoreByProductline"]) {
		agGridTables.value["SalesCustomerorstoreByProductline"] = initTableSalesCustomerorstoreByProductline();
	}
};
