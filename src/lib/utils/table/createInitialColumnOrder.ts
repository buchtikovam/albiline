import { get, type Writable } from 'svelte/store';
import { columnOrderStore } from '$lib/stores/tableStore';
import type { TableColumn } from '$lib/types/table/table';

export function createInitialColumnOrder(columnStore: Writable<TableColumn[]>): string[] {
	const storedOrder = get(columnOrderStore);

	if (storedOrder.length > 0) {
		return storedOrder;
	}

	return get(columnStore).map((column: TableColumn) => {
		return column.accessor;
	});
}
