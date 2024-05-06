<script lang="ts">
	import {
		ArrowDownWideNarrow,
		Filter,
		FilterX,
		FolderUp,
		ListFilter,
		Printer,
		ChevronDown,
		ChevronUp,
		FilePlus,
		FileX2,
		Pencil,
		FileUp,
		FileDown,
		FolderDown,
		Scan,
		Undo2,
		ListPlus,
		Columns3,
		BarChart3,
		Save,
		RefreshCcw
	} from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import RibbonSection from '$lib/components/created/ribbon/RibbonSection.svelte';
	import RibbonItem from '$lib/components/created/ribbon/RibbonItem.svelte';
	import RibbonDropdownItem from '$lib/components/created/ribbon/RibbonItemDropdown.svelte';
	import RibbonItemsNarrow from '$lib/components/created/ribbon/RibbonItemsNarrow.svelte';
	import { onMount } from 'svelte';
	import { RibbonStateStore } from '$lib/components/stores/store';

	let isOpen: unknown;

	RibbonStateStore.subscribe((data) => {
		isOpen = data;
	});

	function setRibbon() {
		const value = localStorage.getItem('ribbonState')?.trim();

		if (value === 'true' || value === 'false') {
			RibbonStateStore.set(value);
		} else {
			localStorage.setItem('ribbonState', 'true');
		}
	}

	function toggleOpen() {
		if (isOpen === 'true') {
			RibbonStateStore.update(() => 'false');
			localStorage.setItem('ribbonState', 'false');
		} else {
			RibbonStateStore.update(() => 'true');
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
	<div class="absolute mt-[102px] w-full flex justify-end items-center">
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
