import type {
	GridApi, GridOptions, ColDef, IServerSideDatasource,
	CellValueChangedEvent, ColumnVisibleEvent, SortChangedEvent,
	ColumnMovedEvent, SelectionChangedEvent
} from 'ag-grid-community';
import type { AgGridTableType } from '$lib/types/components/table/table';
import type { GlobalDialogOptions } from '$lib/types/components/dialog/globalDialogOptions';

export interface Props {
	url: string;
	gridOptionsCustom: GridOptions;
	headerTranslations: Record<string, () => string>
}


export type TableUpdater<T extends AgGridTableType> = (current: T) => Partial<T>;


export interface GridDependencies {
	gridApi: GridApi;
	isInitial: boolean;
	isEditing: boolean;
	excelFileInput: HTMLInputElement;

	table: AgGridTableType;
	authDetails: any; // You can replace `any` with the actual authDetails type
	ribbonDialog: GlobalDialogOptions;

	setIsInitial(value: boolean): void;
	setIsEditing(value: boolean): void;
	setExcelInput(input: HTMLInputElement): void;

	updateTable(updater: (table: AgGridTableType) => Partial<AgGridTableType>): void;
	updateRibbonDialog(value: GlobalDialogOptions): void;
	setTableProp<K extends keyof AgGridTableType>(key: K, value: AgGridTableType[K]): void;

	resetTable(): void;
	ensureIndexVisible(index: number): void;
}
