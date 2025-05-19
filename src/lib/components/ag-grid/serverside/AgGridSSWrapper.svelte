<script lang="ts">
	import {currentPageKey, agGridTables, tableViewSettings} from '$lib/runes/table.svelte.js';
	import {ribbonAction} from "$lib/runes/ribbon.svelte.js";
	import {disablePageTabs} from '$lib/runes/navigation.svelte.js';
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {debounceFn} from "$lib/utils/general/debounce.svelte.js";
	import {onMount} from 'svelte';
	import type {AgGridTableType} from '$lib/types/components/table/table';
	import {
		createGrid,
		type GridApi, type GridOptions,
	} from 'ag-grid-enterprise';
	import {handleRibbonActionSS} from "$lib/components/ag-grid/serverside/agGridSSRibbonActionHandlers.svelte";
	import {
		handleClickOutside, onTablePresetSelected, resetColState, resetTable
	} from "$lib/components/ag-grid/serverside/agGridSSUtils.svelte.js";
	import {
		getSSGridOptions,
		getSSGridOptionsHandlers
	} from "$lib/components/ag-grid/serverside/agGridSSGridOptions.svelte.js";
	import {getSSDatasource} from "$lib/components/ag-grid/serverside/agGridSSDatasource.svelte.js";
	import {mountSSGrid, unmountSSGrid} from "$lib/components/ag-grid/serverside/agGridSSLifecycle.svelte";

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


	function updateIsEditing(newValue: boolean) {
		isEditing = newValue;
	}


	// Grid configuration
	const gridOptions: GridOptions = {
		// @ts-ignore
		...getSSGridOptions(table),
		...gridOptionsCustom,
	};


	// runs when component is mounted only
	onMount(() => {
		disablePageTabs.value = true;
		const finalGridOptions = { ...gridOptions, ...gridOptionsCustom };

		// initialize grid
		if (gridContainer) gridApi = createGrid(gridContainer, gridOptions);

		gridApi.updateGridOptions(
			getSSGridOptionsHandlers(updateIsEditing, isInitial, gridApi, table)
		);

		mountSSGrid(gridApi, table, headerTranslations);

		return (() => {
			unmountSSGrid(gridApi, table);
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
			resetTable(
				gridApi,
				getSSDatasource(
					gridApi,
					table,
					url,
					rowBufferSize,
					isInitial
				)
			);
		}
	})


	// reset table to default column definitions
	$effect(() => {
		if (table.setColStateToDefault) {
			resetColState(gridApi, table);
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
