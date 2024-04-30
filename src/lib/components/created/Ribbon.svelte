<script lang="ts">
	import {
		ArrowDownAZ, ArrowDownWideNarrow, ArrowUpAZ,
		Filter, FilterX,
		FolderDown,
		FolderUp,
		Languages,
		ListFilter,
		Palette,
		Printer
	} from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import RibbonSection from '$lib/components/created/RibbonSection.svelte';
	import RibbonItem from '$lib/components/created/RibbonItem.svelte';
</script>

<div class="flex gap-2 items-center px-4 py-2 h-full bg-background">
	<RibbonSection>
		<RibbonItem name="Import">
			<FolderDown class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Export">
			<FolderUp class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Tisk">
			<Printer class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<RibbonSection>
		<RibbonItem name="Filtr">
			<Filter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Rychlý filtr">
			<ListFilter class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Zrušit filtry">
			<FilterX class="h-4 w-4" />
		</RibbonItem>

	</RibbonSection>
	<Separator orientation="vertical" />

	<RibbonSection>
		<RibbonItem name="Seřadit A-Z">
			<ArrowDownAZ class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Seřadit Z-A">
			<ArrowUpAZ class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Vyplnit dolů">
			<ArrowDownWideNarrow class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />

	<RibbonSection>
		<RibbonItem name="Motiv">
			<Palette class="h-4 w-4" />
		</RibbonItem>

		<RibbonItem name="Jazyk">
			<Languages class="h-4 w-4" />
		</RibbonItem>
	</RibbonSection>
	<Separator orientation="vertical" />
</div>
