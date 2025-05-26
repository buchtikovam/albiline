<script lang="ts">
	import {
		productStockInventoryAgGridDef,
		productStockInventoryHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte";
	import {
		InputParamsProductStockInventory, InputParamsProductStockInventorySelectOptions
	} from "$lib/definitions/routes/sklad/stav-skladu/input-params/inputParamsProductStockInventory";
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, pageKeys} from "$lib/runes/table.svelte";
	import {beforeNavigate} from "$app/navigation";
	import {onMount} from "svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import type {PageMetaDataType} from "$lib/types/routes/pageSettings";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/clientside/AgGridCSWrapper.svelte";

	interface Props {
		data: { pageMetaData: PageMetaDataType }
	}

	let { data }: Props = $props();

	pageKeys.value = {
		value: ["ProductStockInventory"],
		index: 0,
	}

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;

	let table: AgGridTableType = $state(agGridTables.value[pageKeys.value.value[pageKeys.value.index]]);
	let open = $state(false);
	let destroy = $state(false);

	$effect(() => {
		open = table.openInputParams;
	})

	onMount(() => {
		open = !table.hasInputParams;
	})

	beforeNavigate(() => {
		table.openInputParams = false;
		destroy = true;
	})
</script>



<svelte:head>
	<title>
		Stav skladu | Albiline
	</title>
</svelte:head>



{#if open}
	<InputParams
		bind:open
		type="clientSide"
		defaultInputParams={InputParamsProductStockInventory}
		selectOptions={InputParamsProductStockInventorySelectOptions}
		restrictions={data.pageMetaData.inputs}
	/>
{/if}

{#if !destroy && table}
	<AgGridCSWrapper
		table={table}
		gridOptionsCustom={productStockInventoryAgGridDef}
		headerTranslations={productStockInventoryHeaderTranslations}
	/>
{/if}
