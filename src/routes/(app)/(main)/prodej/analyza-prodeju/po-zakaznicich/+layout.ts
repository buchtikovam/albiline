import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/$types";
import {redirect} from "@sveltejs/kit";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomdetailByCustomers"],
		index: 0,
	}

	// if (!agGridTables.value['SalesCustomdetailByCustomers']) {
	// 	redirect(303, '/prodej/analyza-prodeju/celkem');
	// } // TODO: add encoding into url with warning
	//
	// if (Object.keys(agGridTables.value['SalesCustomdetailByCustomers'].loadedInputParams).length === 0) {
	// 	redirect(303, '/prodej/analyza-prodeju/celkem'); // TODO: add encoding into url with warning
	// }
};
