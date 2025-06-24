import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
import type {LayoutLoad} from "../../../../../../.svelte-kit/types/src/routes/(app)/$types";
import {initTableProductStockInventory} from "$lib/utils/routes/sklad/stav-skladu/initTableProductStockInventory";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["ProductStockInventory"],
		index: 0,
	}

	if (!agGridTables.value["ProductStockInventory"]) {
		agGridTables.value["ProductStockInventory"] = initTableProductStockInventory();
	}
};
