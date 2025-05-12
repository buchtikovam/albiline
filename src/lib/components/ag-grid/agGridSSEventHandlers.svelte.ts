import {addToEditedTableData} from '$lib/utils/addToEditedTableData';
import type {
	CellValueChangedEvent,
	ColumnMovedEvent,
	SelectionChangedEvent,
	SortChangedEvent
} from 'ag-grid-community';
import type {
	ColumnPinnedEvent, ColumnVisibleEvent, FilterChangedEvent,
	GridApi,
	RowSelectedEvent,
} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import {disablePageTabs} from "$lib/runes/navigation.svelte";


// row events


export function handleRowSelected(
	e: RowSelectedEvent,
	gridApi: GridApi,
	table: AgGridTableType
): void {
	if (gridApi) {
		table.selectionState = e.api.getServerSideSelectionState() || {
			toggledNodes: [],
			selectAll: false
		}
	}

	// Update selectedRows persistence with null checks
	if (table.selectionState?.toggledNodes) {
		const rows: Record<string, unknown>[] = [];

		table.selectionState.toggledNodes.forEach((rowNumber) => {
			const row = e.api.getDisplayedRowAtIndex(Number(rowNumber) - 1);

			if (row?.data) {
				const rowObj: Record<string, unknown> = {};
				table.requiredFields?.forEach((field) => {
					rowObj[field] = row.data?.[field] ?? null;
				});
				rows.push(rowObj);
			}
		});

		table.selectedRows= rows;
	}
}


// cell events


export function handleCellValueChanged (
	event: CellValueChangedEvent,
	table: AgGridTableType,
): void {
	if (event.oldValue === event.newValue) return;

	addToEditedTableData(
		event,
		table.requiredFields,
		table.editedTableData
	);
}


export function handleCellEditingStart(
	updateIsEditing: (newValue: boolean) => void,
): void {
	updateIsEditing(true)
}


export function handleCellEditingStopped(
	updateIsEditing: (newValue: boolean) => void,
): void {
	updateIsEditing(false)
}


// column events


export function handleColumnMoved(
	e: ColumnMovedEvent,
	table: AgGridTableType,
): void {
	table.presetToSave = e.api.getColumnState() || [];
}


export function handleColumnPinned(
	e: ColumnPinnedEvent,
	table: AgGridTableType,
): void {
	table.presetToSave = e.api.getColumnState() || [];
}


export function handleColumnVisibleChanged(
	event: ColumnVisibleEvent,
	isInitial: boolean,
	table: AgGridTableType,
): void {
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

		// Convert empty column IDs to header names
		const emptyColumns = visibleColumnsFields
			.filter(colId => !columnsWithData.has(colId))
			.map(colId => {
				// @ts-ignore
				const colDef = columnDefs.find(def => def.colId === colId);
				return colDef?.headerName || colId;
			});

		// Update UI and log results
		table.showRefreshDataButton = emptyColumns.length > 0;
	} else {
		table.showRefreshDataButton = false;
	}
}


// grid events


export function handleSortChanged(
	e: SortChangedEvent,
	table: AgGridTableType,
	isInitial: boolean,
): void {
	if (!isInitial) {
		e.api.setServerSideSelectionState({
			selectAll: false,
			toggledNodes: []
		});
	}

	table.presetToSave = e.api.getColumnState() || [];
}


export function handleFilterChanged(
	e: FilterChangedEvent,
	isInitial: boolean
): void {
	if (isInitial) {
		e.api.setServerSideSelectionState({
			selectAll: false,
			toggledNodes: []
		});
	}
}


export function handleSelectionChanged(
	e: SelectionChangedEvent,
	table: AgGridTableType,
): void {
	table.activeSelectedRowIndex = 0;

	if (table.selectionState?.toggledNodes) {
		disablePageTabs.value = table.selectionState.toggledNodes.length < 1;

		const rowArr: Record<string, unknown>[] = [];

		table.selectionState.toggledNodes.forEach((rowNumber) => {
			const row = e.api.getDisplayedRowAtIndex(Number(rowNumber) - 1);

			// Add null checks for row and row.data
			if (row?.data) {
				const rowObj: Record<string, unknown> = {};
				table.requiredFields?.forEach((field) => {
					// Safe property access with optional chaining
					rowObj[field] = row.data?.[field] ?? null;
				});
				rowArr.push(rowObj);
			}
		});

		table.selectedRows = rowArr;
	}
}
