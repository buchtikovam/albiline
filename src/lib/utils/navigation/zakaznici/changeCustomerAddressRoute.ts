import {serverSideTables} from '$lib/runes/table.svelte';
import { processRoute } from '$lib/utils/navigation/processRoute';
import { goto } from '$app/navigation';
import { i18n } from '$lib/i18n.js'
import {pageKey} from "$lib/runes/page.svelte";


export function changeCustomerAddressRoute(
	selectedRows: Record<string, any>[],
	direction: "left" | "right",
	activeId: Record<string, number>,
	routeId: string = "",
): {
	right: boolean;
	left: boolean;
} {
	const currentIndex = selectedRows.findIndex((id) =>
		id.customerNodeCode === activeId.customerNodeCode &&
		id.customerAddressCode === activeId.customerAddressCode
	);

	const table = $state(serverSideTables[pageKey.value]);

	if (direction === "right") {
		const nextIndex = currentIndex + 1;
		table.activeSelectedRowIndex = nextIndex;

		const newRoute = processRoute(routeId, {
			customerNodeCode: selectedRows[nextIndex].customerNodeCode || "",
			customerAddressCode: selectedRows[nextIndex].customerAddressCode || ""
		})

		console.log(newRoute)
		console.log(i18n.resolveRoute(newRoute))

		goto(i18n.resolveRoute(newRoute)).then(() => {
			if (!selectedRows[currentIndex + 2]) {
				return {
					right: true,
					left: false
				}
			}

			return {
				right: false,
				left: false,
			}
		});
	}

	if (direction === "left") {
		const prevIndex = currentIndex - 1;
		table.activeSelectedRowIndex = prevIndex;

		const newRoute = processRoute(routeId, {
			customerNodeCode: selectedRows[prevIndex].customerNodeCode,
			customerAddressCode: selectedRows[prevIndex].customerAddressCode
		})

		console.log(newRoute)
		console.log(i18n.resolveRoute(newRoute))

		goto(i18n.resolveRoute(newRoute)).then(() => {
			if (!selectedRows[currentIndex - 2]) {
				return {
					right: false,
					left: true
				}
			}

			return {
				right: false,
				left: false,
			}
		});
	}

	return {
		right: false,
		left: false,
	}
}
