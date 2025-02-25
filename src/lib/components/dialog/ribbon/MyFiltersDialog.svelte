<script lang="ts">
	import {pageCompact, pageCode} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte.js";
	import {apiServiceGET} from "$lib/api/apiService.svelte";
	import {customToast} from "$lib/utils/customToast";
	import Save from "lucide-svelte/icons/save";
	import type {
		CellContextMenuEvent,
		ICellRendererParams
	} from "ag-grid-community";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredFilters} from "$lib/types/components/table/filters";
	import FilterDetailDialog from "$lib/components/dialog/ribbon/FilterDetailDialog.svelte";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';


	let isOpen: boolean = $state(false);
	let openDetailDialog = $state(false);
	let detailFilter: StoredFilters|undefined = $state(undefined);
	let hasUnsavedData = $state(false);
	let fetchedFilters: StoredFilters[] = $state([]);


	async function getFilters() {
		const resp = await apiServiceGET("userfilters/mbuc");

		if (resp.ok) {
			const respItems = await resp.json();
			fetchedFilters = respItems.items;
		}
	}


	$effect(() => {
		isOpen = true;
		getFilters();

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	export const ribbonFiltersAgGridDef: ColDef<any, any>[] = [
		{
			field: "filterName",
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
			return String(params.data.filterId);
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

		link.innerHTML = pageCompact.value
			? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>"
			: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-external-link\"><path d=\"M15 3h6v6\"/><path d=\"M10 14 21 3\"/><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/></svg>";

		link.addEventListener("click", () => {
			if (!hasUnsavedData) {
				serverSideTables[pageCode.value].selectedFilters = params.data.filters;
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

		link.innerHTML = pageCompact.value
			? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 22 22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"
			: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg>"

		link.addEventListener("click", () => {
			fetchedFilters.forEach((filter, index) => {
				if (filter.filterId === params.data.filterId) {
					fetchedFilters.splice(index, 1);
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
		{#if fetchedFilters.length > 0}
			<AgGridCSWrapper
				rowData={fetchedFilters}
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
