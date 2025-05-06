<script lang="ts">
	import {pageCompact} from "$lib/runes/page.svelte";
	import {Separator} from "$lib/components/ui/separator";
	import {Slider} from "$lib/components/ui/slider/index.js";
	import {Button} from "$lib/components/ui/button";
	import {type TableSettings, tableViewSettings} from "$lib/runes/table.svelte";
	import {
		nastaveniGridOptions,
		nastaveniHeaderTranslations
	} from "$lib/definitions/routes/nastaveni/ag-grid-cs/nastaveniAgGridDef";
	import {onMount} from "svelte";
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte";
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";


	let dummyRowData = $state([]);

	onMount(async () => {
		dummyRowData = await getDummyRowData();
	})


	async function getDummyRowData() {
		const resp = await fetch('https://dummyjson.com/recipes')

		if (resp.ok) {
			const respData = await resp.json();
			return respData.recipes;
		}

		return []
	}


	const tableSettingsCompact: TableSettings = {
		headerHeight: 24,
		headerFontSize: 10,
		spacing: 2,
		fontSize: 12,
		iconSize: 12,
	}


	const tableSettingsDefault: TableSettings = {
		headerHeight: 28,
		headerFontSize: 11,
		spacing: 5,
		fontSize: 14,
		iconSize: 14,
	}


	const tableSettingsLarge: TableSettings = {
		headerHeight: 33,
		headerFontSize: 12,
		spacing: 6,
		fontSize: 15,
		iconSize: 15,
	}
</script>




<div class="size-full p-4">
	<SectionLabel label="Nastavení tabulky"/>

	<div class="flex mt-2 max-w-[1900px] bg-slate-50 p-4 border-slate-300 border rounded-lg">
		<div class="w-full flex flex-col justify-between gap-4 pr-4 max-w-[800px]">
			<div class="mb-2">
				<InputLabel label="Přednastavené zobrazení:"/>

				<div class="mt-1">
					<Button onclick={() => {
						tableViewSettings.value = tableSettingsCompact;
						pageCompact.value = true;
					}}>
						Kompaktní
					</Button>

					<Button
						onclick={() => {
							tableViewSettings.value = tableSettingsDefault;
							pageCompact.value = false;
						}}
					>
						Výchozí
					</Button>


					<Button
						onclick={() => {
							tableViewSettings.value = tableSettingsLarge;
							pageCompact.value = false;
						}}
					>
						Velké
					</Button>
				</div>
			</div>

			<Separator class="h-[2px]"/>

			<div class="w-[85%] flex flex-col gap-2 pb-2">
				<div>
					<p class="text-sm pb-0.5">
						Padding
					</p>

					<div class="px-2 overflow-visible">
						<Slider
							type="single"
							bind:value={tableViewSettings.value.spacing}
							min={1}
							max={7}
							step={1}
							class="w-full h-4 overflow-visible z-50"
						/>
					</div>
				</div>


				<div>
					<p class="text-sm pb-0.5">
						Výška hlavičky
					</p>

					<div class="px-2 overflow-visible">
						<Slider
							type="single"
							bind:value={tableViewSettings.value.headerHeight}
							min={24}
							max={38}
							step={1}
							class="w-full h-4 overflow-visible"
						/>
					</div>
				</div>


				<div>
					<p class="text-sm pb-0.5">
						Velikost textu hlavičky
					</p>

					<div class="px-2 overflow-visible">
						<Slider
							type="single"
							bind:value={tableViewSettings.value.headerFontSize}
							min={8}
							max={13}
							step={1}
							class="w-full h-4 overflow-visible"
						/>
					</div>
				</div>

				<div>
					<p class="text-sm pb-0.5">
						Velikost textu
					</p>

					<div class="px-2 overflow-visible">
						<Slider
							type="single"
							bind:value={tableViewSettings.value.fontSize}
							min={10}
							max={16}
							step={1}
							class="w-full h-4 overflow-visible"
						/>
					</div>
				</div>


				<div>
					<p class="text-sm pb-0.5">
						Velikost ikonek
					</p>

					<div class="px-2 overflow-visible">
						<Slider
							type="single"
							bind:value={tableViewSettings.value.iconSize}
							min={10}
							max={16}
							step={1}
							class="w-full h-4 overflow-visible"
						/>
					</div>
				</div>
			</div>
		</div>


		<div class="w-full border rounded-lg border-slate-300 bg-white">
			<AgGridCSSecondaryWrapper
				rowData={dummyRowData}
				gridOptionsCustom={nastaveniGridOptions}
				headerTranslations={nastaveniHeaderTranslations}
				fullHeight={true}
			/>
		</div>
	</div>
</div>
