<script lang="ts">
	import {activeTabIndex, showFulltextSearch} from "$lib/runes/page.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import {apiServicePostHandled} from "$lib/api/apiService.svelte";
	import {onMount} from "svelte";
	import * as Resizable from "$lib/components/ui/resizable/index.js";
	import {
		productStockInventoryAgGridDef,
		productStockInventoryDetailGridOptions,
		productStockInventoryDetailHeaderTranslations,
		productStockInventoryHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte";
	import AgGridSSWrapper from "$lib/components/ag-grid/AgGridSSWrapper.svelte";
	import {sideTableRowData} from "$lib/runes/table.svelte";
	// import {agGridTables, currentPageKey} from "$lib/runes/table.svelte";
	// import {
	// 	InputParamsZakaznici,
	// 	InputParamsZakazniciSelectOptions
	// } from "$lib/definitions/routes/prodej/zakaznici/input-params/InputParamsZakaznici";
	// import InputParams from "$lib/components/input-params/InputParams.svelte";
	// import {
	// 	InputParamsProductStockInventory, InputParamsProductStockInventorySelectOptions
	// } from "$lib/definitions/routes/sklad/stav-skladu/input-params/inputParamsProductStockInventory";


	activeTabIndex.value = 0;
	showFulltextSearch.value = true;
	// let table = agGridTables[currentPageKey.value];

	let rowData = []
	let isLoading = true;


	onMount(async () => {
		const response = await apiServicePostHandled("pageData", {
			fulltext: null,
			inputs: [
				{
					field: "onStock",
					type: "boolean",
					value: true
				}
			],
			columnFilters: [],
		})

		if (response.success) {
			let respData = await response.data;
			rowData = respData.items;
			isLoading = false;
		}
	})


	// let open = $state(!table.hasInputParams);
	// let inputDialogFinished = $derived(!open);
</script>


<svelte:head>
	<title>
		Stav skladu | Albiline
	</title>
</svelte:head>

<!--{#if !inputDialogFinished}-->
<!--	<InputParams-->
<!--		bind:open-->
<!--		defaultInputDialog={InputParamsProductStockInventory}-->
<!--		selectOptions={InputParamsProductStockInventorySelectOptions}-->
<!--	/>-->
<!--{:else}-->

<Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg gap-1 bg-albi-50">
	<Resizable.Pane defaultSize={85}>
		<div class="block h-full w-full rounded-lg">
			<AgGridCSWrapper
				gridOptionsCustom={productStockInventoryAgGridDef}
				rowData={rowData}
				checkboxes={true}
				selectMultiple={false}
				isLoading={isLoading}
				sidebar={true}
				headerTranslations={productStockInventoryHeaderTranslations}
				fullHeight={true}
			/>
		</div>
	</Resizable.Pane>

	<Resizable.Handle />

	<Resizable.Pane defaultSize={15}>
		<div class="w-80 h-full rounded-lg">
			<AgGridCSWrapper
				gridOptionsCustom={productStockInventoryDetailGridOptions}
				rowData={sideTableRowData.value}
				checkboxes={false}
				sidebar={false}
				headerTranslations={productStockInventoryDetailHeaderTranslations}
				fullHeight={true}
			/>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>




<!--{/if}-->
