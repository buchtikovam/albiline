<script lang="ts">
	import {currentPageKey, agGridTables, tableViewSettings} from '$lib/runes/table.svelte';
	import {authDetails} from '$lib/runes/page.svelte';
	import {openedRibbonDialog, ribbonAction} from "$lib/runes/ribbon.svelte";
	import {disableNavigation, disablePageTabs} from '$lib/runes/navigation.svelte';
	import {themeAlbiBlueParams} from "$lib/constants/aggrid-themes/ThemeAlbiBlue.svelte";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {getAgGridLocale} from "$lib/utils/components/ag-grid/methods/getAgGridLocale";
	import {debounceFn} from "$lib/utils/general/debounce.svelte";
	import {onMount} from 'svelte';
	import type {AgGridTableType, TableRowRequest} from '$lib/types/components/table/table';
	import {
		createGrid, themeQuartz,
		type ColumnMovedEvent,
		type ColumnPinnedEvent, type ColumnVisibleEvent,
		type FilterModel, type GetRowIdParams,
		type GridApi, type GridOptions,
		type IServerSideDatasource, type IServerSideGetRowsParams,
		type SelectionChangedEvent, type SortChangedEvent, type RowSelectedEvent
	} from 'ag-grid-enterprise';
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";
	import {
		ServerSideTotalRowsStatusBarComponent
	} from "$lib/utils/components/ag-grid/status-bar/serverSideTotalRowsStatusBarComponent.svelte";
	import {handleRibbonAction} from "$lib/components/ag-grid/ss-wrapper/ribbonActionHandlers";
	import {handleRibbonActionSS} from "$lib/components/ag-grid/ribbonActionHandlers";
	import {handleClickOutside, onTablePresetSelected, resetTable} from "$lib/components/ag-grid/agGridSSUtils.svelte";
	import {getBaseGridOptions} from "$lib/components/ag-grid/ss-wrapper/agGridConfig";
	import {getSSGridOptions} from "$lib/components/ag-grid/agGridSSGridOptions.svelte";

	interface Props {
		url: string;
		gridOptionsCustom: GridOptions;
		headerTranslations: Record<string, () => string>
	}

	let {
		url,
		gridOptionsCustom,
		headerTranslations
	}: Props = $props();


	// page settings
	let pageKey: string = currentPageKey.value;
	let table: AgGridTableType = $state(agGridTables.value[pageKey]);
	let isEditing = $state(false);


	// create grid
	let gridContainer: HTMLElement|undefined = $state(undefined);
	let gridApi: GridApi<unknown>;
	let excelFileInput: HTMLInputElement;
	let rowBufferSize = 100;
	let isInitial = $state(true);
	let themeParams = $state(themeAlbiBlueParams);


	function updateIsEditing(newValue: boolean) {
		isEditing = newValue;
	}


	// Grid configuration
	const gridOptions: GridOptions = {
		...getSSGridOptions(
			// @ts-ignore
			gridApi,
			table,
			updateIsEditing,
			isInitial
		), // todo svelte warning isinitial
		...gridOptionsCustom,
	};


	$inspect(table.presetToSave)

	//  datasource configuration
	let recentFilters: FilterModel[] = $state([]);

	const datasource: IServerSideDatasource = {
		getRows: (params: IServerSideGetRowsParams) => {
			const currentFilter = gridApi.getFilterModel();
			const lastStoredFilter = recentFilters[recentFilters.length - 1] || {};
			const updatedParamsRequest: TableRowRequest = params.request
			updatedParamsRequest.fulltext = table.fulltextFilterValue;

			// storing recents to navigate to previous filters if needed
			if(JSON.stringify(lastStoredFilter) !== JSON.stringify(currentFilter)) {
				recentFilters.push(currentFilter);
			}

			table.filtersToSave = currentFilter;

			// console.log(JSON.stringify(updatedParamsRequest, null, 1))

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
	};


	// runs when component is mounted only
	onMount(() => {
		disablePageTabs.value = true;
		const finalGridOptions = { ...gridOptions, ...gridOptionsCustom };

		// initialize grid
		if (gridContainer) gridApi = createGrid(gridContainer, finalGridOptions);
		gridApi.setFilterModel(table.filtersToSave);

		table.defaultColState = gridApi.getColumnState();

		gridApi.setGridOption(
			"columnDefs",
			getColumnHeaderTranslations(
				headerTranslations,
				gridApi.getColumnDefs() || []
			)
		);

		if (table.presetToSave.length > 0) {
			gridApi.applyColumnState({
				state: table.presetToSave,
				applyOrder: true,
			})
		}

		return (() => {
			if (gridApi) {
				table.selectionState = gridApi.getServerSideSelectionState() || {
					toggledNodes: [],
					selectAll: false
				};
			}

			// Update selectedRows persistence with null checks
			if (table.selectionState?.toggledNodes) {
				const rows: Record<string, unknown>[] = [];

				table.selectionState.toggledNodes.forEach((rowNumber) => {
					const row = gridApi.getDisplayedRowAtIndex(Number(rowNumber) - 1);

					if (row?.data) {
						const rowObj: Record<string, unknown> = {};
						table.requiredFields?.forEach((field) => {
							rowObj[field] = row.data?.[field] ?? null;
						});
						rows.push(rowObj);
					}
				});

				table.selectedRows = rows;
			}

			table.filtersToSave = gridApi.getFilterModel();
			table.lastVisibleRowIndex = gridApi.getFirstDisplayedRowIndex();
			table.presetToSave = gridApi.getColumnState() || [];
			table.activeSelectedRowIndex = 0;
			disableNavigation.value = false;


			setTimeout(() => {
				gridApi.destroy();
			}, 100)
		})
	})


	// used for waiting for API to cache data based on new input params
	$effect(() => {
		table.areInputParamsLoading
			? gridApi.setGridOption("loading", true)
			: gridApi.setGridOption("loading", false);
	})


	// register datasource if user has added input params
	$effect(() => {
		if (Object.keys(table.loadedInputParams).length > 0 ) {
			gridApi.ensureIndexVisible(0, "top");
			resetTable(gridApi, datasource);
		}
	})


	// reset table to default column definitions
	$effect(() => {
		if (table.setColStateToDefault) {
			gridApi.applyColumnState({
				state: table.defaultColState,
				applyOrder: true,
			});

			table.setColStateToDefault = false;
		}
	})


	// fulltext implementation
	let timer: NodeJS.Timeout;

	$effect(() => {
		if (table.fulltextFilterValue.length > 0) {
			timer = debounceFn(timer, gridApi.onFilterChanged);
		} else {
			gridApi.onFilterChanged()
		}
	})


	// load selectedFilters from ribbon -> my filters
	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	// load selectedPreset from ribbon -> my presets
	$effect(() => {
		if (table.selectedPreset) {
			onTablePresetSelected(gridApi, table);
		}
	})


	$effect(() => {
		if (gridContainer && gridApi) {
			document.addEventListener(
				'click',
				(e: MouseEvent) => handleClickOutside(e, gridContainer, isEditing, gridApi)
			);

			return () => {
				document.removeEventListener(
					'click',
					(e) => handleClickOutside(e, gridContainer, isEditing, gridApi)
				)
			};
		}
	});


	// Handle ribbon actions
	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.UNKNOWN) return;

		handleRibbonActionSS(
			ribbonAction.value,
			table,
			gridApi,
			excelFileInput
		);

		ribbonAction.value = RibbonActionEnum.UNKNOWN;
	});
</script>



<input
	type="file"
	accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	multiple={false}
	hidden
	bind:this={excelFileInput}
	onchange={(ev) => handleSSExcelUpload(ev, gridApi)}
/>


<div class="flex flex-column h-full">
	<div
		id="datagrid"
		class=""
		style="flex: 1 1 auto"
		style:--ag-spacing={tableViewSettings.value?.spacing + 'px'}
		style:--ag-header-height={tableViewSettings.value?.headerHeight + 'px'}
		style:--ag-header-font-size={tableViewSettings.value?.headerFontSize + 'px'}
		style:--ag-font-size={tableViewSettings.value?.fontSize + 'px'}
		style:--ag-icon-size={tableViewSettings.value?.iconSize + 'px'}
		bind:this={gridContainer}
	></div>
</div>



<style>
	/* HEADER */
	:global(.ag-header-cell-text) {
		display: -webkit-box !important;
		-webkit-line-clamp: 2 !important; /* Limit to 2 lines */
		line-clamp: 2 !important;
		-webkit-box-orient: vertical !important;
		overflow: hidden !important;
		text-overflow: ellipsis !important;
		word-break: normal !important; /* Break words if needed */
		white-space: normal !important;
		line-height: 12px !important;
		max-height: 24px !important; /* 2 * line-height */
	}

	:global(.ag-header-icon) {
		min-width: 14px !important;
	}

	:global(.ag-header-icon):hover {
		background-color: #eceef1 !important;
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-sort-indicator-icon) {
		min-width: 18px !important;
		margin-left: -8px !important;
	}

	:global(.ag-filter-apply-panel) {
		padding: 0 6px 6px 6px;
	}

	:global(.ag-filter-body-wrapper) {
		padding: 6px 6px 0 6px;
	}


	/* SIDEBAR FILTER PANEL */


	:global(.ag-filter-tool-panel) {
		height: 100% !important;
		display: flex !important;
		flex-direction: column !important;
	}

	:global(.ag-filter-toolpanel-search) {
		display: none;
	}

	:global(.ag-filter-toolpanel-group-instance-header-icon) {
		color: var(--albi-500);
	}

	:global(.ag-filter-list-panel) {
		height: 100% !important;
		padding: 4px 0;
		overflow: auto;
	}

	:global(.ag-filter-toolpanel-instance-body) {
		border-radius: 6px;
		border-width: 1px;
		margin: 4px 8px !important;
	}

	:global(.ag-filter-toolpanel-instance-filter) {
		width: 100%;
		margin-right: 40px;
	}


	:global(.ag-tool-panel-horizontal-resize) {
		@apply bg-slate-300;
	}

	/* SIDEBAR COLUMN PANEL */


	:global(.ag-column-panel-column-select) {
		padding-top: 4px;
	}

	:global(.ag-column-drop-vertical-empty-message) {
		border-radius: 6px;
	}


	/*INPUTY */

	/*:global(.ag-filter-select) {*/
	/*	margin-bottom: 6px;*/
	/*	padding-bottom: 0;*/
	/*}*/

	/*:global(.ag-input-wrapper) {*/
	/*	margin-bottom: 6px;*/
	/*	padding-bottom: 0;*/
	/*}*/

	:global(.ag-text-field-input):focus {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-picker-field-wrapper) {
		height: 26px;
	}

	:global(.ag-input-field-input) {
		height: 26px;
	}

	:global(.ag-number-field-input):focus {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-picker-field-wrapper):focus-within {
		outline: none !important;
		box-shadow: none !important;
	}

	:global(.ag-checkbox) {
		margin-left: 4px;
		overflow: visible !important;
		outline: none !important;
		box-shadow: none !important;
	}



	/*	BUTTONS */


	:global(.ag-standard-button) {
		line-height: normal;
		margin: 0 !important;
		display: flex !important;
		justify-content: center;
		align-items: center !important;
		width: fit-content;
		padding: 0 6px;
		height: 26px;
		margin-left: 6px !important;
	}


	/*:global(.ag-center-cols-viewport) {*/
	/*	min-height: 20px !important;*/
	/*}*/
</style>
