<script lang="ts">
	import {
		ArrowDownAZ,
		ArrowDownWideNarrow,
		ArrowUpAZ,
		Filter,
		FilterX,
		FolderUp,
		Languages,
		ListFilter,
		Palette,
		Printer,
		ChevronDown,
		ChevronUp,
		FilePlus,
		FileX2,
		FilePenLine,
		Pencil,
		FileUp,
		FileDown,
		FolderDown,
		Scan,
		Undo2,
		ListPlus,
		Columns3,
		BarChart3, Save, SaveAllIcon, RefreshCcw
	} from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import RibbonSection from '$lib/components/created/RibbonSection.svelte';
	import RibbonItem from '$lib/components/created/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/created/RibbonDropdownItem.svelte';
	import RibbonOptionItem from '$lib/components/created/RibbonOptionItem.svelte';

	let isOpen: boolean = true;

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<div class="flex gap-2 items-center px-4 py-2 h-full bg-background">
	<RibbonSection name="Záznam" isOpen={isOpen}>
		<RibbonItem name="Nový" isOpen={isOpen}>
			<FilePlus class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Smazat" isOpen={isOpen}>
			<FileX2 class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Editovat" isOpen={isOpen}>
			<Pencil class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Vyplň dolů" isOpen={isOpen}>
			<ArrowDownWideNarrow class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Export a tisk" isOpen={isOpen}>
		<RibbonDropdownItem name="Tisk sestav" isOpen={isOpen}>
			<Printer class="h-4 w-4" />
		</RibbonDropdownItem>

		<RibbonOptionItem name="Export" isOpen={isOpen}>
			<FileUp class="h-4 w-4" />
		</RibbonOptionItem>

		<RibbonItem name="Hromadný export" isOpen={isOpen}>
			<FolderUp class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Import" isOpen={isOpen}>
		<RibbonItem name="Import" isOpen={isOpen}>
			<FileDown class="h-4 w-4" />
		</RibbonItem>

		<RibbonDropdownItem name="Import šablony" isOpen={isOpen}>
			<FolderDown class="h-4 w-4" />
		</RibbonDropdownItem>
	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Statistika" isOpen={isOpen}>
		<RibbonItem name="Statistika" isOpen={isOpen}>
			<BarChart3 class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Filtry" isOpen={isOpen}>
		<RibbonItem name="Rychlý filtr" isOpen={isOpen}>
			<ListFilter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Mimo výběr" isOpen={isOpen}>
			<Filter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Filtr v rozmezí" isOpen={isOpen}>
			<Scan class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Krok zpět" isOpen={isOpen}>
			<Undo2 class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Zrušit filtry" isOpen={isOpen}>
			<FilterX class="h-4 w-4" />
		</RibbonItem>

		<RibbonDropdownItem name="Moje filtry" isOpen={isOpen}>
			<ListPlus class="h-4 w-4" />
		</RibbonDropdownItem>
	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Šablona" isOpen={isOpen}>
		<RibbonDropdownItem name="Moje šablony" isOpen={isOpen}>
			<Columns3 class="h-4 w-4" />
		</RibbonDropdownItem>

	</RibbonSection>
	<Separator orientation="vertical" />


	<RibbonSection name="Data" isOpen={isOpen}>
		<RibbonItem name="Uložit" isOpen={isOpen}>
			<Save class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Načíst" isOpen={isOpen}>
			<RefreshCcw class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />
</div>

{#if isOpen}
	<div class="absolute mt-[118px] w-full flex justify-end items-center">
		<button on:click={() => toggleOpen()}>
			<ChevronUp class="h-4 w-4 bg-background" />
		</button>
	</div>
{:else}
	<div class="absolute mt-[73px] w-full  flex justify-end items-center">

		<button on:click={() => toggleOpen()}>
			<ChevronDown class="h-4 w-4 bg-background" />
		</button>
	</div>

{/if}
