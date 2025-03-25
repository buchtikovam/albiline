import {agGridTables} from "$lib/runes/table.svelte";
import {processRoute} from '$lib/utils/navigation/processRoute';
import {goto} from '$app/navigation';
import {localizeHref} from "$lib/paraglide/runtime";


export function changeCustomerRoute(
	activeIndex: number,
	uniqueSelectedRows: Record<string, any>[],
	direction: "left" | "right",
	routeId: string = "",
	tableKey: string,
) {
	// get active index in unique selected rows
	const table = $state(agGridTables.value[tableKey]);

	if (direction === "right") {
		const nextIndex = activeIndex + 1;

		// locate item in non-unique selected rows and set its id, to allow navigation to customer addresses
		table.activeSelectedRowIndex = table.selectedRows.findIndex((item) => {
			return item === uniqueSelectedRows[nextIndex];
		})

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: uniqueSelectedRows[nextIndex].customerNodeCode }
		)

		goto(localizeHref(newRoute));

		return;
	}


	if (direction === "left") {
		const prevIndex = activeIndex - 1;

		table.activeSelectedRowIndex = 	table.selectedRows.findIndex((item) => {
			return item === uniqueSelectedRows[prevIndex];
		})

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: uniqueSelectedRows[prevIndex].customerNodeCode }
		)

		goto(localizeHref(newRoute));

		return;
	}
}
