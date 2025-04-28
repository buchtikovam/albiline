<script lang="ts">
	import AgGridCSSecondaryWrapper from "$lib/components/ag-grid/AgGridCSSecondaryWrapper.svelte";
	import {
		nastaveniGridOptions,
		nastaveniHeaderTranslations
	} from "$lib/definitions/routes/nastaveni/ag-grid-cs/nastaveniAgGridDef";
	import SectionLabel from "$lib/components/form/labels/SectionLabel.svelte";
	import {onMount} from "svelte";
	import InputLabel from "$lib/components/form/labels/InputLabel.svelte";
	import {Button} from "$lib/components/ui/button";
	import {type TableSettings, tableViewSettings} from "$lib/runes/table.svelte";
	import {invalidateAll} from "$app/navigation";


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
</script>



<div class="size-full p-4">
	<SectionLabel label="Nastavení tabulky"/>

	<div class="flex mt-2 h-1/2 bg-slate-50 p-4 border-slate-300 border rounded-lg">
		<div class="w-full flex flex-col gap-4">
			<div>
				<InputLabel label="Přednastavené zobrazení:"/>

				<div class="mt-1">
					<Button onclick={() => {
						tableViewSettings.value = tableSettingsCompact;

					}}>
						Kompaktní
					</Button>

					<Button
						onclick={() => {
							tableViewSettings.value = tableSettingsDefault;
						}}
					>
						Výchozí
					</Button>
<!--					<Button onclick={() => }>Velké</Button>-->
				</div>
			</div>


			<div>
				<InputLabel label="Vlastní zobrazení:"/>

				<div class="mt-1">
					<div>
						<p class="text-sm">Hlavička</p>
					</div>

				</div>

			</div>

		</div>

		<div class="w-full border rounded-lg border-slate-300 bg-white">
			<!--{#key tableViewSettings.value}-->
				<AgGridCSSecondaryWrapper
					rowData={dummyRowData}
					gridOptionsCustom={nastaveniGridOptions}
					headerTranslations={nastaveniHeaderTranslations}
					fullHeight={true}
				/>
			<!--{/key}-->
		</div>
	</div>






</div>
