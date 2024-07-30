<script lang="ts">
	import  { AG_GRID_LOCALE_CZ } from '@ag-grid-community/locale';
	import { createGrid, type GridApi, type GridOptions } from 'ag-grid-community'
	import { onMount } from 'svelte'
	import type { TableType } from '$lib/types/table/table';
	import 'ag-grid-community/styles/ag-grid.css'
	import 'ag-grid-community/styles/ag-theme-quartz.css'

	export let data: TableType;

	// console.log(data.items);

	let grid: GridApi<unknown>;

	// TODO: save column widths - docs => config => column state

	const gridOptions: GridOptions = {
		localeText: AG_GRID_LOCALE_CZ,
		maintainColumnOrder: true,
		defaultColDef: {
			sortable: true,
			filter: true, 
			resizable: true,
			editable: true,
			minWidth: 100,
			maxWidth: 400,
		},		
		columnDefs : [
			{ 
				headerName: "",
				checkboxSelection: true,
				filter: false,
				suppressMovable: true,
				lockPosition: "left",
				maxWidth: 50,
			},
			{ 
				field: "customerAddressCode",
				headerName: "ID zákazníka",
				cellDataType: "number",
				width: 140,
			},
			{ 
				field: "customerNodeCode",
				headerName: "Řetězec",
				cellDataType: "number",
				width: 110,
			},
			{ 
				field: "addressType",
				headerName: "Typ adresy",
				cellDataType: "text",
				width: 130,
			},
			{ 
				field: "name",
				headerName: "Jméno",
				cellDataType: "text",
				width: 280,
			},
			{ 
				field: "street",
				headerName: "Ulice",
				cellDataType: "text",
				width: 220,
			},
			{ 
				field: "postalCode",
				headerName: "PSČ",
				cellDataType: "text",
				width: 100,
			},
			{ 
				field: "countryCode", 
				headerName: "Země",
				cellDataType: "text",
				width: 100,
			},
			{ 
				field: "companyName", 
				headerName: "Název společnosti",
				cellDataType: "text",
				width: 250,
			},
			{ 
				field: "enabled",
				headerName: "Aktivní",
				cellDataType: "boolean",
				width: 100,
			},
			{ 
				field: "consignmentSaleEnabled",
				headerName: "Komise",
				cellDataType: "text",
				width: 100,
			},
			{ 
				field: "paymentTypeCode",
				headerName: "Typ platby",				
				cellDataType: "text",
				width: 125,
			},
			{ 
				field: "dueDays", 
				headerName: "Splatnost",
				cellDataType: "number",
				width: 120,
			},
			{ 
				field: "invoiceCopies",
				headerName: "FA kopie",
				cellDataType: "number",
				width: 110,
			},
			{ 
				field: "deliveryNoteCopies",
				headerName: "DL kopie",
				cellDataType: "number",
				width: 110,
			},
			{ 
				field: "customerRank",
				headerName: "Bonita",
				cellDataType: "text",
				width: 100,
			},
			{ 
				field: "retailStoreTypeId",
				cellDataType: "text",
				width: 120
			},
			{ 
				field: "dealerCode",
				headerName: "OZ",
				cellDataType: "text",
				width: 100
			},
		],
		 onCellValueChanged: (event) => {
			console.log(`New Cell Value: ${event.value}`)
		},
		rowData: data.items
	}

	onMount(() => {
		const gridEl = document.getElementById("mainGrid")
		if (!gridEl) {
			throw new Error("Grid element not found.")
		}
		grid = createGrid(gridEl, gridOptions)
	})
</script>



<svelte:head>
	<title>Albiline | Zákazníci</title>
</svelte:head>



<div id="mainGrid" class="ag-theme-quartz h-full"></div>
