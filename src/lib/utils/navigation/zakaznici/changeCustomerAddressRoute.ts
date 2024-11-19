import { activeSelectedRowIndexStore } from '$lib/stores/tableStore';
import { goto } from '$app/navigation';
import { processRoute } from '$lib/utils/navigation/processRoute';

export function changeCustomerAddressRoute(
	selectedRows: Record<string, number>[],
	direction: "left" | "right",
	activeId: Record<string, number>,
	routeId: string = "",
) {
	const currentIndex = selectedRows.findIndex((id) =>
		id.customerNodeCode === activeId.customerNodeCode &&
		id.customerAddressCode === activeId.customerAddressCode
	);

	if (direction === "right") {
		const nextIndex = currentIndex + 1;
		activeSelectedRowIndexStore.set(nextIndex)

		const newRoute = processRoute(routeId, {
			idZakaznika: selectedRows[nextIndex].customerNodeCode || "",
			idProdejny: selectedRows[nextIndex].customerAddressCode || ""
		})

		goto(newRoute)

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
	}

	if (direction === "left") {
		const prevIndex = currentIndex - 1;
		activeSelectedRowIndexStore.set(prevIndex)

		const newRoute = processRoute(routeId, {
			idZakaznika: selectedRows[prevIndex].customerNodeCode,
			idProdejny: selectedRows[prevIndex].customerAddressCode
		})

		goto(newRoute)

		if (!selectedRows[currentIndex - 2]) {
			return {
				right: false,
				left: true
			}
		}
	}

	return {
		right: false,
		left: false,
	}
}
