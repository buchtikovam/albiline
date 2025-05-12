import type { IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import type { GridDependencies } from './types';
import { apiServicePostHandled } from '$lib/api/apiService.svelte';
import {disablePageTabs} from "$lib/runes/navigation.svelte";
import {isEqual} from "lodash-es";


export const createDataSource = (
	url: string,
	deps: GridDependencies
): IServerSideDatasource => ({
	getRows: async (params: IServerSideGetRowsParams) => {
		deps.setTableProp("filtersToSave", deps.gridApi.getFilterModel())
		// track recent filters
		const lastStoredFilter = deps.table.recentFilters[deps.table.recentFilters.length - 1] || {}
		const currentFilter = deps.gridApi.getFilterModel();
		if(!isEqual(lastStoredFilter, currentFilter)) {
			// store only 10 latest filters
			if (deps.table.recentFilters.length === 10) {
				deps.table.recentFilters.shift();
			}

			deps.table.recentFilters.push(currentFilter);
		}

		apiServicePostHandled(url, {
			...params.request,
			fulltext: deps.table.fulltextFilterValue
		})
			.then(httpResponse => httpResponse.data)
			.then(response => {
				// set row data
				params.success({rowData: response.items});
				// set row count
				deps.setTableProp("latestRowCount", response.totalRows || 0)
				deps.gridApi.setRowCount(response.totalRows || 0)
				// if initital handle case
				if (deps.isInitial) handleInitialLoad(deps);
				deps.setIsInitial(false)
			})
			.catch(error => {
				console.error(error);
				params.fail();
			});
	}
});



const handleInitialLoad = (deps: GridDependencies) => {
	disablePageTabs.value = false;

	const columnState = {
		state: deps.table.sortState,
	}

	deps.gridApi.applyColumnState(columnState);

	// setting scroll position
	if (deps.table.lastVisibleRowIndex > 100) {
		deps.gridApi.ensureIndexVisible(deps.table.lastVisibleRowIndex + 100, "top");
	} else {
		if (deps.table.selectionState) {
			if (deps.table.selectionState.toggledNodes) {
				if (Number(deps.table.selectionState.toggledNodes[0])) {
					deps.gridApi.ensureIndexVisible(
						Number(deps.table.selectionState.toggledNodes[0]) - 1 ,
						"top"
					);
				}
			}
		} else {
			deps.gridApi.ensureIndexVisible(0, "top");
		}
	}

	// setting selectedRows
	setTimeout(() => {
		if (deps.table.selectionState) {
			if (deps.table.selectionState.toggledNodes) {
				disablePageTabs.value = deps.table.selectionState.toggledNodes.length === 0;
				deps.gridApi.setServerSideSelectionState(deps.table.selectionState)
			}
		}
	}, 200)
}

