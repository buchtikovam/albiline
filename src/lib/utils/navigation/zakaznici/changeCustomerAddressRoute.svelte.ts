import {agGridTables} from '$lib/runes/table.svelte';
import {processRoute} from '$lib/utils/navigation/processRoute';
import {goto} from '$app/navigation';
import {localizeHref} from "$lib/paraglide/runtime";


export function changeCustomerAddressRoute(
	direction: "left" | "right",
	routeId: string,
	tableKey: string,
) {
	const table = $state(agGridTables.value[tableKey]);

	if (direction === "right") {
		// get new route
		const newRoute = processRoute(routeId, {
			customerNodeCode: table.selectedRows[table.activeSelectedRowIndex + 1].customerNodeCode || "",
			customerAddressCode: table.selectedRows[table.activeSelectedRowIndex + 1].customerAddressCode || ""
		})

		// set new index
		table.activeSelectedRowIndex = table.activeSelectedRowIndex + 1;

		// navigate to new route
		goto(localizeHref(newRoute));
	}

	if (direction === "left") {
		const newRoute = processRoute(routeId, {
			customerNodeCode: table.selectedRows[table.activeSelectedRowIndex - 1].customerNodeCode,
			customerAddressCode: table.selectedRows[table.activeSelectedRowIndex - 1].customerAddressCode
		})

		table.activeSelectedRowIndex =  table.activeSelectedRowIndex - 1;
		goto(localizeHref(newRoute));
	}

	return;
}
