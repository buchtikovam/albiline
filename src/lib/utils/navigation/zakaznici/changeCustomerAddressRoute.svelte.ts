import {serverSideTables} from '$lib/runes/table.svelte';
import {i18n} from '$lib/i18n.js'
import {processRoute} from '$lib/utils/navigation/processRoute';
import {goto} from '$app/navigation';


export function changeCustomerAddressRoute(
	direction: "left" | "right",
	routeId: string,
	tableKey: string,
) {
	const table = $state(serverSideTables[tableKey]);

	if (direction === "right") {
		// get new route
		const newRoute = processRoute(routeId, {
			customerNodeCode: table.selectedRows[table.activeSelectedRowIndex + 1].customerNodeCode || "",
			customerAddressCode: table.selectedRows[table.activeSelectedRowIndex + 1].customerAddressCode || ""
		})

		// set new index
		table.activeSelectedRowIndex = table.activeSelectedRowIndex + 1;

		// navigate to new route
		goto(i18n.resolveRoute(newRoute)).then(() => {});
	}

	if (direction === "left") {
		const newRoute = processRoute(routeId, {
			customerNodeCode: table.selectedRows[table.activeSelectedRowIndex - 1].customerNodeCode,
			customerAddressCode: table.selectedRows[table.activeSelectedRowIndex - 1].customerAddressCode
		})

		table.activeSelectedRowIndex =  table.activeSelectedRowIndex - 1;
		goto(i18n.resolveRoute(newRoute)).then(() => {});
	}

	return;
}
