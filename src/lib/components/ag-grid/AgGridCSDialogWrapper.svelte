<script lang="ts">
	import { createGrid, type GridApi, type GridOptions } from 'ag-grid-enterprise';
	import 'ag-grid-community/styles/ag-grid.css';
	import '$lib/ag-grid-theme-builder.pcss';
	import { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';

	interface Props {
		colDef: any[];
		rowData?: any;
	}

	let { colDef, rowData }: Props = $props();

	let gridContainer: HTMLElement = $state();
	let gridApi: GridApi<unknown>;


	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,

		defaultColDef: {
			sortable: true,
			resizable: true,
			editable: false,
			minWidth: 50,
			maxWidth: 400,
			hide: false,
			filter: 'agMultiColumnFilter',
			suppressHeaderMenuButton: true
		},

		rowData: [],
		columnDefs: colDef,

		maintainColumnOrder: true,
		enableCellTextSelection: true,
		ensureDomOrder: true,
		rowSelection: 'single'
	};


	$effect(() => {
		gridApi = createGrid(gridContainer, gridOptions);

	});


	$effect(() => {
		if (rowData) {
			if (rowData.length > 0 && gridApi) {
				gridApi.setGridOption('rowData', rowData);
			}
		}
	});
</script>


<div class="flex flex-column h-full overflow-auto">
	<div
		bind:this={gridContainer}
		class="ag-theme-custom "
		id="datagrid"
		style="flex: 1 1 auto"
	></div>
</div>
