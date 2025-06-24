import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {LayoutLoad} from '../$types';
import {initTableCustomersGetList} from "$lib/utils/routes/prodej/zakaznici/initTableCustomersGetList";


export const load: LayoutLoad = async (event) => {
	pageKeys.value = {
		value: ["CustomersGetList"],
		index: 0
	};

	if (!agGridTables.value["CustomersGetList"]) {
		agGridTables.value["CustomersGetList"] = initTableCustomersGetList();
	}
};
