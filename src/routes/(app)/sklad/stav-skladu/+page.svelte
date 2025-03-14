<script lang="ts">
	import {
		productStockInventoryAgGridDef,
		productStockInventoryHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte";
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import InputParams from "$lib/components/input-params/InputParams.svelte";
	import {
		InputParamsProductStockInventory, InputParamsProductStockInventorySelectOptions
	} from "$lib/definitions/routes/sklad/stav-skladu/input-params/inputParamsProductStockInventory";
	import type {AgGridCSTableType} from "$lib/types/components/table/table";


	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	currentPageKey.value = "ProductStockInventory";

	let table: AgGridCSTableType = agGridTables.value["ProductStockInventory"];
	let open = $derived(!table.hasInputParams);
</script>


<svelte:head>
	<title>
		Stav skladu | Albiline
	</title>
</svelte:head>



{#if open}
	<InputParams
		open={open}
		defaultInputDialog={InputParamsProductStockInventory}
		type="clientSide"
		selectOptions={InputParamsProductStockInventorySelectOptions}
	/>
{:else}
	<AgGridCSWrapper
		requiredFields={["productId"]}
		pageKey="ProductStockInventory"
		rowNumberIdentificationKey="productId"
		gridOptionsCustom={productStockInventoryAgGridDef}
		headerTranslations={productStockInventoryHeaderTranslations}
	/>
{/if}
