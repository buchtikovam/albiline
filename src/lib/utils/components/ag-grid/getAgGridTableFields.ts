export function getAgGridTableFields() {
	return {
		defaultColState: [],
		setColStateToDefault: false,
		createdTableData: [],
		editedTableData: [],
		deletedTableData: [],
		filtersToSave: {},
		presetToSave: [],
		fulltextFilterValue: "",
		openInputParams: true,
		selectedRows: [],
		selectionState: { selectAll: false, toggledNodes: [] },
		sortState: [],
		recentFilters: [],
		activeSelectedRowIndex: 0,
		lastVisibleRowIndex: 0,
		areInputParamsLoading: false,
		hasInputParams: false,
		loadedInputParams: {},
		showRefreshDataButton: false,
	}
}
