<script lang="ts">
	import {
		InputDialogZakaznici,
		InputDialogZakazniciSelectOptions
	} from "$lib/data/input-dialog/prodej/zakaznici/InputDialogZakaznici";
	import { activeTabIndex, showFulltextSearch } from '$lib/runes/page.svelte';
	import { storedSelectedRows } from '$lib/runes/table.svelte';
	import { customerAgGridDef } from '$lib/data/ag-grid/server-side/customerAgGridDef';
	import { i18n } from '$lib/i18n';
	import { getPageMetaData } from '$lib/utils/getPageMetaData';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageMetaDataType } from '$lib/types/page/pageSettings';
	import type { CellDoubleClickedEvent } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-enterprise';
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import InputDialog from "$lib/components/dialog/input/InputDialog.svelte";


	let pageMetaData: PageMetaDataType;

	onMount(async () => {
		pageMetaData = await getPageMetaData();
	})

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	// ag grid gridOptions containing conditional routing cant be generic,
	// so this is a workaround
	const gridOptions: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent) {
			storedSelectedRows.value = [{
				customerAddressCode: event.data.customerAddressCode,
				customerNodeCode: event.data.customerNodeCode
			}]

			if (event.column.getColId() === "customerAddressCode") {
				goto(i18n.resolveRoute(`/prodej/zakaznici/${event.data.customerNodeCode}/prodejny/${event.data.customerAddressCode}`));
			}

			if (event.column.getColId() === "customerNodeCode") {
				goto(i18n.resolveRoute(`/prodej/zakaznici/${event.data.customerNodeCode}`));
			}
		},

		suppressExcelExport: true,
		suppressCsvExport: true,
		maintainColumnOrder: true,
		enableCellTextSelection: true,
		rowModelType: "serverSide",
		cacheBlockSize: 100,
		columnDefs: customerAgGridDef,
	}


	let open = $state(true);
	let inputDialogFinished = $derived(!open);
</script>



<svelte:head>
	<title>
		Zákazníci | Albiline
	</title>
</svelte:head>



{#if !inputDialogFinished}
	<InputDialog
		bind:open
		defaultInputDialog={InputDialogZakaznici}
		selectOptions={InputDialogZakazniciSelectOptions}
	/>
{:else}
	<AgGridSSWrapper
		gridOptionsCustom={gridOptions}
		requiredFields={["customerNodeCode", "customerAddressCode"]}
		url="http://10.2.2.10/albiline.test/api/v1/customers"
	/>
{/if}

