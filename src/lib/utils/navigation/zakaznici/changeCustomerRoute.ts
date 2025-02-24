import { processRoute } from '$lib/utils/navigation/processRoute';
import { goto } from '$app/navigation';
import { i18n } from '$lib/i18n.js'
import {serverSideTables} from "$lib/runes/table.svelte";
import {pageKey} from "$lib/runes/page.svelte";


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

	const table = $state(serverSideTables[pageKey.value]);

	if (activeRowIndex === -1) return {
		right: true,
		left: true
	};

	if (direction === "right") {
		const nextIndex = activeRowIndex + 1;

		// locate item in non-unique selected rows and set its id, to allow navigation to customer addresses
		table.activeSelectedRowIndex = selectedRows.findIndex((item) => {
			return item === uniqueSelectedRows[nextIndex];
		})

		console.log(routeId)

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: uniqueSelectedRows[nextIndex].customerNodeCode, }
		)

		console.log(newRoute)

		goto(i18n.resolveRoute(newRoute)).then(() => {
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
		})
	}


	if (direction === "left") {
		const prevIndex = activeRowIndex - 1;

		table.activeSelectedRowIndex = 	selectedRows.findIndex((item) => {
			return item === uniqueSelectedRows[prevIndex];
		})

		const newRoute = processRoute(
			routeId,
			{ customerNodeCode: selectedRows[prevIndex].customerNodeCode, }
		)


		goto(i18n.resolveRoute(newRoute)).then(() => {
			if (!selectedRows[activeRowIndex - 2]) {
				return {
					right: false,
					left: true
				}
			}

			return {
				right: false,
				left: false
			}
		})
	}


	return {
		right: false,
		left: false,
	}
}
