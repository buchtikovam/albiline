<script lang="ts">
	import {sideTableRowData} from "$lib/runes/table.svelte.js";
	import {Label} from "$lib/components/ui/label";
	import {
		productStockInventoryDetailGridOptions,
		productStockInventoryDetailHeaderTranslations
	} from "$lib/definitions/routes/sklad/stav-skladu/ag-grid-cs/productStockInventoryAgGridDef.svelte.js";
	import {onNavigate} from "$app/navigation";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/clientside-secondary/AgGridCSSecondaryWrapper.svelte";
	import * as RadioGroup from "$lib/components/ui/radio-group";


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
