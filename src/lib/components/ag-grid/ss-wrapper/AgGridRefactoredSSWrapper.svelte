<script lang="ts">
	import {agGridTables, currentPageKey, tableViewSettings} from "$lib/runes/table.svelte";
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {GridDependencyManager} from "$lib/components/ag-grid/ss-wrapper/gridDependencyManager.svelte";
	import {handleRibbonAction} from "$lib/components/ag-grid/ss-wrapper/ribbonActionHandlers";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {getBaseGridOptions} from './agGridConfig';
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {createDataSource} from './gridDataSource.svelte';
	import {createGrid, type GridApi, type GridOptions} from "ag-grid-enterprise";
	import {onMount} from 'svelte';
	import {getColumnHeaderTranslations} from "$lib/utils/components/ag-grid/methods/getColumnHeaderTranslations";

	interface Props {
		gridOptionsCustom: GridOptions;
		headerTranslations: Record<string, () => string>
	}

	let {
		gridOptionsCustom,
		headerTranslations,
	}: Props = $props();


	// State variables
	let gridContainer: HTMLElement | undefined = $state(undefined);
	let gridApi: GridApi|undefined = $state();
	let isInitial = $state(true);
	let excelFileInput: HTMLInputElement|undefined = $state();
	let isEditing = $state(false);
	let table = $derived.by(() => agGridTables.value[currentPageKey.value])


	const dependencies = new GridDependencyManager({
		get gridApi() { return gridApi },
		get isInitial() { return isInitial },
		set isInitial(val: boolean) { isInitial = val },
		get isEditing() { return isEditing },
		set isEditing(val: boolean) { isEditing = val },
		get excelFileInput() { return excelFileInput },
		set excelFileInput(val: HTMLInputElement | undefined) { excelFileInput = val }
	});


	// Grid configuration
	const gridOptions: GridOptions = {
		...getBaseGridOptions(dependencies),
		...gridOptionsCustom,
	};


	// Initialize grid
	onMount(() => {
		disablePageTabs.value = true;

		if (gridContainer) {
			gridApi = createGrid(gridContainer, gridOptions);
			gridApi.setGridOption(
				"serverSideDatasource",
				createDataSource(dependencies.table.url || "", dependencies));

			dependencies.setTableProp("defaultColState", gridApi.getColumnState());

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
		}

		return () => {
			if (gridApi) {
				table.selectionState = gridApi.getServerSideSelectionState() || {
					toggledNodes: [],
					selectAll: false
				};

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
			}


			setTimeout(() => {
				gridApi.destroy();
			}, 100)
		};
	});


	$inspect(table);


	// used for waiting for API to cache data based on new input params
	$effect(() => {
		table.areInputParamsLoading
			? dependencies.gridApi.setGridOption("loading", true)
			: dependencies.gridApi.setGridOption("loading", false);
	})


	//
	// register datasource if user has added input params
	// $effect(() => {
	// 	console.log("ef", table.loadedInputParams)
	// 	if (Object.keys(table.loadedInputParams).length > 1 ) {
	// 		console.log("if")
	// // 		dependencies.gridApi.ensureIndexVisible(0, "top");
	// // 		dependencies.resetTable();
	// 	}
	// })


	// reset table to default column definitions
	$effect(() => {
		if (table.setColStateToDefault) {
			dependencies.gridApi.applyColumnState({
				state: table.defaultColState,
				applyOrder: true,
			});

			dependencies.setTableProp("setColStateToDefault", false);
		}
	})


	$effect(() => {
		if (table.selectedFilters) {
			dependencies.gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	// load selectedPreset from ribbon -> my presets
	$effect(() => {
		if (table.selectedPreset) {
			dependencies.gridApi.applyColumnState({
				state: table.selectedPreset.pagePresetValue,
				applyOrder: true
			});

			dependencies.setTableProp("selectedPresetFull", table.selectedPreset);
			dependencies.setTableProp("selectedPreset", undefined);
		}
	})


	// stop focus on grid outside click
	$effect(() => {
		if (gridContainer && gridApi) {
			const handleClickOutside = (event: MouseEvent) => {
				if (!gridContainer?.contains(event.target as Node) && isEditing) {
					dependencies.gridApi.stopEditing(true);
				}
			};

			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});


	// Handle ribbon actions
	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.UNKNOWN) return;

		handleRibbonAction(
			ribbonAction.value,
			dependencies
		);

		ribbonAction.value = RibbonActionEnum.UNKNOWN;
	});
</script>



<input
	type="file"
	hidden
	bind:this={excelFileInput}
	onchange={e => handleSSExcelUpload(e, gridApi)}
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
	/* Keep existing styles */
</style>
