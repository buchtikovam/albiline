<script lang="ts">
	import {ribbonAction} from "$lib/runes/ribbon.svelte.js";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction.js";
	import Filter from "lucide-svelte/icons/filter";
	import Columns3 from "lucide-svelte/icons/columns-3";
	import Circle from "lucide-svelte/icons/circle";
	import Dot from "lucide-svelte/icons/dot";
	import type {AgGridSSTableType} from "$lib/types/components/table/table";
	import type {StoredFilters} from "$lib/types/components/table/filters";
	import type {FilterModel} from "ag-grid-enterprise";
	import type {Preset, StoredPresets} from "$lib/types/components/table/presets";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	interface Props {
		table: AgGridSSTableType;
	}

	let { table = $bindable() }: Props = $props();

	let selectedTableFilter: StoredFilters|undefined = $state();
	let activeTableFilter: FilterModel|undefined = $state({});

	let selectedTablePreset: StoredPresets|undefined = $state();
	let activeTablePreset: Preset[]|undefined = $state();

	$effect(() => {
		activeTableFilter = table.filtersToSave;
		activeTablePreset = table.presetToSave;

		if (activeTablePreset) {
			activeTablePreset.forEach(preset => {
				if (!preset.hide) {
					preset.hide = false;
				}
			})
		}

		if (table.selectedFilters) {
			selectedTableFilter = table.selectedFilters;
		}

		if (table.selectedPresetFull) {
			selectedTablePreset = table.selectedPresetFull;
		}
	})
</script>



<div class="flex gap-2">
	{#if selectedTableFilter}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-8 border-none text-albi-950 hover:text-albi-950 bg-white hover:bg-white flex items-center justify-center rounded-md"
			>
				<Filter
					strokeWidth={2}
					class="size-4"
				/>

				{#if JSON.stringify(activeTableFilter) !== JSON.stringify(selectedTableFilter.filters)}
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
					{#if activeTableFilter && JSON.stringify(activeTableFilter) !== JSON.stringify(selectedTableFilter.filters)}
						<DropdownMenu.Item>
							Uložit jako aktuální
						</DropdownMenu.Item>

						<DropdownMenu.Item onclick={() => {
										ribbonAction.value = RibbonActionEnum.SAVE_FILTERS;
									}}>
							Uložit jako nový
						</DropdownMenu.Item>
					{/if}

					<DropdownMenu.Item onclick={() => {
									ribbonAction.value = RibbonActionEnum.FILTER_REMOVE
									table.selectedFilters = undefined;
									selectedTableFilter = undefined;
								}}>
						Odstranit z tabulky
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}

	{#if selectedTablePreset}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="size-8 border-none text-albi-950 hover:text-albi-950 bg-white hover:bg-white flex items-center justify-center rounded-md"
			>
				<Columns3
					strokeWidth={2}
					class="size-4"
				/>

				{#if JSON.stringify(activeTablePreset) !== JSON.stringify(selectedTablePreset.pagePresetValue)}
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
					{#if JSON.stringify(activeTablePreset) !== JSON.stringify(selectedTablePreset.pagePresetValue)}
						<DropdownMenu.Item>
							Uložit jako aktuální
						</DropdownMenu.Item>

						<DropdownMenu.Item onclick={() => {
							ribbonAction.value = RibbonActionEnum.SAVE_PRESET;
						}}>
							Uložit jako nový
						</DropdownMenu.Item>
					{/if}

					<DropdownMenu.Item onclick={() => {
						ribbonAction.value = RibbonActionEnum.FILTER_REMOVE
						table.selectedFilters = undefined;
						selectedTableFilter = undefined;
					}}>
						Odstranit z tabulky
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>
