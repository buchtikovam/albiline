import type { GridApi } from "ag-grid-enterprise";
import type { GlobalDialogOptions } from "$lib/types/components/dialog/globalDialogOptions";
import type { AgGridTableType } from "$lib/types/components/table/table";
import type { GridDependencies } from "$lib/components/ag-grid/ss-wrapper/types";
import { createDataSource } from "$lib/components/ag-grid/ss-wrapper/gridDataSource.svelte";
import { agGridTables, currentPageKey } from "$lib/runes/table.svelte";
import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
import { authDetails } from "$lib/runes/page.svelte";


// Define the input type with both getter and setter signatures
type GridDependencyInput = {
	get gridApi(): GridApi | undefined;

	get isInitial(): boolean;
	set isInitial(val: boolean);

	get isEditing(): boolean;
	set isEditing(val: boolean);

	get excelFileInput(): HTMLInputElement | undefined;
	set excelFileInput(val: HTMLInputElement | undefined);
};


export class GridDependencyManager implements GridDependencies {
	private state: GridDependencyInput;

	constructor(state: GridDependencyInput) {
		this.state = state;
	}

	// Getters
	get gridApi(): GridApi {
		if (!this.state.gridApi) {
			throw new Error("Grid API not initialized");
		}
		return this.state.gridApi;
	}

	get table(): AgGridTableType {
		return agGridTables.value[currentPageKey.value];
	}

	get isInitial(): boolean {
		return this.state.isInitial;
	}

	get isEditing(): boolean {
		return this.state.isEditing;
	}

	get excelFileInput(): HTMLInputElement {
		if (!this.state.excelFileInput) {
			throw new Error("Excel input not initialized");
		}
		return this.state.excelFileInput;
	}

	get authDetails() {
		return authDetails;
	}

	get ribbonDialog() {
		return openedRibbonDialog.value;
	}

	// Setters
	setIsInitial(value: boolean): void {
		this.state.isInitial = value;
	}

	setIsEditing(value: boolean): void {
		this.state.isEditing = value;
	}

	setExcelInput(input: HTMLInputElement): void {
		this.state.excelFileInput = input;
	}

	// Store/table operations
	updateTable(updater: (table: AgGridTableType) => Partial<AgGridTableType>): void {
		const key = currentPageKey.value;
		const currentTable = agGridTables.value[key] || {};

		agGridTables.value = {
			...agGridTables.value,
			[key]: {
				...currentTable,
				...updater(currentTable),
			},
		};
	}

	updateRibbonDialog(value: GlobalDialogOptions): void {
		openedRibbonDialog.value = value;
	}

	setTableProp<K extends keyof AgGridTableType>(
		key: K,
		value: AgGridTableType[K]
	): void {
		const pageKey = currentPageKey.value;
		const currentTable = agGridTables.value[pageKey] || {};

		agGridTables.value = {
			...agGridTables.value,
			[pageKey]: {
				...currentTable,
				[key]: value,
			},
		};
	}

	// Utilities
	resetTable(): void {
		if (this.state.gridApi) {
			this.state.gridApi.setFilterModel(null);
			this.state.gridApi.setGridOption(
				"serverSideDatasource",
				createDataSource(
					agGridTables.value[currentPageKey.value].url || "",
					this
				)
			);
			this.state.gridApi.setServerSideSelectionState({
				toggledNodes: [],
				selectAll: false,
			});
		}
	}

	ensureIndexVisible(index: number): void {
		this.state.gridApi?.ensureIndexVisible(index, "top");
	}
}
