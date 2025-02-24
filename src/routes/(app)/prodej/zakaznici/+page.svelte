<script lang="ts">
	import {
		InputDialogZakaznici,
		InputDialogZakazniciSelectOptions
	} from "$lib/data/input-dialog/prodej/zakaznici/InputDialogZakaznici";
	import { customerAgGridDef, customerHeaderTranslations } from '$lib/data/ag-grid/server-side/prodej/zakaznici/customerAgGridDef';
	import {activeTabIndex, pageKey, showFulltextSearch} from '$lib/runes/page.svelte';
	import {serverSideTables} from '$lib/runes/table.svelte';
	import { i18n } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import type { CellDoubleClickedEvent } from 'ag-grid-community';
	import type { GridOptions } from 'ag-grid-enterprise';
	import AgGridSSWrapper from '$lib/components/ag-grid/AgGridSSWrapper.svelte';
	import InputDialog from "$lib/components/input-params/InputDialog.svelte";
	import NewCustomerOrAddressDecisionDialog
		from "$lib/components/dialog/routes/prodej/zakaznici/dialog-create-new/NewCustomerOrAddressDecisionDialog.svelte";
	import {page} from "$app/state";


	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	pageKey.value = btoa(page.route.id || "");

	let open = $state(false);
	let inputDialogFinished = $derived(!open);
	const table = $state(serverSideTables[pageKey.value])

	if (!table) {
		serverSideTables[pageKey.value] = {
			defaultColDef: [],
			setColDefToDefault: false,
			editedTableData: [],
			filtersToSave: {},
			selectedFilters: {},
			presetToSave: [],
			selectedPreset: [],
			selectedRows: [],
			selectionState: { selectAll: false, toggledNodes: [] },
			sortState: [],
			activeSelectedRowIndex: 0,
			lastVisibleRowIndex: 0,
			latestRowCount: 100,
		}
	}


	// ag grid gridOptions containing conditional routing cant be generic,
	// so this is a workaround
	const gridOptions: GridOptions = {
		onCellDoubleClicked(event: CellDoubleClickedEvent) {
			serverSideTables[pageKey.value].selectedRows = [{
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


		columnDefs: customerAgGridDef,
	}


	const handleKeyDown = (event) => {
		if (event.ctrlKey && event.key.toUpperCase() === 'I') {
			open = true;
		}
	};


	$effect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	})
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
		url="customers"
		headerTranslations={customerHeaderTranslations}
	/>
{/if}


<NewCustomerOrAddressDecisionDialog />
