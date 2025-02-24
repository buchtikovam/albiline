<script lang="ts">
	import { serverSideTables } from "$lib/runes/table.svelte";
	import { openedRibbonDialog } from "$lib/runes/ribbon.svelte";
	import { pageCompact, pageKey } from "$lib/runes/page.svelte";
	import { customToast } from "$lib/utils/customToast";
	import deepcopy from "deepcopy";
	import Save from "lucide-svelte/icons/save";
	import type {
		ICellRendererParams
	} from "ag-grid-community";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredPreset, StoredPresets} from "$lib/types/components/table/presets";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	let isOpen: boolean = $state(false);
	let hasUnsavedData = $state(false);

	const table = $state(serverSideTables[pageKey.value]);

	let storedPresets: StoredPresets[] = $state([ // will come from api
		{
			id: 0,
			label: 'Testovací šablonka',
			presets: [
				{
					field: "isBadPayer",
					width: 103,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "customerAddressCode",
					width: 108,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "name",
					width: 240,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "customerNodeCode",
					width: 120,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "i_Name",
					width: 240,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "street",
					width: 200,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "city",
					width: 315,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "postalCode",
					width: 66,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "countryCode",
					width: 68,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "customerRank",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "dealerCode",
					width: 60,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "areaCode",
					width: 60,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "responsiblePerson",
					width: 78,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "i_ICO",
					width: 85,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "i_DIC",
					width: 135,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "i_IcDph",
					width: 135,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "paymentTypeCode",
					width: 68,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "dueDays",
					width: 68,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "consignmentSaleEnabled",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null,
				},
				{
					field: "retailStoreTypeName",
					width: 180,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "areaId",
					width: 76,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "useAssortedEanCodes",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "b2BeshopEnabled",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "i_Street",
					width: 200,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "i_City",
					width: 200,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "i_PostalCode",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "i_CountryCode",
					width: 70,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "note",
					width: 200,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "dateCreated",
					width: 100,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "firstOrderDate",
					width: 100,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "lastOrderDate",
					width: 100,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "companyName",
					width: 200,
					hide: false,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "isReturnAllowed",
					width: 200,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "customerStoreCode",
					width: 200,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "customerStoreEan",
					width: 200,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				},
				{
					field: "splitOrderByFood",
					width: 200,
					hide: true,
					rowGroup: false,
					rowGroupIndex: null,
					pivot: false,
					pivotIndex: null,
					aggFunc: null,
					pinned: null,
					sort: null,
					sortIndex: null
				}
			]
		}
	]);


	$effect(() => {
		isOpen = true;

		return (() => {
			isOpen = false;
			openedRibbonDialog.value = "empty";
		})
	})


	export const ribbonPresetsAgGridDef: ColDef<any, any>[] = [
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
		columnDefs: ribbonPresetsAgGridDef,

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.id);
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
				let defaultColDefCopy = new Map(
					deepcopy(table.defaultColDef).map((col: ColDef) => [col.field, col])
				);
				let clickedPreset = params.data.presets;

				clickedPreset.forEach((preset: StoredPreset) => {
					let column = defaultColDefCopy.get(preset.field);
					if (column) {
						Object.keys(column).forEach((key) => {
							preset[key] = preset[key] ?? column[key];
						});
					}
				});

				table.selectedPreset = clickedPreset;
				isOpen = false;
				setTimeout(() => {
					openedRibbonDialog.value = 'empty';
				}, 200)
			} else {
				customToast("WarningToast", "Nejprve ulož data");
			}
		});


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
			storedPresets.forEach((filter, index) => {
				if (filter.id === params.data.id) {
					storedPresets.splice(index, 1);
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
		Uložené šablony - Zákazníci

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
		{#if storedPresets.length > 0}
			<AgGridCSWrapper
				rowData={storedPresets}
				gridOptionsCustom={customGridOptions}
				fullHeight={true}
				hiddenHeader={true}
			/>
		{:else }
			Nemáš žádné uložené šablony :(
		{/if}
	</div>
{/snippet}



