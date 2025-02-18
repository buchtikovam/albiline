<script lang="ts">
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import { selectedFilters } from "$lib/runes/table.svelte";
	import { pageCompact } from "$lib/runes/page.svelte";
	import { customToast } from "$lib/utils/customToast";
	import Save from "lucide-svelte/icons/save";
	import type {
		CellContextMenuEvent,
		ICellRendererParams
	} from "ag-grid-community";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type { StoredFilters } from "$lib/types/components/table/filters";
	import FilterDetailDialog from "$lib/components/dialog/ribbon/FilterDetailDialog.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	let isOpen: boolean = $state(false);
	let openDetailDialog = $state(false);
	let detailFilter: StoredFilters|undefined = $state(undefined);
	let hasUnsavedData = $state(false);


	let storedFilters: StoredFilters[] = $state([ // will come from api
		{
			id: 1212,
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
				postalCode: {
					filterType: "multi",
					filterModels: [
						{
							filterType: "text",
							type: "contains",
							filter: "180 00"
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
				},
				postalCode: {
					filterType: "multi",
					filterModels: [
						{
							filterType: "text",
							type: "contains",
							filter: "180 00"
						}
					]
				}
			}
		},
	]);


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
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
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => selectBtn(params),
		},
		{
			field: "delete",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => deleteBtn(params),
		},
	]


	const customGridOptions: GridOptions = {
		columnDefs: ribbonFiltersAgGridDef,

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.id);
		},

		getContextMenuItems: () => {
			return [
				'copy',
				{
					name: "Detail",
					action: () => {
						openDetailDialog = true;
					},
					icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-search\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>",
				},
			];
		},

		onCellContextMenu(event: CellContextMenuEvent<any>) {
			detailFilter = event.data;
		},
	}


	function selectBtn(params: ICellRendererParams) {
		const div = document.createElement('div');
		let divClasses = pageCompact.value
			? ["h-full", "mt-[3px]"]
			: ["h-full", "mt-1.5"]

		div.classList.add(...divClasses);

		const link = document.createElement('button');
		const linkClasses = ["size-5", "text-albi-500", "hover:text-albi-700", "flex", "justify-center", "items-center"];
		div.classList.add(...linkClasses);

		pageCompact.value
			? link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
			: link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"

		link.addEventListener("click", () => {
			if (!hasUnsavedData) {
				selectedFilters.value = params.data.filters;
				isOpen = false;
				openedRibbonDialog.value = "empty";
			} else {
				customToast("WarningToast", "Nejprve ulož data");
			}
		})

		div.appendChild(link);
		return div;
	}

	function deleteBtn(params: ICellRendererParams) {
		const div = document.createElement('div');
		let divClasses = pageCompact.value
			? ["h-full", "mt-[3px]"]
			: ["h-full", "mt-1.5"];

		div.classList.add(...divClasses);

		const link = document.createElement('button');
		const linkClasses = ["size-5", "text-red-600", "hover:text-red-800", "flex", "justify-center", "items-center"];
		div.classList.add(...linkClasses);

		pageCompact.value
			? link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"
			: link.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"



		link.addEventListener("click", () => {
			storedFilters.forEach((filter, index) => {
				if (filter.id === params.data.id) {
					storedFilters.splice(index, 1);
					hasUnsavedData = true;
				}
			})
		})

		div.appendChild(link);
		return div;
	}
</script>



<DialogWrapper
	bind:isOpen
	{header}
	{content}
	onChange={() => {
		isOpen = false;
		setTimeout(() => {
			openedRibbonDialog.value = 'empty';
		}, 200)
	}}
	fixedHeight={false}
	size="sm"
	customCss={"!h-[360px]  md:!w-[500px]"}
/>

{#snippet header()}
	<Dialog.Title class="h-6 flex pr-4 gap-2 items-center">
		Uložené filtry - Zákazníci

		{#if hasUnsavedData}
			<button
				onclick={() => hasUnsavedData = false}
			>
				<Save
					class="size-5 text-albi-500 hover:text-albi-700"
				/>
			</button>
		{/if}
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
		{:else }
			Nemáš žádné uložené filtry :(
		{/if}
	</div>
{/snippet}


<FilterDetailDialog
	bind:isOpen={openDetailDialog}
	filter={detailFilter}
/>
