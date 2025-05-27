import type {GetMainMenuItemsParams, RowSelectionOptions} from "ag-grid-community";
import type {GetRowIdParams, GridApi} from "ag-grid-enterprise";
import type {AgGridTableType} from "$lib/types/components/table/table";
import {cacheTableData, getCachedTableData} from "$lib/cacheManager";
import deepcopy from "deepcopy";
import {apiServicePostHandled} from "$lib/api/apiService.svelte";
import {pageKeys} from "$lib/runes/table.svelte";


export function getDefaultColDef() {
	return {
		sortable: true,
		resizable: true,
		editable: false,
		minWidth: 50,
		maxWidth: 400,
		hide: false,
		filter: false,
		suppressHeaderMenuButton: true,
		enableRowGroup: true,
	}
}


export function getStatusBar() {
	return {
		statusPanels: [
			{
				statusPanel: 'agTotalAndFilteredRowCountComponent',
				align: 'left',
			},
			{
				statusPanel: 'agSelectedRowCountComponent',
				align: 'left',
			},
		]
	}
}


export function getMainMenuItemsCS(event: GetMainMenuItemsParams) {
	return [
		'pinSubMenu',
		'separator',
		'valueAggSubMenu',
		'autoSizeThis',
		'columnChooser',
		'resetColumns',
		'separator',
		'sortUnSort',
		'separator',
		{
			name: "IT",
			icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-code-xml\"><path d=\"m18 16 4-4-4-4\"/><path d=\"m6 8-4 4 4 4\"/><path d=\"m14.5 4-5 16\"/></svg>",
			subMenu: [
				{
					name: "field: " + event.column.getColId(),
					action: () => {
						navigator.clipboard.writeText(event.column.getColId()).then(r => r);
					},
				}
			]
		}
	];
}


export function getContextMenuItemsCS() {
	return [
		'copy',
		'copyWithHeaders',
		'cut',
		'paste',
	];
}


export function getRowIdCS(
	params: GetRowIdParams,
	table: AgGridTableType
) {
	return String(params.data[table.identificationKey]);
}


export function getRowSelection(): "single" | "multiple" | RowSelectionOptions<any, any> | undefined {
	return {
		mode: "singleRow",
		enableClickSelection: true,
		hideDisabledCheckboxes: true,
	}
}


export async function getCSData(
	gridApi: GridApi,
	table: AgGridTableType
) {
	try {
		const cached = await getCachedTableData(table.name);

		if (cached) {
			// @ts-ignore
			gridApi.setGridOption("rowData", cached);

			if (table.selectedRows.length > 0) {
				table.selectedRows.forEach((row) => {
					let node = gridApi.getRowNode(String(row[table.identificationKey]));
					node?.setSelected(true)
				});
			} else {
				if (gridApi.getDisplayedRowCount() > 0) {
					let row = gridApi.getDisplayedRowAtIndex(0);
					row?.setSelected(true)
				}
			}
		} else {
			await fetchAndCache(gridApi, table);
			table.areInputParamsLoading = false;
		}
	} catch (e) {
		console.log("Get data error: ", e instanceof Error ? e.message : "");
	}
}


async function fetchAndCache(
	gridApi: GridApi,
	table: AgGridTableType
) {
	try {
		let columnList: string[] = deepcopy(table.requiredFields);

		if (Object.keys(table.presetToSave).length > 0) {
			table.presetToSave.forEach(preset => {
				if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
					columnList.push(preset.colId)
				}
			})
		} else {
			table.defaultColState.forEach(preset => {
				if (!preset.hide && !preset.colId.includes("ag-Grid") && !columnList.includes(preset.colId)) {
					columnList.push(preset.colId)
				}
			})
		}

		if (table.necessaryDataColumns) {
			columnList = columnList.concat(table.necessaryDataColumns);
		}

		let requestObj = deepcopy(table.loadedInputParams);
		// @ts-ignore
		requestObj["columnList"] = columnList

		gridApi.setGridOption("loading", true)
		const response = await apiServicePostHandled(
			'pageData',
			requestObj,
			table.name
		);

		const data = await response.data;

		gridApi.setGridOption("rowData", data.items);
		gridApi.setGridOption("loading", false);

		await cacheTableData(table.name, data.items);
	} catch (e) {
		console.log("Fetch and cache error: ", e instanceof Error ? e.message : "");
	}
}



export function onColStateReset(
	gridApi: GridApi,
	table: AgGridTableType
) {
	gridApi.applyColumnState({
		state: table.defaultColState,
		applyOrder: true,
	});

	table.setColStateToDefault = false;
	table.presetToSave = table.defaultColState;
}


export function onCSPresetSelected(
	gridApi: GridApi,
	table: AgGridTableType
) {
	if (table.selectedPreset) {
		gridApi.applyColumnState({
			state: table.selectedPreset.pagePresetValue,
			applyOrder: true
		});

		table.selectedPresetFull = table.selectedPreset;
		table.selectedPreset = undefined;
	}
}
