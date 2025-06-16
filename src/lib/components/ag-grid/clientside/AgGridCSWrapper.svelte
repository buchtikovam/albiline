<script lang="ts">
	import {
		createGrid,
		type GridApi,
		type GridOptions, type IAggFuncParams, type IRowNode,
	} from 'ag-grid-enterprise';
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {tableViewSettings} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import {onMount} from "svelte";
	import {disablePageTabs} from "$lib/runes/navigation.svelte";
	import {clearCache} from "$lib/cacheManager";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {getCSData, onColStateReset, onCSPresetSelected} from "$lib/components/ag-grid/clientside/agGridCSUtils.svelte";
	import {
		getCSGridOptions,
		getCSGridOptionsHandlers
	} from "$lib/components/ag-grid/clientside/agGridCSGridOptions.svelte";
	import {mountCSGrid, unmountCSGrid} from "$lib/components/ag-grid/clientside/agGridCSLifecycle.svelte";
	import {handleClickOutside} from "$lib/components/ag-grid/serverside/agGridSSUtils.svelte";
	import {handleRibbonActionCS} from "$lib/components/ag-grid/clientside/agGridCSRibbonActionHandlers.svelte";

	interface Props {
		table: AgGridTableType,
		headerTranslations: Record<string, () => string>;
		gridOptionsCustom: GridOptions;
		allowRibbonActions?: boolean;
		clearRowData?: boolean;
		disableLoading?: boolean;
	}

	let {
		table = $bindable(),
		headerTranslations,
		gridOptionsCustom,
		allowRibbonActions = true,
		clearRowData = $bindable(false),
		disableLoading,
	}: Props = $props();


	let gridContainer: HTMLDivElement;
	let gridApi: GridApi<unknown>;
	let isEditing = $state(false);
	let excelFileInput: HTMLInputElement;
	let isInitial = $state(true);

	function updateIsEditing(newValue: boolean) {
		isEditing = newValue;
	}


	// Grid configuration
	const gridOptions: GridOptions = {
		// @ts-ignore
		...getCSGridOptions(table),
		...gridOptionsCustom,
	};


	// initiate grid
	onMount(() => {
		disablePageTabs.value = true;

		gridApi = createGrid(gridContainer, gridOptions);

		setTimeout(() => {
			gridApi.updateGridOptions(
				getCSGridOptionsHandlers(table, updateIsEditing, isInitial, gridApi)
			);
		}, 0)


		mountCSGrid(gridApi, table, headerTranslations);
		isInitial = false;





		return(() => {
			unmountCSGrid(table, gridApi);
		});
	});


	$effect(() => {
		if (Object.keys(table.loadedInputParams).length > 0) {
			if (table.areInputParamsLoading) {
				clearCache(table.name);
				getCSData(gridApi, table, disableLoading);
				isInitial = false;
			} else {
				getCSData(gridApi, table, disableLoading);
			}
		}
	});


	$effect(() => {
		if (table.selectedFilters) {
			gridApi.setFilterModel(table.selectedFilters.filters);
		}
	})


	$effect(() => {
		if (table.setColStateToDefault) {
			onColStateReset(gridApi, table);
		}
	})


	$effect(() => {
		if (table.selectedPreset) {
			onCSPresetSelected(gridApi, table);
		}
	})

	$effect(() => {
		if (clearRowData) {
			gridApi.setGridOption("rowData", []);
			clearRowData = false;
		}
	})

	$effect(() => {
		if (table.fulltextFilterValue.length > 0) {
			gridApi.setGridOption("quickFilterText", table.fulltextFilterValue);
		} else {
			gridApi.setGridOption("quickFilterText", "");
		}
	})


	$effect(() => {
		if (gridContainer && gridApi) {
			document.addEventListener(
				'click',
				(event) => handleClickOutside(event, gridContainer, isEditing, gridApi)
			);

			return () => {
				document.removeEventListener(
					'click',
					(event) => handleClickOutside(event, gridContainer, isEditing, gridApi)
				);
			};
		}
	});

	$effect(() => {
		if (allowRibbonActions) {
			if (ribbonAction.value === RibbonActionEnum.UNKNOWN) return;

			handleRibbonActionCS(
				ribbonAction.value,
				table,
				gridApi,
				excelFileInput
			);

			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
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


<div
	class="flex flex-column h-full"
>
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
