<script lang="ts">
	import {agGridTables, currentPageKey, sideTableRowData} from "$lib/runes/table.svelte.js";
	import {
		productStockInventoryDetailGridOptions,
		productStockInventoryDetailHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte.js";
	import {Label} from "$lib/components/ui/label";
	import {onNavigate} from "$app/navigation";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte";
	import * as RadioGroup from "$lib/components/ui/radio-group";


	// export let toolPanelParams;
	let table: AgGridTableType = agGridTables.value[currentPageKey.value];


	let mainRowData = $derived.by(() => {
		return sideTableRowData.value.filter((row) => {
			if (row.isMainStock) {
				return row;
			}
		})
	})


	let radioValue = $state("all")
	let showAll = $derived.by(() => {
		return radioValue === "all";
	});


	onNavigate(() => {
		sideTableRowData.value = [];
	})
</script>




<div class="!h-full w-full overflow-auto">
	<RadioGroup.Root
		bind:value={radioValue}
		class="flex justify-center h-[5%]"
	>
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="all" id="all" />
			<Label for="all">
				Vše
			</Label>
		</div>

		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="main" id="main" />
			<Label for="main">
				Hlavní sklady
			</Label>
		</div>
	</RadioGroup.Root>

	<div class="h-[95%]">
		<AgGridCSSecondaryWrapper
			gridOptionsCustom={productStockInventoryDetailGridOptions}
			rowData={showAll ? sideTableRowData.value : mainRowData}
			totalRow={true}
			headerTranslations={productStockInventoryDetailHeaderTranslations}
			fullHeight={true}
		/>
	</div>
</div>
