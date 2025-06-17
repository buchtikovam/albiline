import type {GridApi, IServerSideDatasource, IServerSideGetRowsParams} from "ag-grid-enterprise";
import type {AgGridTableType, TableRowRequest} from "$lib/types/components/table/table";
import {apiServicePostHandled} from "$lib/api/apiService.svelte.js";
import {disablePageTabs} from "$lib/runes/navigation.svelte.js";

export function getSSDatasource(
	gridApi: GridApi,
	table: AgGridTableType,
	url: string,
	rowBufferSize: number,
	isInitial: boolean,
): IServerSideDatasource {
	return {
		getRows: (params: IServerSideGetRowsParams) => {
			console.log("--- get ds")

			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = table.recentFilters[table.recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = table.fulltextFilterValue;

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				table.recentFilters.push(currentFilter);
			}

			table.filtersToSave = currentFilter;

			console.log(JSON.stringify(updatedParamsRequest, null, 1))

			apiServicePostHandled(url, updatedParamsRequest)
				.then(httpResponse => httpResponse.data)
				.then(response => {
					// console.log(response)
					params.success({ rowData: response.items });
					table.latestRowCount = response.totalRows === -1 ? 0 : response.totalRows;

					if (response.items.length > 0) {
						gridApi.setRowCount(table.latestRowCount || 0);
					}

					if (isInitial) {
						disablePageTabs.value = false;

						const columnState = {
							state: table.sortState,
						}

						gridApi.applyColumnState(columnState);

						// setting scroll position
						if (table.lastVisibleRowIndex > rowBufferSize) {
							gridApi.ensureIndexVisible(table.lastVisibleRowIndex + rowBufferSize, "top");
						} else {
							if (table.selectionState) {
								if (table.selectionState.toggledNodes) {
									if (Number(table.selectionState.toggledNodes[0])) {
										gridApi.ensureIndexVisible(
											Number(table.selectionState.toggledNodes[0]) - 1 ,
											"top"
										);
									}
								}
							} else {
								gridApi.ensureIndexVisible(0, "top");

							}
						}

						// setting selectedRows
						setTimeout(() => {
							if (table.selectionState) {
								if (table.selectionState.toggledNodes) {
									disablePageTabs.value = table.selectionState.toggledNodes.length === 0;
									gridApi.setServerSideSelectionState(table.selectionState)
								}
							}
						}, 200)
					}

					isInitial = false;
				})
				.catch(error => {
					console.log(error);
					params.fail();
				});
		}
	}
}
