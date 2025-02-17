<script lang="ts">
	import { openedDialog } from "$lib/runes/ribbon.svelte";
	import type { ColDef, GridOptions } from "ag-grid-enterprise";
	import type { StoredFilters } from "$lib/types/components/table/filters";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';
	import type {ICellRendererParams} from "ag-grid-community";
	import {activeSelectedRowIndex, selectedFilters, storedSelectedRows} from "$lib/runes/table.svelte";

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
		{
			id: 1,
			label: 'Filtr podle PSČ',
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
		{
			id: 2,
			label: 'Velmi důležitý filtr',
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

	$effect(() => {
		dialogOpen = true;

		return (() => {
			dialogOpen = false;
		})
	})


	export const ribbonFiltersAgGridDef: ColDef<any, any>[] = [
		{
			field: "label",
			editable: true,
			flex: 1,
		},
		{
			field: "select",
			pinned: "right",
			width: 36,
			minWidth: 36,
			cellRenderer: (params: ICellRendererParams) => selectBtn(params),
		},
		{
			field: "delete",
			pinned: "right",
			width: 36,
			minWidth: 36,
			cellRenderer: (params: ICellRendererParams) => deleteBtn(params),
		},
	]


	const customGridOptions: GridOptions = {
		columnDefs: ribbonFiltersAgGridDef,
	}

	function selectBtn(params: ICellRendererParams) {
		const div = document.createElement('div');
		const divClasses = ["h-full", "mt-1.5"];
		div.classList.add(...divClasses);

		const link = document.createElement('button');
		const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700", "flex", "justify-center", "items-center"];
		div.classList.add(...linkClasses);

		link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"

		link.addEventListener("click", () => {
			selectedFilters.value = params.data.filters;
			dialogOpen = false;

			console.log("click")
		})

		div.appendChild(link);
		return div;
	}

	function deleteBtn(params: ICellRendererParams) {
		const div = document.createElement('div');
		const divClasses = ["h-full", "mt-1.5"];
		div.classList.add(...divClasses);

		const link = document.createElement('button');
		const linkClasses = ["size-5", "text-red-600", "hover:text-red-800", "flex", "justify-center", "items-center"];
		div.classList.add(...linkClasses);

		link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"

		link.addEventListener("click", () => {
			console.log("click delete")
		})

		div.appendChild(link);
		return div;
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
	customCss="!h-[360px] md:!w-[500px]"
/>

{#snippet header()}
	<Dialog.Title class="h-6">
		Uložené filtry - zákazníci
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
