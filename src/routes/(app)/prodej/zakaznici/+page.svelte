<script lang="ts">
	import { selectedRowsStore, showFulltextSearchStore } from '$lib/runes-global/tableStore';
	import { customerAgGridDef } from '$lib/data/ag-grid/server-side/customerAgGridDef';
	import { getPageMetaData } from '$lib/utils/getPageMetaData';
	import { onMount } from 'svelte';
	import type { PageMetaDataType } from '$lib/types/page/pageSettings';
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import type { CellDoubleClickedEvent, GridOptions } from 'ag-grid-enterprise';
	import { goto } from '$app/navigation';

	let pageMetaData: PageMetaDataType;

	onMount(async () => {
		if (!pageMetaData) {
			pageMetaData = await getPageMetaData();
		}
	})

	showFulltextSearchStore.set(true);

	// ag grid gridOptions containing conditional routing cant be generic,
	// so this is a workaround
	const gridOptions: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent) {
			selectedRowsStore.set([{
				customerAddressCode: event.data.customerAddressCode,
				customerNodeCode: event.data.customerNodeCode
			}])

			if (event.column.getColId() === "customerAddressCode") {
				goto(`/prodej/zakaznici/${event.data.customerNodeCode}/prodejny/${event.data.customerAddressCode}`);
			}

			if (event.column.getColId() === "customerNodeCode") {
				goto(`/prodej/zakaznici/${event.data.customerNodeCode}`);
			}
		},

		suppressExcelExport: true,
		suppressCsvExport: true,
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		rowModelType: "serverSide",
		rowSelection: "multiple",
		cacheBlockSize: 100,
		columnDefs: customerAgGridDef,
	}
</script>



<svelte:head>
	<title>Zákazníci | Albiline</title>
</svelte:head>



<AgGridSSWrapper 
	gridOptionsCustom={gridOptions}
	requiredFields={["customerNodeCode", "customerAddressCode"]}
	url="http://10.2.2.10/albiline.test/api/v1/customers"
/>
