<script lang="ts">
	import {ribbonAction} from "$lib/runes/ribbon.svelte.js";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction.js";
	import Filter from "lucide-svelte/icons/filter";
	import Columns3 from "lucide-svelte/icons/columns-3";
	import Circle from "lucide-svelte/icons/circle";
	import Dot from "lucide-svelte/icons/dot";
	import type {AgGridTableType} from "$lib/types/components/table/table";
	import type {StoredFilters} from "$lib/types/components/table/filters";
	import type {ColumnState, FilterModel} from "ag-grid-enterprise";
	import type {Preset, StoredPresets} from "$lib/types/components/table/presets";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import {apiServicePUTHandled} from "$lib/api/apiService.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import {page} from "$app/state";


	interface Props {
		table: AgGridTableType;
		routeId: string;
	}

	let {
		table = $bindable(),
		routeId
	}: Props = $props();


	let hideButtons = $derived(page.route.id !== routeId);

	let currentTableFilter: FilterModel|undefined = $derived(table.filtersToSave);
	let selectedTableFilter: StoredFilters|undefined = $derived(table.selectedFilters);

	let currentTablePreset: ColumnState[]|undefined = $derived(table.presetToSave);
	let selectedTablePreset: StoredPresets|undefined = $derived(table.selectedPresetFull);
</script>



<div class={`${hideButtons ? "hidden " : "flex"}`}>
	{#if selectedTableFilter}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-8 ml-2 md:ml-0 md:mr-2 text-albi-950 hover:text-albi-950 bg-white hover:bg-white flex items-center justify-center rounded-md border border-slate-300"
			>
				<Filter
					strokeWidth={2}
					class="size-4"
				/>

				{#if JSON.stringify(currentTableFilter) !== JSON.stringify(selectedTableFilter.filters)}
					<Dot
						class="absolute z-50 text-albi-500 !size-8 ml-3.5 mb-4"
					/>

					<Circle
						fill="white"
						class="absolute text-white !size-3 ml-4 mb-4"
					/>
				{/if}
			</DropdownMenu.Trigger>


			<DropdownMenu.Content class="max-w-80">
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>
						{ selectedTableFilter.filterName }
					</DropdownMenu.GroupHeading>

					<DropdownMenu.Separator />
					{#if currentTableFilter && JSON.stringify(currentTableFilter) !== JSON.stringify(selectedTableFilter.filters)}
						<DropdownMenu.Item
							onclick={async () => {
								if (selectedTableFilter) {
									let response = await apiServicePUTHandled(
										"userfilters",
										 selectedTableFilter.filterId,
										 {
											filterId: selectedTableFilter.filterId,
											filterName: selectedTableFilter.filterName,
											filters: currentTableFilter
										 }
									);

									if (response.success) {
										selectedTableFilter = await response.data;
									}
								}
							}}
						>
							{m.components_filter_and_preset_buttons_action_save_as_current()}
						</DropdownMenu.Item>

						<DropdownMenu.Item onclick={() => {
							ribbonAction.value = RibbonActionEnum.SAVE_FILTERS;
						}}>
							{m.components_filter_and_preset_buttons_action_save_as_new()}
						</DropdownMenu.Item>
					{/if}

					<DropdownMenu.Item onclick={() => {
						ribbonAction.value = RibbonActionEnum.FILTER_REMOVE
						table.selectedFilters = undefined;
						selectedTableFilter = undefined;
					}}>
						{m.components_filter_and_preset_buttons_action_remove_from_table()}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}


	{#if selectedTablePreset}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-8 ml-2 md:ml-0 md:mr-2 text-albi-950 hover:text-albi-950 bg-white hover:bg-white flex items-center justify-center rounded-md border border-slate-300"
			>
				<Columns3
					strokeWidth={2}
					class="size-4"
				/>

				{#if JSON.stringify(currentTablePreset) !== JSON.stringify(selectedTablePreset.pagePresetValue)}
					<Dot
						class="absolute z-50 text-albi-500 !size-8 ml-3.5 mb-4"
					/>

					<Circle
						fill="white"
						class="absolute text-white !size-3 ml-4 mb-4"
					/>
				{/if}
			</DropdownMenu.Trigger>


			<DropdownMenu.Content class="max-w-80">
				<DropdownMenu.Group>
					<DropdownMenu.GroupHeading>
						{ selectedTablePreset.pagePresetName }
					</DropdownMenu.GroupHeading>

					<DropdownMenu.Separator />

					{#if JSON.stringify(currentTablePreset) !== JSON.stringify(selectedTablePreset.pagePresetValue)}
						<DropdownMenu.Item
							onclick={async () => {
								if (selectedTablePreset) {
									let response = await apiServicePUTHandled(
										"userpresets",
										selectedTablePreset.pagePresetId,
										{
											pagePresetId: selectedTablePreset.pagePresetId,
											pagePresetName: selectedTablePreset.pagePresetName,
											pagePresetValue: currentTablePreset
										}
									);

									if (response.success) {
										selectedTablePreset = {
											pagePresetId: selectedTablePreset.pagePresetId,
											pagePresetName: selectedTablePreset.pagePresetName,
											pagePresetValue: currentTablePreset
										}
									}
								}
							}}
						>
							{m.components_filter_and_preset_buttons_action_save_as_current()}
						</DropdownMenu.Item>

						<DropdownMenu.Item onclick={() => {
							ribbonAction.value = RibbonActionEnum.SAVE_PRESET;
						}}>
							{m.components_filter_and_preset_buttons_action_save_as_new()}
						</DropdownMenu.Item>
					{/if}

					<DropdownMenu.Item onclick={() => {
						table.setColStateToDefault = true;
						table.selectedPreset = undefined;
						table.selectedPresetFull = undefined;
						selectedTablePreset = undefined;
					}}>
						{m.components_filter_and_preset_buttons_action_remove_from_table()}
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>
