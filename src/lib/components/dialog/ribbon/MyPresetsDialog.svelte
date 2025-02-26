<script lang="ts">
	import {pageCompact, pageCode} from "$lib/runes/page.svelte";
	import {openedRibbonDialog} from "$lib/runes/ribbon.svelte";
	import {serverSideTables} from "$lib/runes/table.svelte";
	import {selectButton} from "$lib/utils/components/ag-grid/cell-renderers/selectButton.svelte";
	import {deleteButton} from "$lib/utils/components/ag-grid/cell-renderers/deleteButton.svelte.js";
	import deepcopy from "deepcopy";
	import Save from "lucide-svelte/icons/save";
	import type {ColDef, GetRowIdParams, GridOptions} from "ag-grid-enterprise";
	import type {StoredPreset, StoredPresets} from "$lib/types/components/table/presets";
	import type {
		ICellRendererParams
	} from "ag-grid-community";
	import AgGridCSWrapper from "$lib/components/ag-grid/AgGridCSWrapper.svelte";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';


	let isOpen: boolean = $state(false);
	let hasUnsavedData = $state(false);

	let fetchedPresets: StoredPresets[] = $state([ // will come from api
		{
			presetId: 0,
			presetName: 'Testovací šablonka',
			presetValue: [
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


	export const ribbonPresetsAgGridDef: ColDef[] = [
		{
			field: "presetName",
			editable: true,
			flex: 1,
		},
		{
			field: "select",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => selectButton(params, handleClickSelect),
		},
		{
			field: "delete",
			pinned: "right",
			width: pageCompact.value ? 28 : 36,
			minWidth: pageCompact.value ? 28 : 36,
			cellRenderer: (params: ICellRendererParams) => deleteButton(params, handleDelete),
		},
	]


	const customGridOptions: GridOptions = {
		columnDefs: ribbonPresetsAgGridDef,

		getRowId: (params: GetRowIdParams) => {
			return String(params.data.presetId);
		},
	}




	async function getPresets() {
		// const resp = await apiServiceGET("userfilters/mbuc");
		//
		// if (resp.ok) {
		// 	const respItems = await resp.json();
		// 	fetchedPresets = respItems.items;
		// }
	}


	function handleClickSelect(params: ICellRendererParams) {
		let defaultColDefCopy = new Map(
			deepcopy(serverSideTables[pageCode.value].defaultColDef).map((col: ColDef) => [col.field, col])
		);

		let clickedPreset = params.data.presetValue;

		clickedPreset.forEach((preset: StoredPreset) => {
			let column = defaultColDefCopy.get(preset.field);
			if (column) {
				Object.keys(column).forEach((key) => {
					// @ts-ignore
					preset[key] = preset[key] ?? column[key];
				});
			}
		});

		serverSideTables[pageCode.value].selectedPreset = clickedPreset;
		openedRibbonDialog.value = "empty";
	}



	function handleDelete(params: ICellRendererParams) {
		fetchedPresets.forEach((filter, index) => {
			if (filter.presetId === params.data.id) {
				fetchedPresets.splice(index, 1);
				hasUnsavedData = true;
			}
		})
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
	customCss={"!h-[360px] md:!w-[500px]"}
/>


{#snippet header()}
	<Dialog.Title class="h-6 flex pr-4 gap-2 items-center">
		{m.components_ribbon_dialog_my_presets_label()}

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
		{#if fetchedPresets.length > 0}
			<AgGridCSWrapper
				rowData={fetchedPresets}
				gridOptionsCustom={customGridOptions}
				fullHeight={true}
				hiddenHeader={true}
			/>
		{:else }
			{m.components_ribbon_dialog_my_presets_no_instances_found()}
		{/if}
	</div>
{/snippet}



