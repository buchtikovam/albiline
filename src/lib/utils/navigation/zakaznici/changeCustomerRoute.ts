import { activeSelectedRowIndexStore } from '$lib/stores/tableStore';
import { goto } from '$app/navigation';
import { processRoute } from '$lib/utils/navigation/processRoute';


export function changeCustomerRoute(
	selectedRows: Record<string, any>[],
	direction: "left" | "right",
	activeId: { customerNodeCode: number },
	routeId: string = "",
) {

	// get objects with unique customerNodeCode
	const uniqueSelectedRows = selectedRows.reduce((acc, item) => {
		const existingIndex = acc.findIndex(accItem => accItem.customerNodeCode === item.customerNodeCode);
		if (existingIndex === -1) {
			acc.push(item);
		}
		return acc;
	}, []);

	console.log(uniqueSelectedRows);

	// get active index in unique selected rows
	const activeRowIndex = uniqueSelectedRows.findIndex((id) =>
		id.customerNodeCode === activeId.customerNodeCode
	);

	console.log(activeRowIndex);


	if (direction === "right") {
		const nextIndex = activeRowIndex + 1;

		console.log(nextIndex);

		// locate item in non-unique selected rows and set its id, to allow navigation to customer addresses
		activeSelectedRowIndexStore.set(
			selectedRows.findIndex((item) => {
				return item === uniqueSelectedRows[nextIndex];
			})
		)

		const newRoute = processRoute(
			routeId,
			{ idZakaznika: selectedRows[nextIndex].customerNodeCode, }
		)

		console.log(newRoute);

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
			{ idZakaznika: selectedRows[prevIndex].customerNodeCode, }
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
