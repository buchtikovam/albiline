import { activeSelectedRowIndexStore } from '$lib/stores/tableStore';
import { goto } from '$app/navigation';
import { processRoute } from '$lib/utils/navigation/processRoute';

export function changeCustomerAddressRoute(
	ids: Record<string, any>[],
	direction: "left" | "right",
	activeId: Record<string, any>,
	routeId: string = "",
) {
	const currentIndex = ids.findIndex((id) =>
		id.customerNodeCode === activeId.customerNodeCode &&
		id.customerAddressCode === activeId.customerAddressCode
	);

	if (direction === "right") {
		const nextIndex = currentIndex + 1;
		activeSelectedRowIndexStore.set(nextIndex)

		const newRoute = processRoute(routeId, {
			idZakaznika: ids[nextIndex].customerNodeCode || "",
			idProdejny: ids[nextIndex].customerAddressCode || ""
		})

		goto(newRoute)

		if (!ids[currentIndex + 2]) {
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
			idZakaznika: ids[prevIndex].customerNodeCode,
			idProdejny: ids[prevIndex].customerAddressCode
		})

		goto(newRoute)

		if (!ids[currentIndex - 2]) {
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
