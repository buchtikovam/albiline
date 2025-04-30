<script lang="ts">
	import {
		productStockInventoryAgGridDef,
		productStockInventoryHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte";
	import {
		InputParamsProductStockInventory, InputParamsProductStockInventorySelectOptions
	} from "$lib/definitions/routes/sklad/stav-skladu/input-params/inputParamsProductStockInventory";
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import {onMount} from "svelte";
	import type {PageMetaDataType} from "$lib/types/routes/pageSettings";

	interface Props {
		data: { pageMetaData: PageMetaDataType }
	}

	let { data }: Props = $props();

	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	currentPageKey.value = "ProductStockInventory";

	let table: AgGridTableType = $state(agGridTables.value["ProductStockInventory"]);

	let isInitial = $derived(!table.hasInputParams);
	let open = $derived(table.areInputParamsLoading);


	onMount(() => {
		if (isInitial) {
			open = true;
		}
	})


	$effect(() => {
		if (ribbonAction.value === RibbonActionEnum.LOAD) {
			table = { ...table, areInputParamsLoading: true };
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
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


<AgGridCSWrapper
	pageKey="ProductStockInventory"
	gridOptionsCustom={productStockInventoryAgGridDef}
	headerTranslations={productStockInventoryHeaderTranslations}
/>
