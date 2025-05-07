<script lang="ts">
	import { onMount } from 'svelte';
	import { getBaseGridOptions } from './agGridConfig';
	import { createDataSource } from './gridDataSource';
	import {
		handleCellEditingStart,
		handleCellValueChanged,
	} from './gridEventHandlers';
	import {createGrid, type GridApi, type GridOptions} from "ag-grid-enterprise";
	import type {Props} from "$lib/components/ag-grid/ss-wrapper/types";
	import {handleSSExcelUpload} from "$lib/utils/components/ag-grid/methods/handleSSExcelUpload";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {GridDependencyManager} from "$lib/components/ag-grid/ss-wrapper/gridDependencyManager.svelte";
	import {handleRibbonAction} from "$lib/components/ag-grid/ss-wrapper/ribbonActionHandlers";

	let {
		url,
		gridOptionsCustom,
		headerTranslations
	}: Props = $props();


	// State variables
	let gridContainer: HTMLElement | undefined = $state(undefined);
	let gridApi: GridApi|undefined = $state();
	let isInitial = $state(true);
	let excelFileInput: HTMLInputElement|undefined = $state();
	let isEditing = $state(false);

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
		...getBaseGridOptions(),
		...gridOptionsCustom,
		onCellValueChanged: e => {handleCellValueChanged(e, dependencies)},
		onCellEditingStarted: e => handleCellEditingStart(dependencies),
	};


	// Initialize grid
	onMount(() => {
		if (gridContainer) {
			gridApi = createGrid(gridContainer, gridOptions);
			gridApi.setGridOption("serverSideDatasource", createDataSource(url, dependencies));
		}

		return () => {
			gridApi?.destroy();
		};
	});


	// Handle ribbon actions
	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.UNKNOWN) return;
		handleRibbonAction(ribbonAction.value, dependencies);
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
		class="ag-theme-quartz"
		bind:this={gridContainer}
		style="flex: 1 1 auto;"
	></div>
</div>



<style>
	/* Keep existing styles */
</style>
