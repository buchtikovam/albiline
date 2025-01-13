import { activeSelectedRowIndex } from '$lib/runes/table.svelte';
import { processRoute } from '$lib/utils/navigation/processRoute';
import { goto } from '$app/navigation';
import { i18n } from '$lib/i18n.js'


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

	if (direction === "right") {
		const nextIndex = currentIndex + 1;
		activeSelectedRowIndex.value = nextIndex;

		const newRoute = processRoute(routeId, {
			customerNodeCode: selectedRows[nextIndex].customerNodeCode || "",
			customerAddressCode: selectedRows[nextIndex].customerAddressCode || ""
		})

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
		activeSelectedRowIndex.value = prevIndex;

		const newRoute = processRoute(routeId, {
			customerNodeCode: selectedRows[prevIndex].customerNodeCode,
			customerAddressCode: selectedRows[prevIndex].customerAddressCode
		})

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
