import {pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/po-klp/$types";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductlineByCostlevel"],
		index: 0,
	}
};
