import {pageKeys} from "$lib/runes/table.svelte";
import type {
	LayoutLoad
} from "../../../../../../../../.svelte-kit/types/src/routes/(app)/(main)/prodej/analyza-prodeju/po-zakaznicich/po-liniich/$types";


export const load: LayoutLoad = async () => {
	pageKeys.value = {
		value: ["SalesCustomerorstoreByProductline"],
		index: 0,
	}
};
