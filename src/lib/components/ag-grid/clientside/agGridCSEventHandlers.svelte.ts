import type {
	BodyScrollEvent,
	ColumnMovedEvent,
	ColumnPinnedEvent, ColumnResizedEvent,
	ColumnVisibleEvent,
	FilterChangedEvent, GridApi, RowDataUpdatedEvent, SelectionChangedEvent,
	SortChangedEvent
} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";


export function handleCellEditingStarted(
	updateIsEditing: (newValue: boolean) => void
): void {
	updateIsEditing(true);
}


export function handleCellEditingStopped(
	updateIsEditing: (newValue: boolean) => void
): void {
	updateIsEditing(false);
}


export function handleFilterChanged(
	event: FilterChangedEvent,
	table: AgGridTableType
): void {
	const currentFilter = event.api.getFilterModel();
	table.filtersToSave = currentFilter;
	const lastStoredFilter = table.recentFilters[table.recentFilters.length - 1] || {};

	if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
		table.recentFilters.push(currentFilter);
	}
}


export function handleColumnMoved(
	event: ColumnMovedEvent,
	table: AgGridTableType
): void {
	table.presetToSave = event.api.getColumnState() || [];
}


export function handleColumnVisibleChanged(
	event: ColumnVisibleEvent,
	table: AgGridTableType,
	isInitial: boolean
) {
	table.showRefreshDataButton = false;

	if (!isInitial) {
		// Save column state

		table.presetToSave = event.api.getColumnState() || [];

		// Get all visible columns (excluding ag-Grid internal columns)
		const visibleColumnsFields = event.api.getColumnState()
			.filter(colState => !colState.hide && !colState.colId.includes("ag-Grid"))
			.map(colState => colState.colId);

		// Exit early if no visible columns
		if (visibleColumnsFields.length === 0) {
			table.showRefreshDataButton = false;
			return;
		}

		// Determine maximum rows to check (capped at 1000)
		const iterationMax = Math.min(table.latestRowCount ?? 1000, 1000);
		const columnsWithData = new Set<string>();
		const pendingColumns = new Set(visibleColumnsFields);
		let processedNodes = 0;

		// Check each node up to iterationMax or until all columns have data
		event.api.forEachNode((node) => {
			if (processedNodes >= iterationMax || pendingColumns.size === 0) return;

			// Check remaining pending columns against this node's data
			Array.from(pendingColumns).forEach(colId => {
				if (node.data?.[colId] != null) { // Using optional chaining
					columnsWithData.add(colId);
					pendingColumns.delete(colId);
				}
			});

			processedNodes++;
		});


		// Get column definitions for header names
		const columnDefs = event.api.getColumnDefs() || [];

		// Helper to find column def recursively
		const findColumnDef = (targetColId: string, defs: any[]): any => {
			for (const def of defs) {
				if (def.colId === targetColId) return def;
				if (def.children) {
					const childDef = findColumnDef(targetColId, def.children);
					if (childDef) return childDef;
				}
			}
			return null;
		};

		// Convert empty column IDs to header names with group handling
		const emptyColumns = visibleColumnsFields
			.filter(colId => !columnsWithData.has(colId))
			.flatMap(colId => {
				const colDef = findColumnDef(colId, columnDefs);
				if (!colDef) return [colId]; // Fallback to ID if not found

				// Handle group columns
				if (colDef.children) {
					return colDef.children
						.filter(
							(childDef: { colId: string }) => !columnsWithData.has(childDef.colId)
						)
						.map(
							(childDef: { headerName: any; colId: any }) =>
								childDef.headerName || childDef.colId
						);
				}

				return [colDef.headerName || colId];
			});

		// Update UI and log results
		table.showRefreshDataButton = emptyColumns.length > 0;
	} else {
		table.showRefreshDataButton = false;
	}
}


export function handleColumnPinned(
	event: ColumnPinnedEvent<any>,
	table: AgGridTableType
) {
	table.presetToSave = event.api.getColumnState() || [];
}


export function handleColumnResized(
	event: ColumnResizedEvent,
	table: AgGridTableType
): void {
	table.presetToSave = event.api.getColumnState();
}


export function handleSortChanged(
	event: SortChangedEvent,
	table: AgGridTableType
): void {
	table.presetToSave = event.api.getColumnState() || [];
}


export function handleBodyScroll(
	event: BodyScrollEvent, 
	table: AgGridTableType
): void {
	if (event.top > -1) {
		table.lastVisibleRowIndex = event.api.getFirstDisplayedRowIndex();
	}
}


export function handleRowDataUpdated(
	gridApi: GridApi,
	event: RowDataUpdatedEvent, 
	table: AgGridTableType
): void {
	setTimeout(() => {
		if (!gridApi.isDestroyed()) {
			table.lastVisibleRowIndex < 10
				? event.api.ensureIndexVisible(table.lastVisibleRowIndex, "top")
				: event.api.ensureIndexVisible(table.lastVisibleRowIndex + 10, "top");
		}
	}, 300)
}


export function handleSelectionChanged(
	event: SelectionChangedEvent,
	table: AgGridTableType
): void {
	table.selectedRows = event.api.getSelectedRows();
}
