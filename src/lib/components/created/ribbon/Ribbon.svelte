<script lang="ts">
	import ArrowDownWideNarrow from 'lucide-svelte/icons/arrow-down-wide-narrow';
	import Filter from 'lucide-svelte/icons/filter';
	import FilterX from 'lucide-svelte/icons/filter-x';
	import FolderUp from 'lucide-svelte/icons/folder-up';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Printer from 'lucide-svelte/icons/printer';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import FilePlus from 'lucide-svelte/icons/file-plus';
	import FileX2 from 'lucide-svelte/icons/file-x-2';
	import Pencil from 'lucide-svelte/icons/pencil';
	import FileUp from 'lucide-svelte/icons/file-up';
	import FileDown from 'lucide-svelte/icons/file-down';
	import FolderDown from 'lucide-svelte/icons/folder-down';
	import Scan from 'lucide-svelte/icons/scan';
	import Undo2 from 'lucide-svelte/icons/undo-2';
	import ListPlus from 'lucide-svelte/icons/list-plus';
	import Columns3 from 'lucide-svelte/icons/columns-3';
	import BarChart3 from 'lucide-svelte/icons/bar-chart-3';
	import Save from 'lucide-svelte/icons/save';
	import RefreshCcw from 'lucide-svelte/icons/refresh-ccw';
	import { onMount } from 'svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { ribbonStateStore } from '$lib/stores/store';
	import RibbonSection from '$lib/components/created/ribbon/RibbonSection.svelte';
	import RibbonItem from '$lib/components/created/ribbon/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/created/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/created/ribbon/RibbonItemsNarrow.svelte';

	let isOpen: unknown;

	ribbonStateStore.subscribe((data) => {
		isOpen = data;
	});

	function setRibbon() {
		const value = localStorage.getItem('ribbonState')?.trim();

		if (value === 'true' || value === 'false') {
			ribbonStateStore.set(value);
		} else {
			localStorage.setItem('ribbonState', 'true');
		}
	}

	function toggleOpen() {
		if (isOpen === 'true') {
			ribbonStateStore.update(() => 'false');
			localStorage.setItem('ribbonState', 'false');
		} else {
			ribbonStateStore.update(() => 'true');
			localStorage.setItem('ribbonState', 'true');
		}
	}

	let exportOptions = [
		{
			name: 'excel',
			state: false
		},
		{
			name: 'pdf',
			state: false
		},
		{
			name: 'csv',
			state: false
		}
	];

	const fileItems = [
		{
			name: 'Nový',
			icon: FilePlus
		},
		{
			name: 'Smazat',
			icon: FileX2
		},
		{
			name: 'Editovat',
			icon: Pencil
		}
	];

	onMount(() => setRibbon());
</script>

<div class="flex gap-2 items-center px-4 py-2 h-fit bg-background">
	<!--	name="Záznam" -->
	<RibbonSection>
		<RibbonItemsNarrow items={fileItems} />

		<!--		<RibbonItem name="Nový" >-->
		<!--			<FilePlus class="h-4 w-4" />-->
		<!--		</RibbonItem>-->

		<!--		<RibbonItem name="Smazat" >-->
		<!--			<FileX2 class="h-4 w-4" />-->
		<!--		</RibbonItem>-->

		<!--		<RibbonItem name="Editovat" >-->
		<!--			<Pencil class="h-4 w-4" />-->
		<!--		</RibbonItem>-->

		<RibbonItem name="Vyplň dolů">
			<ArrowDownWideNarrow class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<!--name="Export a tisk" -->
	<RibbonSection>
		<RibbonDropdownItem name="Tisk sestav">
			<Printer class="h-4 w-4" />
		</RibbonDropdownItem>

		<RibbonDropdownItem name="Export jako" options={exportOptions}>
			<FileUp class="h-4 w-4" />
		</RibbonDropdownItem>

		<RibbonItem name="Hromadný export">
			<FolderUp class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<!--name="Import" -->
	<RibbonSection>
		<RibbonItem name="Import">
			<FileDown class="h-4 w-4" />
		</RibbonItem>

		<RibbonDropdownItem name="Import šablony">
			<FolderDown class="h-4 w-4" />
		</RibbonDropdownItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<!--name="Statistika"-->
	<RibbonSection>
		<RibbonItem name="Statistika">
			<BarChart3 class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<!--name="Filtry" -->
	<RibbonSection>
		<RibbonItem name="Rychlý filtr">
			<ListFilter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Mimo výběr">
			<Filter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Filtr v rozmezí">
			<Scan class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Krok zpět">
			<Undo2 class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Zrušit filtry">
			<FilterX class="h-4 w-4" />
		</RibbonItem>

		<RibbonDropdownItem name="Moje filtry">
			<ListPlus class="h-4 w-4" />
		</RibbonDropdownItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<!--name="Šablona" -->
	<RibbonSection>
		<RibbonDropdownItem name="Moje šablony">
			<Columns3 class="h-4 w-4" />
		</RibbonDropdownItem>

	</RibbonSection>
	<Separator orientation="vertical" />

	<!-- name="Data"-->
	<RibbonSection>
		<RibbonItem name="Uložit">
			<Save class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Načíst">
			<RefreshCcw class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />
</div>

{#if isOpen === "true"}
	<div class="absolute mt-[100px] w-full flex justify-end items-center">
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
