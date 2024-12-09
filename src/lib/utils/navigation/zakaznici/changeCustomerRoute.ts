import { activeSelectedRowIndexStore } from '$lib/runes-global/table.svelte';
import { goto } from '$app/navigation';
import { processRoute } from '$lib/utils/navigation/processRoute';


export function changeCustomerRoute(
	selectedRows: Record<string, any>[],
	uniqueSelectedRows: Record<string, any>[],
	direction: "left" | "right",
	activeId: { customerNodeCode: number },
	routeId: string = "",
): {
	right: boolean;
	left: boolean;
} {
	// get active index in unique selected rows
	const activeRowIndex = uniqueSelectedRows.findIndex((id) =>
		id.customerNodeCode === activeId.customerNodeCode
	);

	if (activeRowIndex === -1) return;

	if (direction === "right") {
		const nextIndex = activeRowIndex + 1;

		// locate item in non-unique selected rows and set its id, to allow navigation to customer addresses
		activeSelectedRowIndexStore.set(
			selectedRows.findIndex((item) => {
				return item === uniqueSelectedRows[nextIndex];
			})
		)

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: uniqueSelectedRows[nextIndex].customerNodeCode, }
		)

		goto(newRoute)

		if (!uniqueSelectedRows[activeRowIndex + 2]) {
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
		const prevIndex = activeRowIndex - 1;

		activeSelectedRowIndexStore.set(
			selectedRows.findIndex((item) => {
				return item === uniqueSelectedRows[prevIndex];
			})
		)

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: selectedRows[prevIndex].customerNodeCode, }
		)

		goto(newRoute)

		if (!selectedRows[activeRowIndex - 2]) {
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
