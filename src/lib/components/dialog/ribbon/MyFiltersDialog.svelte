<script lang="ts">
	import { openedDialog } from "$lib/runes/ribbon.svelte";
	import type { ColDef, GridOptions } from "ag-grid-enterprise";
	import type { StoredFilters } from "$lib/types/components/table/filters";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	let dialogOpen: boolean = $state(true);

	let storedFilters: StoredFilters[] = $state([ // will come from api
		{
			id: 0,
			label: 'Filtr na jméno',
			filters: {
				name: {
					filterType: "multi",
					filterModels: [
						{
							filterType: "text",
							operator: "OR",
							conditions: [
								{
									filterType: "text",
									type: "contains",
									filter: "pepa"
								},
								{
									filterType: "text",
									type: "contains",
									filter: "jan"
								}
							]
						}
					]
				},
				i_Name: {
					filterType: "multi",
					filterModels: [
						{
							filterType: "text",
							type: "contains",
							filter: "jan"
						}
					]
				}
			}
		},
	]);


	export const ribbonFiltersAgGridDef: ColDef<any, any>[] = [
		{
			field: "label",
			width: 240,
		},
		{
			field: "deleteBtn",
			width: 40,
		},
	]


	const customGridOptions: GridOptions = {
		columnDefs: ribbonFiltersAgGridDef,
	}
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	{header}
	{content}
	onChange={() => {
		dialogOpen = false;
		setTimeout(() => {
			openedDialog.value = 'empty';
		}, 200)
	}}
	fixedHeight={false}
	size="sm"
	customCss="!h-[360px] !w-[500px]"
/>

{#snippet header()}
	<Dialog.Title class="h-6">
		Moje filtry
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="h-full">
		{#if storedFilters.length > 0}
			<AgGridCSWrapper
				rowData={storedFilters}
				gridOptionsCustom={customGridOptions}
				fullHeight={true}
				hiddenHeader={true}
			/>
		{/if}
	</div>
{/snippet}
