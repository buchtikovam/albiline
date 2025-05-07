import type {
	CellValueChangedEvent, ColumnVisibleEvent,
	SortChangedEvent, ColumnMovedEvent, SelectionChangedEvent
} from 'ag-grid-community';
import type { GridDependencies } from './types';
import { addToEditedTableData } from '$lib/utils/addToEditedTableData';


export const handleCellValueChanged = (
	event: CellValueChangedEvent,
	{ table }: GridDependencies
) => {
	if (event.oldValue === event.newValue) return;

	addToEditedTableData(
		event,
		table.requiredFields,
		table.editedTableData
	);
};


export const handleCellEditingStart = ({ isEditing }: GridDependencies) => {
	isEditing = true;
}
