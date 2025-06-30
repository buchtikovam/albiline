import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import {initTableCustomersGetList} from "$lib/utils/routes/prodej/zakaznici/initTableCustomersGetList";
import type { LayoutLoad } from '../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/zakaznici/$types';


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["CustomersGetList"],
		index: 0
	};

	if (!agGridTables.value["CustomersGetList"]) {
		agGridTables.value["CustomersGetList"] = initTableCustomersGetList();
	}
};
